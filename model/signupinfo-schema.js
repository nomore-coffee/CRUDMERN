import Mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';    
const signuppinfoSchema  = Mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required: true , unique: true},
    username:{type:String , required: true },
    password:{type:String , required:true},

},{collection:'signupinfos'})
autoIncrement.initialize(Mongoose.connection);
signuppinfoSchema.plugin(autoIncrement.plugin,'Signupinfo')
const signup = Mongoose.model('Signupinfo',signuppinfoSchema);

export default  signup;