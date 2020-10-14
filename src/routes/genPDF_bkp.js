const puppeteer = require('puppeteer');
var path = require('path');
 
const fs = require('fs-extra');
const data = require('./database.json');
const hbs = require('handlebars');

const moment = require('moment');
//const { listenerCount } = require('process');

const compile = async function(templateName, data){
    const filePath = '/home/nachi/JS/doctor/src/routes/short-list.hbs' // path.join(process.cwd(), 'template', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8') ;
    return hbs.compile(html)(data);
};

hbs.registerHelper('dateFormat', function(value, format){
    return moment(value).format(format);
});


(async function(){
    try{
        const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox', '--disable-setuid-sandbox'],ignoreHTTPSErrors: true});
        const page = await browser.newPage();
        const content = await compile('shot-list', data);
       
        await page.setContent(content);
        await page.emulateMediaType('screen');
        
        await page.pdf({
            path:'nbg.pdf',
            format:'A4',
            printBackground:true
        });
        console.log('Done');
        await browser.close();
        process.exit();
    }catch(e){
         console.log('Our Error', e);
    }
})();