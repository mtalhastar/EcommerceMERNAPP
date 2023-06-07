const userModel = require("../Models/userModel")
const jwt = require("jsonwebtoken")

let signup = (req , res)=>{
    let {username , password , name ,role, images} = req.body;

    let user = new userModel({
        username,
        name,
        password,
        role,
        images
    })

    user.save().then((user)=>{
        res.status(200).json({"Message":"User Created" , user:user})
    }).catch(err=>{
        res.status(500).json({"Message":"User Not Created" , err:err})
    })

}

let getAllUsers = (req, res) => {
    userModel.find().then(users => {
        res.status(200).send({"Message": "Users retrieved", users: users});
    }).catch(err => {
        res.status(500).send({"Message": "Failed to retrieve users", err: err});
    });
}

let login = (req, res) => {
    let {username, password} = req.body
    
    userModel.findOne({username: username}).then(founndUser=>{
        if (!founndUser) {
            res.status(404).send({"Message": "User not found"})
        }
        else {
            if (password == founndUser.password) {
                let token = jwt.sign ({
                    id:founndUser._id,
                    role:founndUser.role
                }, process.env.SECRET_KEY, 
                {
                   expiresIn:'24h'
                }
                )
                res.status(200).send({founndUser, token})
            }
            else {
                res.status(403).send({"Message": "Invalid Password"})
            }
        }
    }).catch(err=>{
        res.status(400).send({err:err})
    })
}

let updateProfile = (req, res) => {
    let { username, name, password, images } = req.body;
    let userId = req.decoded.id;

    userModel.findById(userId).then(foundUser => {
        if (!foundUser) {
            res.status(404).send({"Message": "User not found"});
        } else {
            // Update user properties
            foundUser.username = username || foundUser.username;
            foundUser.name = name || foundUser.name;
            foundUser.password = password || foundUser.password;
            foundUser.images = images || foundUser.images;
            // Save updated user
            foundUser.save().then(updatedUser => {
                res.status(200).send({"Message": "User profile updated", user: updatedUser});
            }).catch(err => {
                res.status(500).send({"Message": "Failed to update user profile", err: err});
            });
        }
    }).catch(err => {
        res.status(400).send({err: err});
    });
}

const findUsersByRole = async (req) => {
  try {
    const { role } = req.query;
    const users = await userModel.find({ role });
    res.status(200).json(users);
  } catch (error) {
    throw new Error('Failed to find users by role');
  }
};

const getAuser = async (req,res) => {
  try {

    const user = await userModel.findById(req.decoded.id)
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({err:err})
  }
};

const DeleteUser = async (req,res) => {
  try {
    const {id} =req.params
    const user = await userModel.findByIdAndDelete(id)
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({err:err})
  }
};
module.exports = {
    signup,
    login,
    updateProfile,
    getAllUsers,
    findUsersByRole,
    getAuser,
    DeleteUser
}