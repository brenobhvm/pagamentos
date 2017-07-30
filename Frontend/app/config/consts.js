angular.module('primeiraApp').constant('consts', {
	appName: 'MEAN - Primeira Aplicação',
	version: '1.0',
	owner: 'Cod3r',
	year: '2017',
	site: 'http://cod3r.com.br',
	//apiUrl: 'http://localhost:3003/api',
	//oapiUrl: 'http://localhost:3003/oapi',
	apiUrl: 'http://162.243.167.154:3003/api',
	oapiUrl: 'http://162.243.167.154:3003/oapi',
	userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
	$rootScope.consts = consts;
}])