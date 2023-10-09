const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
//GET BLOOD DATA
const bloodGroupDetailsContoller = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const totalEntry = await inventoryModel.countDocuments();
    const totalEntryEachMonth = await inventoryModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

  // const totalEntryEachBloodGroup = await inventoryModel.aggregate([
  //     {
  //       $group: {
  //         _id: { $push: "$bloodGroup" },
  //         count: { $sum: 1 },
  //       },
  //     },
  //   ]);
    // total entry for each blood group
    for (let i = 0; i < bloodGroups.length; i++) {
      const bloodGroup = bloodGroups[i];
      const totalEntry = await inventoryModel.countDocuments({
        bloodGroup: bloodGroup,
      });
      bloodGroupData.push({ bloodGroup, totalEntry });
    }
   

    return res.status(200).send({
      success: true,
      message: "Blood Group Data Fetch Successfully",
      bloodGroupData,
      totalEntry,
      totalEntryEachMonth,
      //totalEntryEachBloodGroup
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error,
    });
  }
};

module.exports = { bloodGroupDetailsContoller };
