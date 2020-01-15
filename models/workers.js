const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	sex: {
		type: Boolean,
		required: true
    },
    contactInfo: {
		type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: new Date()
    },
    salary: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    }
});

const model = mongoose.model('worker', Schema);

model.protectedFields = ['created'];

module.exports = model;