function errorHandler(err, req, res, next) {
    if (err.name === 'SequelizeValidationError') {
        const messages = err.errors.map(e => e.message);
        return res.status(400).json({
                status: "ERROR",
                message: "Validation error",
                data: messages
            });
    }
    console.error(err);
    res.status(500).json({
        status: "ERROR",
        message: err.message,
        data: null
    });
}

module.exports = errorHandler;