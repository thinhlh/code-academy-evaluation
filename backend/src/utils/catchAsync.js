// Wrap this function out of controller, when controller is called
// This will execute the controller and add a catch
// to pass the error to the next middleware if it exists

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
