const sgMail = require('@sendgrid/mail')
const fs = require('fs-extra')


sgMail.setApiKey('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')


const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to:email,
        from:'medicineonline91@gmail.com',
        subject:'Greeetings from medicineonline91!!!',
        text:`Welcome to the medicineonline91 Application
              Thanks for Joining us${name}`
    })
}
function base64_encode(file){
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
    }
    
const sendPrescriptionEmail = async (email, name) => {
       try{
        data_file = base64_encode('/home/nachi/JS/doctor/nachi.pdf');
        await sgMail.send({
            to          : email,
            from        : 'medicineonline91@gmail.com',
            subject     : `Hello ${name}, please find medical report`,
            attachments : [{filename: 'medicine.pdf', 
                           content: data_file,
                           type: 'application/pdf',
                           disposition: 'attachment'}],
            text:`Get wll soon ${name}`
        })
        
            }catch(e){
                    console.log('Error')
        }
}


module.exports = {
    sendWelcomeEmail,
    sendPrescriptionEmail
}
