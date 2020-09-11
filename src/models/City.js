import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
const schema = new Schema({
  name: String,
  state: String
});


const City = mongoose.model('City', schema, 'cities');

export default City;
