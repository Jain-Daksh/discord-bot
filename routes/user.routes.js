

const router = require('express').Router();
const User = require('../controllers/user.controller');


module.exports = (app) => {
  console.log('came')
  router.post('/', User.create);
  // router.get('/:id', User.show);
  router.put('/:id', User.update);
  // router.delete('/:id', validation.deleteValidation, User.delete);
  // router.get('/:id/filter-index/', User.filter_index);
  app.use('/api/users', router);

};
