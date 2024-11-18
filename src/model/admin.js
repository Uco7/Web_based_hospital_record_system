const bcrypt=require("bcrypt")
const mongoose=require("mongoose")
const adminSchema=mongoose.Schema({
    fName:{
        type:String,
        require:true,


    },
    role:{
        type:String,
        require:true,
        enum:["admin","patient","doctor","labTechnician"],


    },
    fName:{
        type:String,
        require:true,


    },
    email:{
        type:String,
        // require:true,


    },
    password:{
        type:String,
        require:true,


    },
    phone_no:{
        type:Number,
        require:true,
        match: [
            /^\+?\d{1,4}[-\s]?\d{1,15}$/,
            'Please fill a valid phone number',
          ],


    },
    address:{
        type:String,
        require:true,


    },
    date_of_birth:{
        type:Date,
        require:true,
    validate:{
        validator:function(value){
            const today=new Date();
            const birthDate=new Date(value);
            let age=today.getFullYear()- birthDate.getFullYear();
            let month=today.getMonth() - birthDate.getMonth()
            if(month<0 || (month===0 && today.getDate()< birthDate.getDate()) ){
                age--;
            }
            return age>=18;
        },
        message:"age must be greater than 18"
    }


    },
    state:{
        type:String,
        require:true,


    },
    LGA:{
        type:String,
        require:true,


    },
    gender:{
        type:String,
        require:true,
        enum: ['male', 'female', 'other'], // Ensure gender is one of the specified values



    },
    profileImage: {
        type: String,
        required:true // Assuming you store the image as a base64 string
      },
      imageType:{
        type: String,
        required:true 
        
      }
})
adminSchema.pre("save", async function(next){
    const salt= await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password, salt);
    next();
})
adminSchema.statics.login = async function(email, password) {
    console.log(`Attempting login with email: ${email}`); // Add logging
    const userExis = await this.findOne({ email });
    if (userExis) {
      console.log(`User found: ${userExis.email}`); // Add logging
      const ispswMatch = await bcrypt.compare(password, userExis.password);
      if (!ispswMatch) {
        console.log('Password mismatch'); // Add logging
        throw new Error("Invalid password or email");
      }  
      return userExis;
    }
    console.log('User not found'); // Add logging
    throw new Error("User not found");
  }
const Adminmodel=mongoose.model("admin",adminSchema)
module.exports=Adminmodel 