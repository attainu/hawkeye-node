import express from 'express';
import multer from 'multer';
import { body, validationResult } from 'express-validator';
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
        zip: 'ABC',
        errors: {}
    }
    res.render('signup',initialData);
});

router.post(
    '/',
    upload.array(),
    [
        // email must be an email
        body('email').isEmail().withMessage('Please enter a valid email.'),
        // password must be at least 5 chars long
        body('password').isLength({ min: 5 }).withMessage('Password must have 5 characters.')
    ],
    function(req,res) {
        const errors = validationResult(req);

        const data = {
            ...req.body,
            errors: errors.mapped()
        }

        console.log('DATA',data);
        
        // here we will add validations
        // According to the validation we can either show the form
        // or take it to another page.
        // if(req.body.email) {
        //     res.redirect('/profile');
        // }
        // res.json({message:'User Added'})
        res.render('signup',data);
    }
);

// module.exports = Router;

export default router;