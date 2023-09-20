const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
    {
       
        bloodGroup: {
            type: String,
            required: [true, "blood group is require"],
            enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
        },
        quantity: {
            type: Number,
            require: [true, "blood quanity is require"],
        },
        name:{
            type: String,
            required: [true, "name is required"],
        },
        phone: {
            type: String,
            required: [true, "phone number is required"],
        },
        email: {
            type: String,
            
        },
        district: {
            type: String,
            required: [true, "district is required"],
        },
        divison: {
            type: String,
            
            required: [true, "divison is required"],
        },

        thana: {
            type: String,

            required: [true, "divison is required"],
        },
        address: {
            type: String,
            required: [true, "address is required"],
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            
            ref: "users",
            required: [true, "user is required"]

        },
       role: {


            type: String,
            required: [true, "role is required"],
            enum: ["organisation", "donar", "hospital"],
        },
      
        reason: {
            type: String,
            required: [true, "reason is required"],
        
    }, gender: {
        type: String,
        
    },
    age: {
        type: Number,
    },
    weight: {
        type: Number,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("bloodRequest", bloodRequestSchema);

