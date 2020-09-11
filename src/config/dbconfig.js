import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/hawkeye', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=>{
    console.log('Connected To MongoDB');
})
.catch(()=>{
    console.log('Error Connecting To MongoDB');
});