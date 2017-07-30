const BillingCycle = require('./billingCycle');
const _ = require('lodash');

BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({new: true, runValidators: true});

BillingCycle.before('get', function(req, res, next){req.query.userId = req.decoded.id; req.query.populate = 'userId';next();});
BillingCycle.before('post', addIdUser).before('put', verifyUpdate);

BillingCycle.after('post', sendErrorOrNext).after('put', sendErrorOrNext);

function sendErrorOrNext(req, res, next){
	const bundle = res.locals.bundle;

	if(bundle.errors){
		var errors = parseErrors(bundle.errors);
		res.status(500).json({errors});
	} else {
		next();
	}
};

function addIdUser(req, res, next){
	if(req.decoded.id){
		req.body.userId = req.decoded.id;
		next();
	} else {
		var errors = 'Falha interna no servidor';
		res.status(500).json({errors});
	}
};

function verifyUpdate(req, res, next){
	if(req.decoded.id){
		BillingCycle.find({ _id: req.params.id }, function (err, result) {
            if(err){
				res.status(500).json({errors: [err]});
			} else{
				if(req.decoded.id == result[0].userId){
					next();
				} else{
					var errors = 'Falha interna no servidor';
					res.status(500).json({errors});			
				}
			}
        });
	} else {
		var errors = 'Falha interna no servidor';
		res.status(500).json({errors});
	}
};

function parseErrors(nodeRestfulErrors){
	const errors = [];
	_.forIn(nodeRestfulErrors, error => errors.push(error.message));
	return errors;
};

BillingCycle.route('count', function(req, res, next){
	/*
	BillingCycle.count({userId: req.decoded.id}, function(err, c) {
        console.log('Count is ' + c);
    });
	*/
	BillingCycle.count({userId: req.decoded.id}, function(error, value){
		if(error){
			res.status(500).json({errors: [error]});
		} else{
			res.json({value});
		}
	});
});

module.exports = BillingCycle;