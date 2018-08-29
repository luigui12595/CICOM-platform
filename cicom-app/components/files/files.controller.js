(function (){
    'use strict';
  
    angular
    .module('cmsApp')
    .controller('FilesController', FilesController)
    .controller('SideNavController', SideNavController)
    
    function SideNavController($http, $cookies, $location, $scope) {
      var vm = this;
      vm.userAccess = true;
      function init(){ 
        vm.currentUserActive = $cookies.getObject('currentUserActive');
        if(!vm.currentUserActive.isAdmin){
          vm.userAccess = false; 
        }
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
          myEl.removeClass('active')
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
        //$cookies.remove('currentUserActive');
        //console.log($cookies.get('currentUserActive'));
        //vm.loginCorrect = false;
        
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
  
    function FilesController($http, $cookies, $location) {
      var vm = this;
      vm.sqlServer = 'http://localhost:8081';
      vm.mongoServer = 'http://localhost:8080';
      vm.headers = {
                      'Content-Type':'application/json',
                      'Accept':'application/json'
                    }
      vm.media;
      vm.mediaSelected

      vm.read = function(workbook){
        console.log(workbook);
        alert("ITS WORKING!");
      }
      
      vm.error = function (e) {
        /* DO SOMETHING WHEN ERROR IS THROWN */
        console.log(e);
      }
      
      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        var myEl = angular.element( document.querySelector( '#news' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#candidates' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#files' ) );
        myEl.addClass('active')
        myEl = angular.element( document.querySelector( '#users' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#categories' ) );
        myEl.removeClass('active')
        $http.get(vm.sqlServer+'/Media/getMedia')
        .then(function(response, headers){
            vm.media = response.data.data;
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
  