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

      vm.setActive = function(){
        if($location.path()=="/candidates"){
          var myEl = angular.element( document.querySelector( '#candidates' ) );
          if(myEl != undefined){
            myEl.addClass('active');
          }
          myEl = angular.element( document.querySelector( '#news' ) );
          if(myEl != undefined){
            myEl.removeClass('active');
          }
          myEl = angular.element( document.querySelector( '#categories' ) );
          if(myEl != undefined){
            myEl.removeClass('active');
          }
        }
      };

      vm.getOut = function(index){
        if(index == 0){
          var myEl = angular.element( document.querySelector( '#news' ) );
          myEl.addClass('active')
          myEl = angular.element( document.querySelector( '#candidates' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#categories' ) );
          myEl.removeClass('active')
          $location.path('/news');
        } else if(index == 1){
          var myEl = angular.element( document.querySelector( '#news' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#candidates' ) );
          myEl.addClass('active')
          myEl = angular.element( document.querySelector( '#categories' ) );
          myEl.removeClass('active')
          $location.path('/candidates');
        } else if(index == 2){
          var myEl = angular.element( document.querySelector( '#news' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#candidates' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#categories' ) );
          myEl.addClass('active')
          $location.path('/categories');
        }
      };
      
      vm.logout = function(){
        //$cookies.remove('currentUserActive');
        //console.log($cookies.get('currentUserActive'));
        //vm.loginCorrect = false;
        alert("ITS WORKING!");
        $location.path('/login');
      }
      function cloneObject(object){
        var clone = {};
        for(var key in object){
          if(object.hasOwnProperty(key))
            clone[key] = object[key];
        }
        return clone;
      };
    }
  function CandidatesController($http, $cookies, $location, $scope) {
    var vm = this;


    function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
      var myEl = angular.element( document.querySelector( '#news' ) );
      myEl.removeClass('active')
      myEl = angular.element( document.querySelector( '#candidates' ) );
      myEl.addClass('active')
      myEl = angular.element( document.querySelector( '#categories' ) );
      myEl.removeClass('active')
    }init();

    function cloneObject(object){
      var clone = {};
      for(var key in object){
        if(object.hasOwnProperty(key))
          clone[key] = object[key];
      }
      return clone;
    };
  }
})();
