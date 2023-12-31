const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//DELETE INVENTORY

const deleteInventoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await inventoryModel.findByIdAndDelete(id);
    if (!inventory) {
      throw new Error("Inventory Not Found");
    }
    return res.status(200).send({
      success: true,
      message: "Inventory Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Delete Inventory API",
      error,
    });
  }
};



// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
   // const { email } = req.body;
    //validation
    if(req.body.organisation){
      const user = await userModel.findOne({ _id: req.body.organisation });
      if (!user) {
        throw new Error("User Not Found");
      }

    }
    else if(req.body.donar){
      const donor = await userModel.findOne({ _id: req.body.donar });
      if (!donor) {
        throw new Error("User Not Found");
      }
    }
    else {
      throw new Error("User Not Found");
    }
   
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      else
      {
        if(req.body.donar){
          return res.status(500).send({
            success: false,
            message: `Donor Can't Create Out Record`,
          });
        }else {
        await inventoryModel.create(req.body);
      }
      }
      //req.body.hospital = user?._id;
    } else {
     
      const inventory = new inventoryModel(req.body);
      await inventory.save();
      return res.status(201).send({
        success: true,
        message: "New Blood Reocrd Added",
        req: req.body,
      });
    }

    //save record
   
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro In Create Inventory API",
      error,
    });
  }
};

// GET ALL BLOOD RECORS
const getInventoryController = async (req, res) => {
  try {

    const user = await userModel.findOne({ _id: req.body.userId });
   
    const inventory = await inventoryModel
      .find(user.role === "admin"?{
       
      }:{
        organisation: req.body.userId
      
      })
      .populate("organisation")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all records successfully",
      inventory,
      req: req.body,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};
// GET Hospital BLOOD RECORS
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get hospital comsumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

// GET DONAR REOCRDS
const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //find donars
    const donorId = await inventoryModel.distinct("donar", {
      organisation,
    });
    // console.log(donorId);
    const donars = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    //FIND HOSPITAL
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};

// GET ORG PROFILES
const getOrgnaisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donar });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};

const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};
// GET ORG for Hospital
const getOrgnaisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};

const getMatchedDonarController = async (req, res) => {
  try {
    const { bloodGroup, district, divison} = req.body;
    console.log(req.body);
    const donars = await inventoryModel.aggregate([
      {
        $match: {
          inventoryType: "in",
          bloodGroup,
          district,
          divison,
          
        },
      },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "organisation",
      //     foreignField: "_id",
      //     as: "donar",
      //   },

      // },
      // {
      //   $unwind: "$donar",
      // },
      {
        $project: {
          name: "$Name",
        //  organisation: "$donar.organisationName",
        //  hospital: "$donar.hospitalName",
//address: "$donar.address",
          //email: "$donar.email",
          phone: "$phone",
          quantity: "$quantity",
          bloodGroup: "$bloodGroup",
          district: "$district",
          divison: "$divison",
          thana: "$thana",
        },
      },
    ]);
    return res.status(200).send({
      success: true,
      message: "Donar Data Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Donar API",
      error,
    });
  }
};

module.exports = {
  getOrgListController,
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
  getMatchedDonarController,
  deleteInventoryController
};
