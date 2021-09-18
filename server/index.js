//index.js for express server 

const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

//twilio requirements -- Texting API 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = new twilio(accountSid, authToken);

const app = express(); 
app.use(cors()); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);


app.get('/api', (req, res) => {
    res.send('Server Running')
})

app.post('/api/send-sms', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
    .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      
      res.send(JSON.stringify({ success: false }));
    });
})
app.listen(4000, () => console.log("Running on Port 4000"))