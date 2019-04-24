var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transport = {
  host: 'smtp.qq.com',


  auth: {
    user: '1747360861@qq.com',
    pass: 'mebeoamvhwhbecdh'
  }
}

const vari=Math.random().toFixed(6).slice(-6);


var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.username
  var email = req.body.email
  var content = 'Your varification code is ' + req.body.message

  var mail = {
    from: '1747360861@qq.com',
    to: email,  //Change to email address that you want to receive messages on
    subject: 'New Message from Accenture support',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;
