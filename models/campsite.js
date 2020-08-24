const mongoose = require('mongoose');
const Schema = mongoose.Schema;  //using shorthand (not required)

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Create a schema (this is for a subdocument)
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Create a schema
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]  //Every campsite document can now store multiple comment documents stored within an array
}, {  //second, optional argument for configuration options
    timestamps: true
});

// Create a model using the schema
const Campsite = mongoose.model('Campsite', campsiteSchema); //mongoose.model() returns a constructor function

module.exports = Campsite;