import express from 'express';
import multer from 'multer';
import { body, validationResult } from 'express-validator';
import User from '../models/User';

const upload = multer();
const router = express.Router()


router.get('/',function(req,res) {
    if(req.session.user) {
        return res.redirect('/profile');
    }
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

        if(errors.isEmpty()) {
            const user = new User(req.body);
            user.save()
            .then(()=>{
                res.redirect('/login');
            })
        } else {
            res.render('signup',data);
        }
    }
);

// module.exports = Router;

export default router;