import express from 'express';
const router = express.Router();

router.get('/',function(nad,david){
    const name = 'David';
    david.render('profile',{
        //normal object es5 key:value
        //name:name
        //With es6
        name
    });
});

module.exports = router;
