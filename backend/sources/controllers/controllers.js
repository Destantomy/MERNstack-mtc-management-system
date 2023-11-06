const schemaModel = require('../model/model');
const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

// create a new data record
const createData = async (req, res) => {
  try {
    const id = `datalog-${nanoid(16)}`;
    const {name, facility, issue, status} = req.body;
    const post = await schemaModel.create({id, name, facility, issue, status});
    res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({error: error.message});
  };
};

// getting all data
const getData = async (req, res) => {
  try {
    const data = await schemaModel.find({}).sort({createdAt: -1});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({error: error.message});
  };
};

// getting data by id
const getDataById = async (req, res) => {
  try {
    const {id} = req.params;
    // if data doesnt valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: `id: ${id} isn't valid`});
    }
    const data = await schemaModel.findById(id);
    if (!data) {
      return res.status(404).json({message: `id: ${id} doesn't exist`});
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};


// update a data record
const updateDataById = async (req, res) => {
  try {
    const {id} = req.params;
    // validate if data doesn't valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: `id:${id} doesn't valid`});
    }
    const isMatch = await schemaModel.findOneAndUpdate({_id: id}, {
      ...req.body,
    });
    // validate if data doesnt exist
    if (!isMatch) {
      return res.status(404).json({message: `id:${id} doesn't exist`});
    }
    res.status(200).json(isMatch);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// delete data record
const deleteDataById = async (req, res) => {
  try {
    const {id} = req.params;
    // validate if data doesn't valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: `id:${id} doesn't valid`});
    }
    const isMatch = await schemaModel.findOneAndDelete({_id: id});
    // validate if data doesn't exist
    if (!isMatch) {
      return res.status(404).json({message: `id:${id} doesn't exist`});
    }
    return res.status(200).json(isMatch);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {
  createData,
  getData,
  getDataById,
  updateDataById,
  deleteDataById,
};
