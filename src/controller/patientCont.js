const PurchaseCard = require('../model/purchaseCard');
// const Patientmodel=require("../model/patient")
const axios = require('axios');

// Load environment variables
require('dotenv').config();
const PAYSTACK_SECRET_KEY = "sk_test_46215de49cbcb5829832caae8754060498f1eb40";

module.exports = {
    payInit: async (req, res) => {
        const { fName, email, amount, patientId } = req.body;
        console.log("req body ", req.body);
        
    
        try {
            // Initialize payment with Paystack
            const response = await axios.post('https://api.paystack.co/transaction/initialize', {
                email,
                amount: amount * 100, // Paystack accepts amount in kobo
            }, {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
                }
            });
    
            const { authorization_url, reference } = response.data.data;
    
            // Ensure patientId is provided and valid
            if (!patientId) {
                return res.status(400).json({ error: 'Patient ID is required' });
            }
    
            // Create a new PurchaseCard entry
            const newCard = new PurchaseCard({
                fName,
                email,
                amount,
                paymentReference: reference,
                patient: patientId // Provide the patient ID here
            });
    
            await newCard.save();
    
            // Redirect user to Paystack payment page
            res.redirect(authorization_url);
        } catch (error) {
            console.error('Payment initialization failed:', error);
            res.status(500).json({ error: 'Payment initialization failed' });
        }
    },
    

    webHook: async (req, res) => {
        const { event, data } = req.body;

        if (event === 'charge.success') {
            const reference = data.reference;
            const email = data.customer.email;

            try {
                // Verify the payment with Paystack
                const paymentVerification = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
                    headers: {
                        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
                    }
                });

                const paymentDetails = paymentVerification.data.data;

                if (paymentDetails.status === 'success') {
                    // Update payment status in the database
                    const updatedCard = await PurchaseCard.findOneAndUpdate(
                        { paymentReference: reference },
                        { $set: { status: 'success' } },
                        { new: true }
                    );

                    if (updatedCard) {
                        res.status(200).json({ success: true, message: 'Payment successful and recorded' });
                    } else {
                        res.status(404).json({ success: false, message: 'Card not found' });
                    }
                } else {
                    res.status(400).json({ success: false, message: 'Payment failed' });
                }
            } catch (error) {
                console.error('Payment verification failed:', error);
                res.status(500).json({ error: 'Payment verification failed' });
            }
        } else {
            res.status(400).json({ error: 'Event not supported' });
        }
    },
   
};
