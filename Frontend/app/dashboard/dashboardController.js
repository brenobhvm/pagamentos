(function() {
	angular.module('primeiraApp').controller('DashboardCtrl', [
		'$http',
		DashboardController
	]);

	function DashboardController($http){
		const vm = this;
		vm.getSummary = function(){
			const url = 'http://localhost:3003/api/billingSummary';
			$http.get(url).then(function(response){
				const {credit = 0, debit = 0} = response.data;
				vm.credit = credit;
				vm.debit = debit;
				vm.total = credit - debit;
			});
		}

		vm.getSummary();
	}
})()
