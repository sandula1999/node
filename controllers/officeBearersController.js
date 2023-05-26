const officeBearer = require("../models/officeBearers");
const mongoose = require("mongoose");
const multer = require("multer");

exports.officebearerspage = async (req, res) => {
  try {
    const officeBearers = await officeBearer.find({}).limit(22);
    res.render("officeBearers", { officeBearers });
  } catch (error) {
    console.log(error);
  }
};

//add new  officeBearers
exports.addOfficeBearerpage = async (req, res) => {
  res.render("addOfficeBearers");
};

// // image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("image");

//post new  officeBearers
exports.postOfficeBearerpage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error uploading the image.");
    }
    console.log(req.body);

    const newOfficeBearer = new officeBearer({
      name: req.body.name,
      image: req.file.filename,
      designations: req.body.designations,
      massage: req.body.massage,
    });

    try {
      await officeBearer.create(newOfficeBearer);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  });
};

/**
 * GET /
 * Edit Customer Data
 */

exports.edit = async (req, res) => {
  try {
    const officeBearers = await officeBearer.findOne({ _id: req.params.id });

    res.render("edit", { officeBearers });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * update officebearers Data
 */

exports.editPost = async (req, res) => {
  try {
    await officeBearer.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      image: req.body.filename,
      designations: req.body.designations,
      massage: req.body.massage,
    });
    await res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete office Bearer Data
 */
exports.deleteOfficeBearer = async (req, res) => {
  try {
    await officeBearer.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
