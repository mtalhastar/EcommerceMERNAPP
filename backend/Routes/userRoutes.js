const { signup } = require("../Controller/userController");
const { login,updateProfile,getAllUsers ,findUsersByRole,getAuser,DeleteUser} = require("../Controller/userController");
const {DecodeUser,checkAdmin}=require("../middleware/auth")
const userRoutes = require("express").Router();

userRoutes.post("/login",login)
userRoutes.get("/all",DecodeUser,checkAdmin,getAllUsers)
userRoutes.post("/signup",signup)
userRoutes.put("/updateProfile",DecodeUser,updateProfile)
userRoutes.get("/findUsersByRole",DecodeUser,findUsersByRole)
userRoutes.get("/getUser",DecodeUser,getAuser)
userRoutes.delete("/deleteUser/:id",DecodeUser,checkAdmin,DeleteUser)

module.exports = userRoutes;