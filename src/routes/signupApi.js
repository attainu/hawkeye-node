import express from 'express';
import multer from 'multer';
import { body, validationResult } from 'express-validator';
const upload = multer();
const router = express.Router()

router.post(
    '/signup',
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
            res.status(200).json({
              ...data,
              message: 'Signed Up Successfully.'  
            });
        } else {
            res.status(400).json(data);
        }
    }
);

// module.exports = Router;

export default router;