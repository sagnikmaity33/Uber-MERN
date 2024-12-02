const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'Firstname must be at least 3 characters long' ],
        },
        lastname: {
            type: String,
            minlength: [ 3, 'Lastname must be at least 3 characters long' ],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ],
        },
        plate: {
            type: String,
            required: true,
            minlength: [ 3, 'Plate must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'motorcycle', 'auto' ],
        }
    },

    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model('captain', captainSchema)

module.exports = captainModel;



// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzRkY2NmNTRmOTI1MDY0MzBmZThhNzEiLCJpYXQiOjE3MzMxNTE5ODksImV4cCI6MTczMzIzODM4OX0.t9UZlETrNhu27X3s_tBIlaXbzipBdwtTJAOblQPylIQ",
//     "captain": {
//         "fullname": {
//             "firstname": "test_captain_firstname",
//             "lastname": "test_captain_lastname"
//         },
//         "email": "test_email@gmail.com",
//         "password": "$2b$10$.vYx3KJKn3LF9PcFMe379uxx01B3FRGufXfC9eDybGgXLd1RyHL7.",
//         "status": "inactive",
//         "vehicle": {
//             "color": "red",
//             "plate": "HP 04 XY 6204",
//             "capacity": 3,
//             "vehicleType": "car"
//         },
//         "_id": "674dccf54f92506430fe8a71",
//         "__v": 0
//     }
// }