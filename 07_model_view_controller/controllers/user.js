//Routes are controlled here

const User = require("../models/user.js");

async function handleGetAllUsers(req, res) {
  const allDBusers = await User.find({});
  return res.json(allDBusers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: "updated"});
    return res.json({ status: "success" })
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id) 
    return res.json({ status: "success" })   
}

async function handleCreateUser(req, res) {
    const body = req.body;
    
    if(!body || !body.firstName || !body.lastName || !body.email || !body.job_title){
        return res.status(400).json({msg: "all fields are required"})
    }

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
    console.log(result)

    return res.status(201).json({ msg: "success" })
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser
};
