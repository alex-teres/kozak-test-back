const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
    },
    email: {
		type: String,
		unique: true,
		required: true
	},
});

const model = mongoose.model('user', Schema);

model.protectedFields = ['password'];

module.exports = model;