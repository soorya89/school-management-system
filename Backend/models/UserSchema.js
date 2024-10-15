import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{
        type:String,
        enum:["admin","office staff","librarian"],
        default:"admin"
    },
    phone:{type:String,unique:true,required:true}
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  // UserSchema.methods.matchPassword = async function (enteredPassword) {
  //   return await bcrypt.compare(enteredPassword, this.password);
  // };

export default mongoose.model("User",UserSchema)