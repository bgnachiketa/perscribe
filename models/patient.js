const { Sequelize,DataTypes } = require("sequelize")
const db = require('../db/connectDB')

const Patient = db.define('patient', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age: {
      type: DataTypes.STRING,
      allowNull:false
    },
    disease:{
        type: DataTypes.STRING,
        allowNull:false
    },
    weight:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    bp:{
        type:DataTypes.CHAR,
        allowNull:false
    },
    time:{
        type:DataTypes.STRING
    },
    referedby:{
        type:DataTypes.STRING,
        allowNull:false

    }
  });

  Patient.sync()
         .then(()=>{
             console.log('Table Patient Created')
         })

module.exports = Patient