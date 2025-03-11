import dotenv from 'dotenv';
dotenv.config({ path: './env' })

import express from "express"; // Ensure express is imported
// import mongoose from "mongoose"
// import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js"

(async () => {
    try {
        await connectDB(); // Call the connectDB function to connect to MongoDB
        const app = express(); // Initialize express

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port : ${process.env.PORT}`)
        });
    }
    catch (error) {
        console.error("ERROR: ", error)
    }
})()
// const app = express();
// connectDB()// Call the connectDB function to connect to MongoDB
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running on port :,${process.env.PORT}`)
    })
})
.catch((error) => {
    console.error("ERROR: ", error)
});



