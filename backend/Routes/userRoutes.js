const { signup } = require("../Controller/userController");
const { login,updateProfile,getAllUsers ,findUsersByRole,getAuser} = require("../Controller/userController");
const {DecodeUser}=require("../middleware/auth")
const userRoutes = require("express").Router();

userRoutes.post("/login",login)
userRoutes.get("/all",getAllUsers)
userRoutes.post("/signup",signup)
userRoutes.put("/updateProfile",DecodeUser,updateProfile)
userRoutes.get("/findUsersByRole",DecodeUser,findUsersByRole)
userRoutes.get("/getUser",DecodeUser,getAuser)

module.exports = userRoutes;