const restful = require('node-restful');
const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const creditSchema = new mongoose.Schema({
	name: { type: String, required: true },
	value: { type: Number, min: 0, required: true }
});

const debitSchema = new mongoose.Schema({
	name: { type: String, required: true },
	value: { type: Number, min: 0, required: [true, 'Informe o valor do débito'] },
	status: { type: String, required: false, uppercase: true, enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
});

const billingCycleSchema = new mongoose.Schema({
	//userId: { type: String, required: true },
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Nenhum usuario encontrado']},
	name: { type: String, required: true },
	month: { type: Number, min: 1, max: 12, required: true },
	year: { type: Number, min: 1970, max: 2100, required: true },
	credits: [creditSchema],
	debits: [debitSchema]
});

//Teste para verificar update
/*
var generateMatcherUpdate= function(next, req) {
    //var matcher = "generate matcher function"
    //this.update({matcher: matcher});
//console.log(req);
var query = this.getQuery();  // contains id
  var update = this.getUpdate();
console.log(update);
    next();
};

billingCycleSchema.pre('findOneAndUpdate', generateMatcherUpdate);
*/

module.exports = restful.model('BillingCycle', billingCycleSchema);