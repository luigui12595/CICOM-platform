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
        if(vm.currentUserActive == null){
          $location.path('/login');
        }
      if(!vm.currentUserActive.isAdmin){
        vm.userAccess = false; 
      }
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
      vm.loginCorrect = false;
      
      $location.path('/login');
    }
  }

  function UserController($http, $cookies, $location) {
    var vm = this;
    //LOCAL
    //vm.sqlServer = 'http://localhost:8081';
    //vm.mongoServer = 'http://localhost:8082';
    //PROD
    vm.sqlServer = 'http://cluster.cenat.ac.cr:8081';
    vm.mongoServer = 'http://cluster.cenat.ac.cr:8082';
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
      if(!vm.isCreating){
        $http.put(vm.sqlServer+'/users/updateUser', vm.user)
          .then(function(response, headers){
            var code = response.data.state.code;
            if(code == 1002){
              $http.get(vm.sqlServer+'/users/getUser')
              .then(function(response, headers){
                vm.usersList = response.data.data;
                alert("El usuario se actualizó exitosamente.")
                vm.isCreating = false
                vm.userSelected = false;
                vm.confirmPass = "";
              })
              
            }
          })
      }else{
        if(vm.confirmPass !== vm.user.password){
          alert("Las contraseñas no coinciden, por favor ingreselas de nuevo.")
        }else{
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
        }
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
        active:false,
      };
      vm.isCreating = true;
      vm.userSelected = true;
    }

    function init(){ 
      vm.currentUserActive = $cookies.getObject('currentUserActive');
      if(vm.currentUserActive == null){
        $location.path('/login');
      }
      if(!vm.currentUserActive.isAdmin){
        vm.userAccess = false; 
      }
      $http.get(vm.sqlServer+'/users/getUser')
      .then(function(response, headers){
        vm.usersList = response.data.data;
      })
    }init();  
    }
})();
