const   mongoose            = require("mongoose"),
const Schema = mongoose.Schema

// Article setup
const ArticleSchema = new Schema ({
    
    title: {
        type: String,
        required: true
    },

    link: {
        type:String,
        unique: true,
        required: true
    },

    saved: {
        type: Boolean,
        required: true,
        default: false
    },
 
    deleted: {
        type: Boolean,
        required: true,
        default: false
      },

    date: {
        type: Date,
        default: Date.now
      },

    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note",
        required: false
        }]

})


// create article model
const Article = mongoose.model("Article" , ArticleSchema);

module.exports = Article;