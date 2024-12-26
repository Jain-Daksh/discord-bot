const errorHandler = {
  internalServerError: (err) => ({
    status: 500,
    error: err || {},
  }),
  notFound: (err) => ({
    status: 404,
    error: err,
    message: 'No user of this id',
  }),
  badRequest: (err) => ({
    status: 400,
    error: err,
  }),
  notAccepted: (err) => ({
    status: 406,
    error: err,
  }),
};

module.exports = { errorHandler };

