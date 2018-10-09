var dbconn = require('./sqlConnection');
var jwt = require('jsonwebtoken');
const log = require('./log').log;
const config = require('../config');

exports.createToken = (payload) => {
    var token = jwt.sign(payload, config.tokenSecret, { 
                        expiresIn: config.defaultTokenExpiry,
                        issuer: config.issuer,
                    });
    console.log(token);
    return token;
}

exports.verifyToken = async(token) => {
    //console.log('verifying...');
    jwt.verify(token, config.tokenSecret, {issuer: config.issuer}, (err, decoded) => {
        if(err){
            console.log(err.name + ':\n\n' + err.message);
            return err.name;
        }
        else{ return '';}
    })
}

exports.checkRequestToken = async(req, res, next) => {
    // check header or url parameters or post parameters for token
	var token = req.headers['authorization'];
	// decode token
	if (token) {
		var err = await this.verifyToken(token);
		if(err != '')
			res.json({error: err});
		else next();
	} else {
	  // if there is no token
	  // return an error
	  return res.status(403).send({ 
		  error: 'No token provided.' 
	  });
  
	}
  }