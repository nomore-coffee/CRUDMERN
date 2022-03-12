import Mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';    
const userSchema  = Mongoose.Schema({
    name:String,
    username:String,
    email:String,
    phone:Number,

})
autoIncrement.initialize(Mongoose.connection);
userSchema.plugin(autoIncrement.plugin,'user')
const user = Mongoose.model('user',userSchema);

export default  user;