const express = require('express');
const User = require("../Models/userModel");

const fs = require("fs");
const path = require("path");
// const User = require("../Models/userModel");

// controller for create user 

exports.createUser = async (req, res) => {
  try {
    const { name, email ,password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name and email are required",
        status: "error"
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        status: "error"
      });
    }

    // if image uploaded, build local path (served from public)
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}` // relative path to static folder
      : "https://www.w3schools.com/howto/img_avatar.png";

    // create user
    const user = await User.create({
      name,
      email,
      password,
      image: imageUrl
    });

    res.status(201).json({
      message: "User created successfully",
      user,
      status: "success"
    });

  } catch (err) {
    console.error("error in createUser Controller:", err);
    res.status(500).json({
      message: "Internal server error",
      status: "error"
    });
  }

};


// api for login user

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        status: "error",
      });
    }

    // Find user with matching email and password
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        status: "error",
      });
    }

    // if Login successful
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      status: "success",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
};


// get all user api 

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();

    const fullUsers = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image.startsWith("http")
        ? user.image
        : `${req.protocol}://${req.get("host")}${user.image}`
    }));

    res.status(200).json({
      message: "Users fetched successfully",
      users: fullUsers,
      status: "success"
    });

  } catch (err) {
    console.log("Error in getUser controller", err);
    res.status(500).json({
      message: "Internal server error",
      status: "error"
    });
  }
};


// delete user api by id

exports.deleteUser = async(req, res) => {
  try{
    // const {id} = req.param;
    const id = req.params.id;
    if(!id){
      return res.status(400).json({
        message:"user id required",
        status:"error"
      })
    }
    const user=  await User.findByIdAndDelete(id);
    if(!user){
      return res.status(404).json({
        message:"user not found",
        status:"error"
      })
    }
    res.status(200).json({
      message:"user deleted successfully",
      status:"success"
    })
  }catch(err){
    console.log(err)

  }

}

// update user api by id


exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "User ID is required",
        status: "error"
      });
    }

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
        status: "error"
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "error"
      });
    }

    // Handle image update
    let updatedImagePath = user.image;

    if (req.file) {
      // Delete old image if it's stored locally
      if (user.image && !user.image.startsWith("http")) {
        const oldPath = path.join(__dirname, "..", "public", user.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updatedImagePath = `/uploads/${req.file.filename}`;
    }

    // Update user
    user.name = name;
    user.email = email;
    user.image = updatedImagePath;
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
      status: "success"
    });

  } catch (err) {
    console.error("Error in updateUser:", err);
    res.status(500).json({
      message: "Internal server error",
      status: "error"
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Both email and password fields are required",
        status: "error"
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
        status: "error"
      });
    }

    // Update password
    user.password = password; 
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
      status: "success"
    });
  } catch (err) {
    console.error("Forget Password Error:", err);
    return res.status(500).json({
      message: "Internal server error",
      status: "error"
    });
  }
};
