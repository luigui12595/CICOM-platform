(function (){
    'use strict';
  
    angular
    .module('cmsApp')
    .controller('LoginController', LoginController);
  
    function LoginController($http, $cookies, $location, $scope) {
      var vm = this;
      //LOCAL
      //vm.server = 'http://localhost:8081';
      //PROD
      vm.server = 'http://cluster.cenat.ac.cr:8081';
      vm.currentUserActive = $cookies.getObject('currentUserActive');
      vm.token = '';
      vm.errorLogginIn = false;
      vm.email = '';
      vm.pasword = '';
      vm.user = {};
      vm.loginCorrect = false;
      vm.success = false;
      

      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        vm.email = '';
        vm.password = '';
        var headers =
        {
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
        if($cookies.getObject('currentUserActive') != undefined){
          var user = $cookies.getObject('currentUserActive');
          var body = {
            'token' : user.sessionToken
          }
          //Verificar el token y renovarlo en caso de que sea dentro de los 30 min
          $http.post(vm.server+'/users/login', body)
          .then(function(response, headers){
            var code = response.data.stateMessage.code;
            if(code == 1000){
              vm.loginCorrect = true;
              $location.path('/news');
            }
          })
        };
      }init();
      
      $("#inputPassword").on('keyup', function (e) {
        e.preventDefault();
          if (e.keyCode == 13) {
            vm.login(vm.email, vm.password);
          }
      })


      vm.login = function(email, password){
        vm.user.email = email;
        vm.user.password = password;
        if(!email || !password){
          vm.errorLogginIn = true;
          alert("Error. Datos no ingresados.");
        }
        $http.post(vm.server+'/users/login', vm.user)
        .then(function(response, headers){
          var code = response.data.state.code;
          if(code == 1000){
            vm.errorLogginIn = false;
            vm.loginCorrect = true;
            $cookies.putObject('currentUserActive', response.data.user);
            $location.path('/news');
          }
          if(code == 2002){
            vm.errorLogginIn = true;
            alert("Error. Password incorrecto");
          }
          if(code == 2003){
            vm.errorLogginIn = true;
            alert("Error. Usuario incorrecto, verifique su email")
          }
        })
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
  })();
  