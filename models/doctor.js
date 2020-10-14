const {Sequelize,DataTypes} = require('sequelize');
// const db = new Sequelize('postgres')
const db = require('../db/connectDB');
const { validate } = require('../db/connectDB');
const { validator } = require('validator');

const Doctor = db.define('doctor', {
    // Model attributes are defined here
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        required:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required:true
    },
    degreeType:{
      type:DataTypes.STRING,
      allowNull:false,
      required:true
    },
    phNo: {
      type: DataTypes.STRING,
      allowNull:false,
      required:true
    },
    hName:{
      type:DataTypes.STRING,
      allowNull:false,
      required:true
    },
    hAddress:{
        type: DataTypes.STRING,
        allowNull:false,
        required:true
    },
    hphno:{
      type: DataTypes.STRING,
      allowNull:false,
      required:true
    },

    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      required:true,
      trim:true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error('Email is invalid')
        }
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate(value){
        if(value.length<6){
          throw Error('Password less than 6 digit')
        }else if(value.toLowerCase().includes('password')){
          throw Error('Password sholud not contain \'pasword\'')
        }
      }
    }   
});

// Doctor.generateAuthToken = async function(){
//   const doctor = this
//   const token = jwt.sign({_id:doctor.id.toString()},process.env.JWT_TOKEN)
//   doctor.tokens = doctor.tokens.concat({token})
//   await doctor.sync()
//   return token
// }

  Doctor.sync()
        .then(()=>{
          console.log('Doctor table created')
        })
  
module.exports = Doctor

