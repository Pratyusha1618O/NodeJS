// Routes are here 

const express = require("express")
const {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUser} = require('../controllers/user.js')


const router = express.Router(); //express router created

// routes
router.route('/')
.get(handleGetAllUsers)
.post(handleCreateUser)

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router;
