(function (){
  'use strict';

  angular
  .module('cmsApp')
  .controller('UserController', UserController)
  .controller('SideNavController', SideNavController);
  
  function SideNavController($http, $cookies, $location) {
    var vm = this;
    function init(){ 
      var myEl = angular.element( document.querySelector( '#users' ) );
      myEl.addClass('active')
    }init();

    vm.setActive = function(index){
      if(index == 0){
        var myEl = angular.element( document.querySelector( '#news' ) );
        myEl.removeClass('active')
      }else if(index == 1){
        var myEl = angular.element( document.querySelector( '#candidates' ) );
        myEl.removeClass('active')
      }else if(index == 2){
        var myEl = angular.element( document.querySelector( '#categories' ) );
        myEl.removeClass('active')
      }else if(index == 3){
        var myEl = angular.element( document.querySelector( '#users' ) );
        myEl.addClass('active')
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
        myEl = angular.element( document.querySelector( '#users' ) );
        myEl.removeClass('active')
        $location.path('/news');
      } else if(index == 1){
        var myEl = angular.element( document.querySelector( '#news' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#candidates' ) );
        myEl.addClass('active')
        myEl = angular.element( document.querySelector( '#categories' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#users' ) );
        myEl.removeClass('active')
        $location.path('/candidates');
      } else if(index == 2){
        var myEl = angular.element( document.querySelector( '#news' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#candidates' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#categories' ) );
        myEl.addClass('active')
        myEl = angular.element( document.querySelector( '#users' ) );
        myEl.removeClass('active')
        $location.path('/categories');
      } else if(index == 3){
        var myEl = angular.element( document.querySelector( '#news' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#candidates' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#categories' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#users' ) );
        myEl.addClass('active')
        $location.path('/users');
      }
    };
    
    vm.logout = function(){
      $cookies.remove('currentUserActive');
      //console.log($cookies.get('currentUserActive'));
      vm.loginCorrect = false;
      
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

  function UserController($http, $cookies, $location) {
    var vm = this;
    vm.sqlServer = 'http://localhost:8081';
    vm.mongoServer = 'http://localhost:8080';
    vm.usersList;
    vm.sinceDate;
    vm.untilDate;
    vm.sortType = 'email'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchUsers   = '';  //Filter
    vm.userSelected = false;
    vm.user = {
      fname:" ",
      lname:" ",
      email:" ",
      modif_date:" ",
      creation_date:" ",
      status:" ",
      isAdmin:" ",
      pass:" "
    }
    
    var headers = {
      'Content-Type':'application/json',
      'Accept':'application/json'
    }

    vm.selectUser = function(userChoice){
      vm.user = userChoice;
      vm.userSelected = true;
    };

    vm.saveUser = function(){

    };

    vm.return = function(){
      vm.user = {};
      vm.userSelected = false;
    };
    
    function init(){
      var myEl = angular.element( document.querySelector( '#news' ) );
      myEl.addClass('active')
      myEl = angular.element( document.querySelector( '#candidates' ) );
      myEl.removeClass('active')
      myEl = angular.element( document.querySelector( '#categories' ) );
      myEl.removeClass('active')
      myEl = angular.element( document.querySelector( '#users' ) );
      myEl.addClass('active')
      $http.get(vm.sqlServer+'/users/getUser')
      .then(function(response, headers){
        vm.usersList = response.data.data;
      })
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
