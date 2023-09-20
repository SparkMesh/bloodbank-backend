const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const bloodRequestModel = require("../models/bloodRequestModel");
// CREATE INVENTORY
const createReqInventoryController = async (req, res) => {

    const {user_id,role } = req.body;

  
        try {
        const user = await userModel.findOne({ _id:user_id });
        if (!user) {
            throw new Error("User Not Found");
        }
        if (user.role !== role) {
            throw new Error("Not a donar account");
        }
        const bloodRequest = new bloodRequestModel(req.body);
        await bloodRequest.save();
        res.status(200).json({
            status: "success",
            data: bloodRequest,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
   
    

    //validation
};
// GET INVENTORY
const getReqInventoryController = async (req, res) => {

    try {
        const bloodRequest = await bloodRequestModel.find();
        res.status(200).json({
            status: "success",
            data: bloodRequest,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }

}
// GET INVENTORY
const editReqInventoryController = async (req, res) => {
    
        try {
            const { _id } = req.body._id;
            const bloodRequest = await bloodRequestModel.findOne({ _id: _id });
            res.status(200).json({
                status: "success",
                data: bloodRequest,
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    
    }

    const deleteReqInventoryController = async (req, res) => {
        
            try {
               
               await bloodRequestModel.findByIdAndDelete(req.params.id)
               .then(() => {
               
                res.status(200).json({
                    status: "success",
                    message: "Blood Request Deleted Successfully",
                });
               })
              
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    status: "fail",
                    message: error,
                    error
                });
            }
        
        }
module.exports = {
    createReqInventoryController,
    getReqInventoryController,
    editReqInventoryController,
    deleteReqInventoryController
};
