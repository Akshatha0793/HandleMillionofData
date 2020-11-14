const express = require('express');

const router = express.Router();
const BlogPost = require('../models/blogPost');

router.get('/:query',(req,res)=>{
    var query = req.params.query;
   var limit = req.query.limit;
   var skip = req .query.skip;
   
    BlogPost.find({ 'name': { $regex: query} }).skip(parseInt(skip)).limit(parseInt(limit))
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
    
});


router.get('/',(req,res)=>{

   var limit = req.query.limit;
   var skip = req .query.skip;
   
    BlogPost.find({ }).skip(parseInt(skip)).limit(parseInt(limit))
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
    
});

router.post('/save',(req,res)=>{

    const data = req.body;
    console.log(data);

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    
    });  
});

module.exports = router;