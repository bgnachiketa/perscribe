const express = require('express')
const router = new express.Router()
const Doctor = require('../../models/doctor')
const Patient = require('../../models/patient')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const generatepdf = require('./genPDF')
const {sendWelcomeEmail,sendPrescriptionEmail} = require('../../emails/email')


router.post('/signup',async(req,resp)=>{
    console.log(req.body)
    sendWelcomeEmail(req.body.email,req.body.name)
    req.body.password = await bcrypt.hash(req.body.password,8)
    const doctor = {...req.body}
    const accessToken = jwt.sign(doctor.id,"nachiketabg")

    Doctor.create(doctor).then(()=>{
        resp.send(`Signup succesfull for ${req.body['name']} ${accessToken}`)
    }).catch((err)=>{
        resp.status(400).send(`Error in logging Signup : ${err}`)
    })
})

router.get('/me',auth, async (req,resp)=>{
    doctor = await Doctor.findOne({where:{id:req.id}})
    resp.status(200).send(doctor)
})

router.post('/login',async(req,resp)=>{
    console.log(req.body.email)
    try{
        doctor = await Doctor.findOne({where:{email:req.body.email}})
        
        if (doctor==null){
            return resp.status(400).send('Invalid credentials')
        }
        const login = await bcrypt.compare(req.body.password,doctor.password)
        if(!login){
            resp.status(200).send('Failed to login')
        }
        resp.status(200).send('Success login')
        
    }catch(e){
        resp.status(400).send('Invalid Credentials')
    }
})

router.patch('/update',auth, async(req,resp)=>{
    try{ 
     await Doctor.update(
            req.body
      ,
      {
            where:{id:req.id}

      })
        resp.status(200).json(req.body)
    }
     catch (e){
         resp.status(400).send(e)
     }
})
router.get('/viewpatient', auth, async(req,resp)=>{
    try{
        const patients = await Patient.findAll({where:{referedby:req.id}})
        resp.status(200).send(patients)
    }catch(e){
        resp.status(500).send({"error":"Patients not found"})
    }
})
router.post('/prescribe', auth, async(req,resp)=>{
    try{
        const doctor = await Doctor.findOne({where:{id:req.id}})
        const {id,name,degreeType,phNo,hName,hAddress,hphno,date} = doctor['dataValues']
        prescription_details = req.body
        prescription_details['id'] = id
        prescription_details['name'] = name
        prescription_details['date'] = date
        prescription_details['phNo'] = phNo
        prescription_details['hphno']= hphno
        prescription_details['hName'] = hName
        prescription_details['hAddress'] = hAddress
        prescription_details['degreeType'] = degreeType
        console.log('Patient', req.body.patient)
        //Insert into Patient DB
        let patient  = { name:req.body.patient.name,
                         email:req.body.patient.email,
                         age:req.body.patient.age,
                         bp:req.body.patient.bp,
                         weight:req.body.patient.weight,
                         disease:req.body.patient.disease,
                         tablet:req.body.tablets,
                         referedby:req.id
                        }
       
        //console.log(typeof(JSON.stringify(prescription_details)))
        await generatepdf(JSON.stringify(prescription_details))
        await sendPrescriptionEmail(req.body.patient.email,req.body.patient.name)
        Patient.create(patient).then(()=>resp.send(`Prescription succesfully sent to ${req.body.patient.email}`)).catch((e)=>{
            resp.send('Failed To send Prescription')
        })
        }catch(e){
        resp.send({"error":"error in sendin prescription"})
    }

})

module.exports = router
