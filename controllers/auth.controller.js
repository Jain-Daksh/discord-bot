const jwt = require('jsonwebtoken');
const User = require('../models/user.Model');
const errorHandler = require('../utils/error.handler');
const { doHash, doHashValidation, hmacProcess } = require('../utils/hashing');
const serialize = require('../serializers/user.serializer');
const { generateToken } = require('../utils/jwt');

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Compare the password with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     // Generate JWT token upon successful login
//     const token = generateToken(user._id);

//     return res.status(200).json({
//       message: 'Login successful',
//       token, // Send the token to the client
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const isValidPassword = await doHashValidation(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    console.log(isValidPassword, 'isValidPassword');

    const token = generateToken(user._id);
    console.log(token, 'token');
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
