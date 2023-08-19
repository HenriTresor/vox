export default (status, message) => {
    const error = new Error(message)
    return {
        status,
        message: error.message
    }
}