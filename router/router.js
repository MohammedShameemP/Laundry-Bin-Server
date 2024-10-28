const express = require("express");
const { adminLogin } = require("../controllers/auth");
const dataController= require('../controllers/allDataController');
const { upload } = require("../config/aws");
const { createProducts, allProducts, editProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", dataController.users);

// service crud

router.get("/all_services", dataController.allservice);
router.post("/createservice",upload.single("image"), dataController.createService);
router.post("/editservice",upload.single("image"), dataController.editservice);
router.delete("/deleteservice", dataController.deleteService);


// product crud

router.post("/createProduct",upload.single("image"),createProducts)
router.get("/allProduct",allProducts)
router.post("/editProduct",upload.single("image"),editProduct)
router.delete("/deleteProduct",deleteProduct);











module.exports = router;

// router.get("/banner", banner);
// router.get("/service", service);
// router.get("/service",service );
