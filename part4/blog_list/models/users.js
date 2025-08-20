import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        }
    ]
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.passwordHash;
        delete returnedObject.__v;
    }
});

const user = mongoose.model('user', userSchema);


export default user;