const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    
    inventoryType: {
      type: String,
     
      enum: ["in", "out"],
    },
    Name: {
      type: String,
      required: function () {
        return this.inventoryType === "in";
      },
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is require"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    lastDonateMonth: {
      type: String,
      required: [true, "lastDonateMonth is required"],
    },
    phone: {
      type: String,
      required: [true, "Donar phone is Required"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
     // required: [true, "organisation is required"],
     required: function () {
      return this.inventoryType === "out";
    },
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
     
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      //required: [true, "donor is required"],
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

      required: [true, "thana is required"],
    },
    

},
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
