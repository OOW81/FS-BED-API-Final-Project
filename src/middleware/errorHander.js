// Middleware for capturing unhandled errors, returns an error message - general.

const errorHandler = (err, req, res, next) => {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong!" }); 
};

export default errorHandler;
