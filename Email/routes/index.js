

var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

var mailTransport = nodemailer.createTransport({
	host : 'smtp.163.com',
	port: 465,
	secureConnection: true, // use SSL
	auth : {
		user : 'zhubo970202@163.com',
		pass : 'zhubo9722'
	},
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send', function(req, res, next) {
	var options = {
		from: '"AccentureTest" <zhubo970202@163.com>',
		to: '"Receiver" <zhubo970202@gmail.com>',
		// cc         : ''  //抄送
		// bcc      : ''    //密送
		subject: 'from AccentureTest',
		text: 'OK LETS GO',

	};




	
	mailTransport.sendMail(options, function(err, msg){
		if(err){
			console.log(err);
			res.render('index', { title: err });
		}
		else {
			console.log(msg);
			res.render('index', { title: "Successfully sent："+msg.accepted});
		}
	});
});

module.exports = router;
