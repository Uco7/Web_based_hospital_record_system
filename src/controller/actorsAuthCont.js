const Patientmodel = require("../model/patient");
const Adminmodel = require("../model/admin");
const Staffmodel = require("../model/staffs");
const TestResult = require('../model/testResult');
const Appointment = require("../model/appointment");
const DocSpecialty = require("../model/docSpecialty");
const { genAdmintoken, genPatientToken, genStafftoken } = require("../helperMildleWare/jwtTokenmidleWre");

// ---------- shared validation patterns ----------
const PATTERNS = {
    fName: /^[A-Za-z\s.'-]+$/,
    lName: /^[A-Za-z\s.'-]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&<>^.,:;[\]{}()|~`#\-_/\\+=]{4,}$/,
    phone_no: /^\+?\d{1,4}[-\s]?\d{1,15}$/,
    address: /^[A-Za-z0-9\s.,#'-]+$/,
    state: /^[A-Za-z\s.'-]+$/,
    LGA: /^[A-Za-z\s\-'’]+$/,
};

const FIELD_LABELS = {
    fName: "first name",
    lName: "last name",
    email: "email",
    password: "password",
    phone_no: "phone number",
    address: "address",
    state: "state",
    LGA: "LGA",
};

/**
 * Validates the common actor (admin / patient / staff) registration fields.
 * Throws a plain Error with a specific, user-readable message on the first
 * field that fails — this message is what ends up on the user's screen.
 */
function validateActorInput({ fName, lName, email, password, phone_no, address, state, LGA, date_of_birth }) {
    const fields = { fName, lName, email, password, phone_no, address, state, LGA };

    for (const [key, value] of Object.entries(fields)) {
        if (!PATTERNS[key].test(value || "")) {
            throw new Error(`Invalid ${FIELD_LABELS[key]} format`);
        }
    }

    if (isNaN(Date.parse(date_of_birth))) {
        throw new Error("Invalid date of birth format");
    }
}

/**
 * Maps ANY thrown error to a { status, message } pair that is safe AND
 * useful to show the user. This is the single place that decides what
 * the client sees — the real message is never silently swallowed.
 */
function buildErrorResponse(error) {
    console.error(error);

    // Duplicate key, e.g. someone registers with an email that's already in use
    if (error.code === 11000) {
        const field = Object.keys(error.keyPattern || {})[0] || "value";
        return {
            status: 409,
            message: `An account with this ${field} already exists.`,
        };
    }

    // Mongoose schema validation error
    if (error.name === "ValidationError") {
        const firstError = Object.values(error.errors || {})[0];
        return {
            status: 400,
            message: firstError ? firstError.message : "Some of the submitted data is invalid.",
        };
    }

    // Mongoose cast error (bad ObjectId, wrong type for a field, etc.)
    if (error.name === "CastError") {
        return { status: 400, message: `Invalid value for "${error.path}".` };
    }

    // Our own manually-thrown validation errors (regex checks, etc.) are
    // plain `new Error("...")` instances, so error.name === "Error".
    if (error.name === "Error" && error.message) {
        return { status: 400, message: error.message };
    }

    // Anything else (DB connection issues, programming errors, etc.) is a
    // genuine, unexpected server-side failure.
    return {
        status: 500,
        message: error.message || "Internal server error. Please try again.",
    };
}

function sendError(res, error) {
    const { status, message } = buildErrorResponse(error);
    return res.status(status).json({ status: "error", message });
}

module.exports = {
    registerActors: async (req, res) => {
        try {
            const {
                fName,
                email,
                password,
                lName,
                phone_no,
                address,
                date_of_birth,
                state,
                LGA,
                gender,
                role,
            } = req.body;

            const profileImage = req.file ? req.file.buffer.toString("base64") : null;
            const imageType = req.file ? req.file.mimetype : null;

            validateActorInput({ fName, lName, email, password, phone_no, address, state, LGA, date_of_birth });

            const payload = {
                fName,
                email,
                password,
                lName,
                phone_no,
                address,
                date_of_birth,
                state,
                LGA,
                gender,
                role,
                profileImage,
                imageType,
            };

            let newActor;
            if (role === "admin") {
                newActor = await Adminmodel.create(payload);
            } else if (role === "patient") {
                newActor = await Patientmodel.create(payload);
            } else {
                // doctor / labTechnician / any other staff role
                newActor = await Staffmodel.create(payload);
            }

            if (!newActor) {
                throw new Error("Registration failed. Please try again.");
            }

            console.log(`${role} created successfully`, newActor._id);

            return res.status(201).json({
                status: "success",
                message: "Account created successfully! Redirecting to login...",
                redirectUrl: "/login/page",
            });
        } catch (error) {
            return sendError(res, error);
        }
    },

    docSpecialty: async (req, res) => {
        try {
            const { fullName, email, specialty } = req.body;

            const testResults = await TestResult.find({ illness: specialty }).select('_id');

            const newDoctorSpecialty = new DocSpecialty({
                fullName,
                email,
                specialty,
                testResults: testResults.map((result) => result._id),
            });

            await newDoctorSpecialty.save();

            return res.status(201).json({
                status: "success",
                message: "Doctor specialization registered successfully.",
            });
        } catch (error) {
            return sendError(res, error);
        }
    },

    login: async (req, res) => {
        try {
            const { email, password, role } = req.body;

            if (!email || !password || !role) {
                return res.status(400).json({
                    status: "error",
                    message: "Email, password and role are all required.",
                });
            }

            if (role === "admin") {
                const loginAdmin = await Adminmodel.login(email, password);
                if (!loginAdmin) {
                    return res.status(400).json({ status: "error", message: "Invalid email or password." });
                }
                const token = genAdmintoken(loginAdmin._id);
                req.session.token = token;
                req.session.adminId = loginAdmin._id;
                return res.status(200).json({ status: "success", redirectUrl: "/admin/dashBord" });
            }

            if (role === "patient") {
                const loginPatient = await Patientmodel.login(email, password);
                if (!loginPatient) {
                    return res.status(400).json({ status: "error", message: "Invalid email or password." });
                }
                const token = genPatientToken(loginPatient._id);
                req.session.token = token;
                req.session.loginPatientId = loginPatient._id;
                return res.status(200).json({ status: "success", redirectUrl: "/patients/dashBord" });
            }

            if (role === "doctor" || role === "labTechnician") {
                const loginStaff = await Staffmodel.login(email, password);
                if (!loginStaff) {
                    return res.status(400).json({ status: "error", message: "Invalid email or password." });
                }
                const token = genStafftoken(loginStaff._id);
                req.session.token = token;
                req.session.staffId = loginStaff._id;

                const redirectUrl = role === "doctor" ? "/doctors/dashbord" : "/labTechs/dashbord";
                return res.status(200).json({ status: "success", redirectUrl });
            }

            return res.status(400).json({ status: "error", message: `Unrecognized role: "${role}".` });
        } catch (error) {
            return sendError(res, error);
        }
    },

    appointment: async (req, res) => {
        try {
            const { name, email, phone_no, address } = req.body;

            if (!PATTERNS.fName.test(name || "")) throw new Error("Invalid name format");
            if (!PATTERNS.email.test(email || "")) throw new Error("Invalid email format");
            if (!PATTERNS.phone_no.test(phone_no || "")) throw new Error("Invalid phone number format");
            if (!PATTERNS.address.test(address || "")) throw new Error("Invalid address format");

            const newData = await Appointment.create({ name, email, phone_no, address });

            if (!newData) {
                throw new Error("Could not save the appointment. Please try again.");
            }

            console.log("new appointment", newData._id);

            return res.status(201).json({ status: "success", data: newData });
        } catch (error) {
            return sendError(res, error);
        }
    },
};