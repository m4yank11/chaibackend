import mongoose, {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'



const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url use krenge
            required: false
        },
        coverImage: {
            type: String, // cloudinary url use krenge
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        watchHistory:{
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }


    },
    {
        timestamps: true,
    }
)


userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)

    }
    next() 
}) 
// This code is a Mongoose middleware (pre-hook) for the save event in a MongoDB User Schema. It ensures that the user’s password is hashed using bcrypt before being stored in the database.

// Explanation:
// 	1.	userSchema.pre("save", async function(next) {...})
// 	•	This is a pre-save middleware that runs before saving a document (user) to the database.
// 	•	It takes next as a parameter to move to the next middleware in the chain.
// 	2.	if (this.isModified("password")) {...}
// 	•	this.isModified("password") checks whether the password field has been modified.
// 	•	This ensures that password hashing only occurs when it is newly created or updated, preventing unnecessary re-hashing.


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){ 
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
    //      This function generateAccessToken is a method of the userSchema in a MongoDB-based Node.js application using JWT (JSON Web Token).generates a JWT token for a user when called.
    //      The token includes the user’s _id, email, username, and fullName as payload.
	// •	It is signed using a secret key (process.env.ACCESS_TOKEN_SECRET) stored in environment variables.
	// •	The token has an expiry time defined in process.env.ACCESS_TOKEN_EXPIRY.

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)
  