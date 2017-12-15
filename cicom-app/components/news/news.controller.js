(function (){
  'use strict';

  angular
  .module('cmsApp')
  .controller('NewsController', NewsController)
  .controller('SideNavController', SideNavController);
  
  function SideNavController($http, $cookies, $location) {
    var vm = this;
    function init(){ 
      var myEl = angular.element( document.querySelector( '#news' ) );
      myEl.addClass('active')
    }init();

    vm.setActive = function(index){
      if(index == 0){
        var myEl = angular.element( document.querySelector( '#news' ) );
        myEl.addClass('active')
      }else if(index == 1){
        var myEl = angular.element( document.querySelector( '#candidates' ) );
        myEl.removeClass('active')
      }else if(index == 2){
        var myEl = angular.element( document.querySelector( '#categories' ) );
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

  function NewsController($http, $cookies, $location) {
    var vm = this;
    vm.selectedNews = false;
    vm.news;
    vm.server = 'http://localhost:8081';
    vm.newsIndex;
    vm.subjects;
    var headers =
    {
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
    vm.selectNews = function(index){
      vm.news = index;
      vm.newsIndex = vm.newsArray.indexOf(index);
      vm.news.FechaTS = new Date(vm.news.FechaTS);
      vm.selectedNews = true;
    };
    vm.saveNews = function(){
      vm.news.FechaTS = (vm.news.FechaTS).toISOString();
      vm.newsArray[vm.newsIndex] = vm.news ;
      vm.selectedNews = false;
    };
    vm.return = function(){
      vm.selectedNews = false;
    }
    vm.newsArray;
    vm.sortType     = 'name'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchNews   = '';  //Filter news
    vm.media;


    function init(){
      var myEl = angular.element( document.querySelector( '#news' ) );
      myEl.addClass('active')
      myEl = angular.element( document.querySelector( '#candidates' ) );
      myEl.removeClass('active')
      myEl = angular.element( document.querySelector( '#categories' ) );
      myEl.removeClass('active')
      $http.get(vm.server+'/Media/news')
      .then(function(response, headers){
        vm.newsArray = response.data;
      })
      $http.get(vm.server+'/Media/getMedia')
      .then(function(response, headers){
        vm.media = response.data.data;
      })
      $http.get(vm.server+'/subjects/getSubjects/')
      .then(function(response, headers){
        vm.subjects = response.data.data;
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
