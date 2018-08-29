(function (){
  'use strict';

  angular
  .module('cmsApp')
  .controller('NewsController', NewsController)
  .controller('SideNavController', SideNavController)
  .directive('expand', function () {
    function link(scope, element, attrs) {
        scope.$on('onExpandAll', function (event, args) {
            scope.expanded = args.expanded;
        });
    }
    return {
        link: link
    };
  });;
  
  function SideNavController($http, $cookies, $location) {
    var vm = this;
    vm.userAccess = true;
    function init(){ 
      vm.currentUserActive = $cookies.getObject('currentUserActive');
      if(!vm.currentUserActive.isAdmin){
        vm.userAccess = false; 
      } 
      var myEl = angular.element( document.querySelector( '#news' ) );
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
        myEl.removeClass('active')
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

  function NewsController($http, $cookies, $location, $filter, $scope, $log) {
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
    vm.commentKeysArray;
    vm.newsCreationDate;
    vm.newsUpdateDate;
    vm.newsArray;
    vm.sortType     = 'created_time'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchNews   = '';  //Filter news
    vm.commentSortType = 'like_count';
    vm.commentSortReverse = false;
    vm.searchComments = '';
    vm.media;
    vm.filteredData;

    vm.expandAll = function(expanded) {
      // $scope is required here, hence the injection above, even though we're using "controller as" syntax
      $scope.$broadcast('onExpandAll', {
        expanded: expanded
      });
    };

    var headers =
    {
      'Content-Type':'application/json',
      'Accept':'application/json'
    }

    // $scope.$watch('vm.searchNews', function(current, original) {
    //   $log.info('vm.searchNews was %s', original);
    //   $log.info('vm.searchNews is now %s', current);
    // });
    $scope.$watch(function() {
      return vm.searchNews;
    }, function(current, original) {
      if(current == '' || /^\s+$/.test(current)){
        vm.filteredData = vm.newsArray;
      }else{
        vm.filteredData = $filter("filter")(vm.newsArray, current)
      }
    });
    

    vm.selectNews = function(newsChoice){
      vm.news = newsChoice;
      vm.newsIndex = vm.newsArray.indexOf(newsChoice);
      vm.selectedNews = true;
      vm.newsCreationDate = new Date(vm.news.created_time);
      vm.newsUpdateDate = new Date(vm.news.updated_time);
      var url_req = vm.mongoServer+'/getComments/'+vm.news._id;
      var config = {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      }
      $http.get(url_req,config)
      .then(function(response, headers){
        vm.news.commentArray = response.data.results;
        vm.commentKeysArray = Object.keys(vm.news.commentArray[0]);
      })
    };


    vm.saveNews = function(){
      vm.newsArray[vm.newsIndex] = vm.news ;
      delete vm.newsArray[vm.newsIndex].commentArray;
      var url_req = vm.mongoServer+'/updatePost';
      $http({method:'PUT', 'url':url_req, 'headers': headers, 'data':vm.news}).then(function(response){
        var results = response.data;
        if(results.code == 1000){
          alert('Post actualizado exitosamente')
          vm.selectedNews = false;
        }else{
          alert('Post no tuvo cambios')
          vm.selectedNews = false;
        }
        
      })
    };
    vm.return = function(){
      delete vm.newsArray[vm.newsIndex].commentArray;
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
          if(vm.newsArray.length > 0){
            vm.keysArray = Object.keys(vm.newsArray[0]);
          }else{
            alert('No se encontraron posts del medio buscado en las fechas requeridas');
          }
        })
      } 
    }
   

    function init(){
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
