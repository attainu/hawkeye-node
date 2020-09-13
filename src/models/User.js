import mongoose from 'mongoose';
const bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
 
const schema = new Schema({
  email: String,
  name: String,
  password: String,
  address1: String,
  address2: String,
  city: String,
  zip: String
});


schema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(herr, hash) {
            if (herr) return next(herr);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', schema, 'users');

export default User;
