(function (){
  'use strict';

  angular
  .module('cmsApp')
  .controller('UserController', UserController)
  .controller('SideNavController', SideNavController);
  
  function SideNavController($http, $cookies, $location) {
    var vm = this;
    vm.userAccess = true;
    function init(){ 
      vm.currentUserActive = $cookies.getObject('currentUserActive');
      if(!vm.currentUserActive.isAdmin){
        vm.userAccess = false; 
      }
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
        var myEl = angular.element( document.querySelector( '#files' ) );
        myEl.addClass('active')
      }else if(index == 4){
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
        myEl = angular.element( document.querySelector( '#files' ) );
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
        myEl = angular.element( document.querySelector( '#files' ) );
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
        myEl = angular.element( document.querySelector( '#files' ) );
        myEl.removeClass('active')
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
        myEl = angular.element( document.querySelector( '#files' ) );
        myEl.addClass('active')
        myEl = angular.element( document.querySelector( '#users' ) );
        myEl.removeClass('active')
        $location.path('/files');
      }else if(index == 4){
        var myEl = angular.element( document.querySelector( '#news' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#candidates' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#categories' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#files' ) );
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
    vm.isCreating = false;
    vm.user;
    vm.confirmPass="";
    vm.showPassword;
    vm.currentUserActive;
    vm.userAccess = true;

    var headers = {
      'Content-Type':'application/json',
      'Accept':'application/json'
    }

    vm.selectUser = function(userChoice){
      vm.user = userChoice;
      vm.userSelected = true;
    };

    vm.saveUser = function(){
      if(vm.confirmPass !== vm.user.password){
          alert("Las contraseñas no coinciden, por favor ingreselas de nuevo.")
      }else if(vm.isCreating){
        $http.post(vm.sqlServer+'/users/createUser', vm.user)
          .then(function(response, headers){
            var code = response.data.state.code;
            if(code == 1002){
              $http.get(vm.sqlServer+'/users/getUser')
              .then(function(response, headers){
                vm.usersList = response.data.data;
                alert("El usuario se registró exitosamente.")
                vm.isCreating = false
                vm.userSelected = false;
                vm.confirmPass = "";
              })
              
            }
          })
      }else{
        vm.isCreating = false
        vm.userSelected = false;
      }
    };

    vm.return = function(){
      vm.isCreating = false;
      vm.userSelected = false;
    };
    
    vm.createUser = function(){
      vm.user = {
        fname:"",
        lname:"",
        email:"",
        password:"",
        isAdmin:false,
        status:false,
      };
      vm.isCreating = true;
      vm.userSelected = true;
    }

    function init(){ 
      vm.currentUserActive = $cookies.getObject('currentUserActive');
      if(!vm.currentUserActive.isAdmin){
        vm.userAccess = false; 
      }
      var myEl = angular.element( document.querySelector( '#news' ) );
      myEl.removeClass('active')
      myEl = angular.element( document.querySelector( '#candidates' ) );
      myEl.removeClass('active')
      myEl = angular.element( document.querySelector( '#categories' ) );
      myEl.removeClass('active')
      myEl = angular.element( document.querySelector( '#files' ) );
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
