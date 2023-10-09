const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "organisation", "donar", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "user" || this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    organisationName: {
      type: String,
      required: function () {
        if (this.role === "organisation") {
          return true;
        }
        return false;
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") {
          return true;
        }
        return false;
      },
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is requied"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone numbe is required"],
    },
    divison: {
type:String,
      required: [true,"divison is required"],
    },
    district: {
      type:String,
      required: [true,"district is required"],
    },
    thana: {
      type:String,
      required: [true,"thana is required"],
    },
    gender: {
      type: String,
      required: [true,"gender is required"],
  },
occupation: {
      type: String,
      
},
weight:{
      type: String,
      required: [true,"weight is required"],
},
dateofbirth:{
      type: String,
      required: [true,"dateOfBirth is required"],
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
