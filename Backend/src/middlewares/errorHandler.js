 export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        statusCode,
        message: err.message || "Something went wrong",
        success: err.success ?? false,
        data: err.data ?? null,
        errors: err.errors ?? [],
    });
};
