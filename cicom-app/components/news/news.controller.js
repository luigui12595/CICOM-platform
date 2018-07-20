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
    vm.sqlServer = 'http://localhost:8081';
    vm.mongoServer = 'http://localhost:8080';
    vm.newsIndex;
    vm.subjects;
    vm.mediaSelected = "todos";
    vm.sinceDate;
    vm.untilDate;
    vm.keysArray;
    vm.newsCreationDate;
    vm.newsUpdateDate;
    var headers =
    {
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
    vm.selectNews = function(newsChoice){
      vm.news = newsChoice;
      vm.newsIndex = vm.newsArray.indexOf(newsChoice);
      vm.selectedNews = true;
      vm.newsCreationDate = new Date(vm.news.created_time);
      vm.newsUpdateDate = new Date(vm.news.updated_time);
    };
    vm.saveNews = function(){
      vm.news.FechaTS = (vm.news.FechaTS).toISOString();
      vm.newsArray[vm.newsIndex] = vm.news ;
      vm.selectedNews = false;
    };
    vm.return = function(){
      vm.selectedNews = false;
    }
    
    vm.findNews = function(){
      if(!vm.sinceDate || !vm.untilDate){
        alert("Es necesario introducir un rango de fechas");
        return;
      }
      var since_date = new Date(vm.sinceDate); // some mock date
      var until_date = new Date(vm.untilDate);
      var since_secs = (since_date.getTime())/1000;
      var until_secs = (until_date.getTime())/1000;
      if(since_secs > until_secs){
        alert("La fecha inicial debe de ser anterior a la fecha final");
        return;
      }
      if(vm.mediaSelected == "todos"){
        var url_req = vm.mongoServer+'/getPosts/'+(since_secs).toString()+'/'+(until_secs).toString();
        var config = {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
        }
        $http.get(url_req,config)
        .then(function(response, headers){
          vm.newsArray = response.data.results;
          vm.keysArray = Object.keys(vm.newsArray[0]);
        })
      }else{
        var url_req = vm.mongoServer+'/getPosts/'+vm.mediaSelected+"/"+(since_secs).toString()+'/'+(until_secs).toString();
        var config = {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
        }
        $http.get(url_req,config)
        .then(function(response, headers){
          vm.newsArray = response.data.results;
          vm.keysArray = Object.keys(vm.newsArray[0]);
        })
      } 
    }
    vm.newsArray;
    vm.sortType     = 'created_time'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchNews   = '';  //Filter news
    vm.commentSortType = '';
    vm.commentSortReverse = false;
    vm.searchComments = '';
    vm.media;


    function init(){
      var myEl = angular.element( document.querySelector( '#news' ) );
      myEl.addClass('active')
      myEl = angular.element( document.querySelector( '#candidates' ) );
      myEl.removeClass('active')
      myEl = angular.element( document.querySelector( '#categories' ) );
      myEl.removeClass('active')
      $http.get(vm.sqlServer+'/Media/getMedia')
      .then(function(response, headers){
        vm.media = response.data.data;
      })
      $http.get(vm.sqlServer+'/subjects/getSubjects/')
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
