(function (){
    'use strict';
  
    angular
    .module('cmsApp')
    .controller('CategoriesController', CategoriesController)
    .controller('SideNavController', SideNavController);
    
    function SideNavController($http, $cookies, $location, $scope) {
      var vm = this;
      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        
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
  
    function CategoriesController($http, $cookies, $location) {
      var vm = this;
      vm.server = 'http://localhost:8081';
      vm.headers = {
                      'Content-Type':'application/json',
                      'Accept':'application/json'
                    }
      vm.newsArray;
      vm.framingArray;
      vm.framingSelected;
      vm.newsSelected;
      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        var myEl = angular.element( document.querySelector( '#news' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#candidates' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#categories' ) );
        myEl.addClass('active')
        $http.get(vm.server+'/Media/news')
        .then(function(response, headers){
          vm.newsArray = response.data.data;
        })
        $http.get(vm.server+'/subjects/getSubjects')
        .then(function(response, headers){
          vm.framingArray = response.data.data;
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
  