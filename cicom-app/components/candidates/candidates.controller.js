(function (){
  'use strict';

  angular
  .module('cmsApp')
  .controller('CandidatesController', CandidatesController)
  .controller('SideNavController', SideNavController);
  
    function SideNavController($http, $cookies, $location, $scope) {
      var vm = this;
  
  
      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
      }init();
  
      vm.getOut = function(index){
        if(index == 0){
          $location.path('/news');
        } else if(index == 1){
          $location.path('/comments');
        } else if(index == 2){
          $location.path('/categories');
        } else if(index == 3){
          $location.path('/files');
        }else if(index == 4){
          $location.path('/users');
        }
      };
      
      vm.logout = function(){
        $cookies.remove('currentUserActive');
        console.log($cookies.get('currentUserActive'));
        //vm.loginCorrect = false;
        $location.path('/login');
      }
    }
  function CandidatesController($http, $cookies, $location, $scope) {
    var vm = this;
    function init(){ 
    }init();
  }
})();
