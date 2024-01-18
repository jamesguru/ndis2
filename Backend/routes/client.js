const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const multer = require('multer');


// CREATE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/", upload.array('files', 5), async (req, res) => {
  const fileNames = req.files.map((file) => file.filename);
  const newClient = Client({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender,
    documents:fileNames,
    
  });

  try {
    const client = await newClient.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL CLIENTS
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE CLIENT

router.delete("/:id", async (req, res) => {
  try {
    await Client.findOneAndDelete(req.params.id);
    res.status(200).json("The client has been deleted");
  } catch (error) {
    res.status(500).json("You are not authorized for this operation");
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
