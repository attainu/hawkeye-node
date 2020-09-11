import express from 'express';
import path from 'path';
import City from '../models/City';

const router = express.Router();

router.get('/',function(request,response){
    City.find(function(err,docs){
        console.log(docs);
    });
    response.render('home');
});

router.get('/about',function(request,response){
    //This is only used for serving static files
    const filePath = path.join(__dirname,'../views','about.html');
    response.sendFile(filePath);
});

export default router;
