const express = require("express");
const router = express.Router();
const Client = require("../models/Client");


// CREATE

router.post("/", async (req, res) => {

  const newClient = Client(req.body);
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
    const clients = await Client.find();
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
