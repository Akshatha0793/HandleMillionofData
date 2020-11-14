const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BlogPostSchema = Schema({
    name:String,
    age:String,
    degree:String
    
});

//Model

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;