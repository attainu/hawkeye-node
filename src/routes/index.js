import express from 'express';
import path from 'path';
const router = express.Router();

router.get('/',function(request,response){
    response.render('home');
});

router.get('/about',function(request,response){
    //This is only used for serving static files
    const filePath = path.join(__dirname,'../views','about.html');
    response.sendFile(filePath);
});

export default router;
