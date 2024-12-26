const jwt = require('jsonwebtoken');
const User = require('../models/user.Model');
const errorHandler = require('../utils/error.handler');
const { doHash, doHashValidation, hmacProcess } = require('../utils/hashing');
const serialize = require('../serializers/user.serializer');


exports.create = async (req, res) => {
  console.log(req.body)
  const { email, password, username } = req.body;
  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.send(({
        status: errorHandler.errorHandler.alreadyExist.status,
        message: errorHandler.errorHandler.alreadyExist.error,
      }));

    }

    const hashedPassword = await doHash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log('user', newUser)
    const result = await newUser.save();
    result.password = undefined;
    res.status(201).json({
      success: true,
      message: 'Your account has been created successfully',
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required to update a user',
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (username) user.username = username;
    if (password) user.password = await doHash(password, 12);

    const updatedUser = await user.save();
    updatedUser.password = undefined; // Exclude password in the response

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};



