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
        errors: {}
    }
    res.render('login',initialData);
});

router.post(
    '/',
    upload.array(),
    [
        body('email').isEmail().withMessage('Please enter a valid email.'),
        body('password').isLength({ min: 5 }).withMessage('Password must have 5 characters.')
    ],
    function(req,res) {
        const errors = validationResult(req);

        let data = {
            ...req.body,
            errors: errors.mapped()
        }

        if(errors.isEmpty()) {
            User.findOne({email:data.email},function(err,doc){
                doc.comparePassword(data.password,function(er,isMatch){
                    if(isMatch) {
                        req.session.user = doc;
                        return res.redirect('/profile');
                    } else {
                        data = {
                            ...req.body,
                            errors: {
                                password:{
                                    msg: 'Invalid email or Password'
                                }
                            }
                        }
                        res.render('login',data);
                    }
                })
            })
        } else {
            res.render('login',data);
        }
    }
);

export default router;