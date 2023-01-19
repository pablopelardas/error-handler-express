module.exports = function formatResponse (data, message, status, error=false, success=true) {
    if (error) success = false
    return {
        data,
        message,
        status,
        error,
        success
    }
}