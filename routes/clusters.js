const express = require('express');
const router = express.Router();
const Vms = require('../models/vms');

// Passing details to the Homepage
router.get('/', (req, res) => {
  res.send('Hello, this is the home page for the REST API project');
});

// Getting routes for all clusters stored in MongoDB
router.get('/vms', async (req, res) => {
  try {
    const vms = await Vms.find();
    res.status(200).json(vms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get('/vms/:id', async (req, res) => {
  //console.log(req.params.username);
  try {
    const oneVm = await Vms.findById(req.params.id);
    res.status(200).json(oneVm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating One on general route
router.post('/vms', async (req, res) => {
  const vms = new Vms({
    cluster_name: req.body.cluster_name,
    platform: req.body.platform,
    total_disk: req.body.total_disk,
    username: req.body.username,
    location_name: req.body.location_name,
  });

  try {
    const newVms = await vms.save();
    res.status(201).json(newVms);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// For deleting One
router.delete('/vms/:id', async (req, res) => {
  try {
    const removedOneVm = await Vms.deleteOne({ _id: req.params.id });
    res.status(201).json(removedOneVm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// For updating One (patch request)
// For updating One. It is preferable to use patch rather than put method
// as put will update all the details rather than the information passed to be updated by the patch method

router.patch('/vms/:id', async (req, res) => {
  try {
    const updateOneVm = await Vms.updateOne({ _id: req.params.id }, req.body);
    res.status(201).json(updateOneVm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/*
async function getUsername(req, res, next) {
    let username
    try {
        username = await Vms.findOne({ username: 'user2' })
        if (username == null) {
            return res.status(404).json({ message: 'Cannot find the user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.username = username
    next()
}
*/

module.exports = router;
