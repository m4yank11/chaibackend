const asyncHandler = (fn) => async(req,res,next) => {
    try {
        await fn(req,res,next);
    } 
    catch (err) {
        res.status(err.conde || 500).json({
            success : false,
            message : err.message
        })
    }

}
// The asyncHandler function is placed in the utils folder as a reusable utility for handling errors in async route handlers. This ensures:
// 	1.	Code Reusability – Avoids repetitive try-catch blocks.
// 	2.	Separation of Concerns – Keeps error handling separate from route logic.
// 	3.	Cleaner Code – Makes routes concise and maintainable.