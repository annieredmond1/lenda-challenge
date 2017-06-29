'use strict';

var lendaApp = angular.module('lendaApp', []);

lendaApp.controller('rateQuoteController', ['quoteService', '$window', function(quoteService, $window) {
  var vm = this;
  vm.Math = window.Math;
  vm.assignQuotes = assignQuotes;
  vm.getFeeTotal = getFeeTotal;

  assignQuotes();

  function assignQuotes() {
    quoteService.getQuotes()
      .then(function(response) {
        vm.quotes = response.data.quotes;
      })
      .catch(function(error) {
        console.log('error', error);
      })
  }

  function getFeeTotal(fees) {
    vm.totalFees = 0;
    for (var key in fees) {
      if (key !== 'loan_points') {
        vm.totalFees += (fees[key]);
      } else {
        //loan_points will need to be subtracted from the fees, rather than added
        vm.totalFees -= (fees[key]);
      }

    };
    return vm.totalFees ;
  }

}])

lendaApp.factory('quoteService', ['$http', function($http) {
  return {
    getQuotes: getQuotes
  }

  function getQuotes() {
    return $http.get('http://lush-mirror.glitch.me/api')
  }
}])
