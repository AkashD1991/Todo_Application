const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//Create Schema
const userSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    gender: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true,
        validate: {
            validator: function(dob) {
                var diff_ms = Date.now() - dob.getTime();
                var age_dt = new Date(diff_ms);
                var age = Math.abs(age_dt.getUTCFullYear() - 1970);
                return age;
            },
            message: props => ` Your age is lessthan 18, you are not eligible for Register!`
        }
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean
    },
    isActive: {
        type: Boolean
    },
    code: {
        type: String,
        required: true
    },
    Token:{
        type: String
    },
    Regdate:{
        type: Date,
        default:Date.now()
    }

})

//decrypt password
userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();

    } catch (error) {
        next(error);
    }
})

//Create Model
const User = mongoose.model('users', userSchema)


//Export the model
module.exports = User;