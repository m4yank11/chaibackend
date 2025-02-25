// database se connect krte hue error aa sakta hai, 
// isliye mongoose connect krte hue hume try and catch ka 
// use krna hi krna hai
// dusri baat ye hai ki database dusri continent me rakha 
// iska matlab hai ki hume wait krna hai jab tak ki
// database connect ho jaye
// aur jab database connect ho jaye tab hi hume
// use krna hai
// isliye hume async/await ka use krna hai

import mongoose from "mongoose"
import { DB_NAME } from "./constants" 

import express from "express"
const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error) => {
            console.log("ERROR: ", error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port : ${process.env.PORT}`)
        })

    }
    catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()