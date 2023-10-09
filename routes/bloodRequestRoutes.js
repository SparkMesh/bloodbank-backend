const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
    createReqInventoryController,
    getReqInventoryController,
    editReqInventoryController,
    deleteReqInventoryController,
} = require("../controllers/bloodRequestController");
const router = express.Router();
//routes
// ADD INVENTORY || POST
router.post("/create-bloodRequest", authMiddelware, createReqInventoryController);
//GET ALL BLOOD RECORDS
router.get("/get-bloodRequest",authMiddelware, getReqInventoryController);

router.get("/get-public-bloodRequest",getReqInventoryController);
//GET RECENT BLOOD RECORDS
router.get("/edit-bloodRequest", authMiddelware, editReqInventoryController);
//GET HOSPITAL BLOOD RECORDS
router.delete("/delete-bloodRequest/:id", authMiddelware, deleteReqInventoryController);

module.exports = router;