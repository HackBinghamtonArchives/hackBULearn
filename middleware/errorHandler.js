const serializeError = require('serialize-error');

function handleError(err, req, res, next) {
  switch (err.name) {
    case 'ValidationError':
      res.status(400);
      break;
    default:
      res.status(500);
  }

  res.json(serializeError(err));
}

module.exports = handleError;
