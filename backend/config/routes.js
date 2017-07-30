const express = require('express');
const auth = require('./auth');

//teste começa aqui

module.exports = function(server) {
  
  //Rotas protegidas por Token JWT
  
  const protectedApi = express.Router();
  server.use('/api', protectedApi);
  protectedApi.use(auth);
  const BillingCycle = require('../api/billingCycle/billingCycleService');
  BillingCycle.register(protectedApi, '/billingCycles');
  
  const billingSummaryService = require('../api/billingSummary/billingSummaryService');
  protectedApi.route('/billingSummary').get(billingSummaryService.getSummary);
  
  //Rotas abertas
  
  const openApi = express.Router();
  server.use('/oapi', openApi);
  const AuthService = require('../api/user/authService');
  openApi.post('/login', AuthService.login);
  openApi.post('/signup', AuthService.signup);
  openApi.post('/validateToken', AuthService.validateToken);
}


//teste termina aqui


/*

//teste de rotas protegidas acima

module.exports = function(server){
	const router = express.Router();
	server.use('/api', router);

	const billingCycleService = require('../api/billingCycle/billingCycleService');
	billingCycleService.register(router, '/billingCycles');

	const billingSummaryService = require('../api/billingSummary/billingSummaryService');
	router.route('/billingSummary').get(billingSummaryService.getSummary);
};

*/