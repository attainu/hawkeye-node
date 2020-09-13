import express from 'express';
import path from 'path';
import User from '../models/User';

const router = express.Router();

router.get('/',function(request,response){
    // Create
    // Read
    // Update
    // Delete
    User.find(function(err,docs){
        console.log(docs);
    });
    response.render('home');
});

router.get('/logout',function(request,response){
    request.session.user = null;
    response.redirect('/login');
});

router.get('/about',function(request,response){
    //This is only used for serving static files
    const filePath = path.join(__dirname,'../views','about.html');
    response.sendFile(filePath);
});

export default router;
