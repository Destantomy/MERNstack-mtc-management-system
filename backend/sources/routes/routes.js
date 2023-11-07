/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const {
  getData,
  getDataById,
  createData,
  updateDataById,
  deleteDataById,
} = require('../controllers/controllers');

// get all data
router.get('/', getData);

// get a data by_id
router.get('/:id', getDataById);

// post a new data
router.post('/', createData);

// update a data
router.put('/:id', updateDataById);

// delete a data
router.delete('/:id', deleteDataById);

module.exports = router;
