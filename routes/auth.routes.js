// const express = require('express');
// const router = express.Router();

// router.post('/signup', authController.signup);
// router.post('/signin', authController.signin);
// router.post('/signout', identifier, authController.signout);


// module.exports = router;



const router = require('express').Router();

// const auth = require('../controllers/auth.controller');
// const { resetPassword, forgotPassword, login } = require('../validations/auth.validation');

module.exports = (app) => {
  // router.post('/login', login, auth.login);
  // router.post('/forget-password', forgotPassword, auth.forgetPassword);
  // router.post('/reset-password', resetPassword, auth.resetPassword);

  app.use('/api', router);
};
