import express from 'express';
const router = express.Router();

router.get('/',function(nad,david){
    if(!nad.session.user) {
        return david.redirect('/login');
    }
    const name = 'David';
    david.render('profile',{
        //normal object es5 key:value
        //name:name
        //With es6
        name,
        user: nad.session.user
    });
});

module.exports = router;
