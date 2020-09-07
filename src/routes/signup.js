import express from 'express';
import multer from 'multer';
const upload = multer();
const router = express.Router()

router.get('/',function(req,res) {
    console.log('GET URL')
    const initialData = {
        email: 'email@email.com',
        password: 'testest',
        address: 'Address 1',
        address2: 'Address 2',
        city: 'Toronto',
        zip: 'ABC'
    }
    res.render('signup',initialData);
});

router.post('/', upload.array(), function(req,res) {
    console.log('POST URL')
    console.log('DATA',req.body);
    
    // here we will add validations
    // According to the validation we can either show the form
    // or take it to another page.
    // if(req.body.email) {
    //     res.redirect('/profile');
    // }
    // res.json({message:'User Added'})
    res.render('signup',req.body);
});

// module.exports = Router;

export default router;