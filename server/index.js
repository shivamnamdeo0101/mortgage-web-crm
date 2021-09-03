//index.js for express server 

const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

//twilio requirements -- Texting API 
const accountSid = 'ACa7e54c4d0083bbf199bd391cc08f61bd';
const authToken = '0ab3a929a8aafcf12bac4be9466b6878'; 
const client = new twilio(accountSid, authToken);

const app = express(); 
app.use(cors()); 

app.get('/api', (req, res) => {
    res.send('Server Running')
})

app.post('/api/send-sms', (req, res) => {
    res.send('Hello to the Twilio Server')
    const {  msg ,to} = req.query;
    client.messages.create({
        body: "Hello mesage from twilio ..",
        to: "+917828353784",  
        from: '+19547168413'
    }).then((message) => console.log(message.body));
})
app.listen(4000, () => console.log("Running on Port 4000"))