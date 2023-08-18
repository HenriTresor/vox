export default (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message || "Internal server error"
    })
}