const express = require("express");
const router = express.Router();
const officeBearersController = require("../controllers/officeBearersController");

router.get("/", officeBearersController.officebearerspage);

router.get("/add", officeBearersController.addOfficeBearerpage);
router.post("/add", officeBearersController.postOfficeBearerpage);
router.get("/edit/:id", officeBearersController.edit);
router.put("/edit/:id", officeBearersController.editPost);
router.delete("/edit/:id", officeBearersController.deleteOfficeBearer);

module.exports = router;
