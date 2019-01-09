(function (){
    'use strict';
  
    angular
    .module('cmsApp')
    .controller('CommentsController', CommentsController)
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
    });
    
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
        //vm.loginCorrect = false;
        $location.path('/login');
      }
    }
  
    function CommentsController($http, $cookies, $location, $filter, $scope, $log, $templateCache) {
      var vm = this;
      vm.showLoader = false;
      vm.selectedComments = false;
      vm.comment;
      //LOCAL
      vm.sqlServer = 'http://localhost:8081';
      vm.mongoServer = 'http://localhost:8082';
      //PROD
      // vm.sqlServer = 'http://cluster.cenat.ac.cr:8081';
      // vm.mongoServer = 'http://cluster.cenat.ac.cr:8082';
      vm.commentIndex;
      vm.subjects;
      vm.mediaSelected = "0";
      vm.searchWords = "";
      vm.sinceDate;
      vm.untilDate;
      vm.searchInPost = false;
      vm.keysArray;
      vm.originalCommentsArray;
      vm.currentUserActive;
      vm.commentsArray;
      vm.sortType     = 'created_time'; // set the default sort type
      vm.sortReverse  = false;  // set the default sort order
      vm.searchComments   = '';  //Filter news
      vm.commentSortType = 'comment_position';
      vm.commentSortReverse = false;
      vm.media;
      vm.filteredData;
  
      vm.expandAll = function(expanded) {
        $scope.$broadcast('onExpandAll', {
          expanded: expanded
        });
      };
  
      var headers =
      {
        'Content-Type':'application/json',
        'Accept':'application/json'
      }

      $scope.$watch(function() {
        return vm.searchComments;
      }, function(current, original) {
        if(current == '' || /^\s+$/.test(current)){
          vm.filteredData = vm.commentsArray;
        }else{
          vm.filteredData = $filter("filter")(vm.commentsArray, current)
        }
      });
      
  
      vm.selectComments = function(commentChoice){
        vm.showLoader = true;
        vm.comment = commentChoice;
        vm.commentIndex = vm.commentsArray.indexOf(commentChoice);
        vm.selectedComments = true;
        vm.showLoader = false;
      };
  
  
      // vm.saveNews = function(){
      //   vm.showLoader = true;
      //   vm.commentsArray[vm.commentIndex] = vm.comment ;
      //   delete vm.commentsArray[vm.commentIndex].commentArray;
      //   var url_req = vm.mongoServer+'/updatePost';
      //   var config = {
      //     headers : {
      //         'Content-Type': 'application/json'
      //     }
      //   }
      //   $http.put(url_req,vm.news, config.headers)
      //        .then(function(response,headers){
      //         var results = response.data;
      //         if(results.matched == 1){
      //           alert('Post actualizado exitosamente')
      //           vm.selectedComments = false;
      //         }else{
      //           alert('Post no tuvo cambios')
      //           vm.selectedComments = false;
      //         }
      //         vm.showLoader = false;
      //   }).then(function (obj) {
      //     vm.showLoader = false;
      // });
      // };

      vm.return = function(){
        delete vm.commentsArray[vm.commentIndex].commentArray;
        vm.selectedComments = false;
      }
      
      vm.findComments = function(){
        vm.showLoader = true;
        var params = {}
        var url_req = vm.mongoServer+'/getComments';
        var config = {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
        }
        if(((vm.searchWords != undefined && vm.searchWords != "")|| (vm.sinceDate && vm.untilDate))){
          if(vm.mediaSelected != "0"){
            params.medio = vm.mediaSelected;
          }
          var since_date = new Date(vm.sinceDate); // some mock date
          var until_date = new Date(vm.untilDate);
          var since_secs = (since_date.getTime())/1000;
          var until_secs = (until_date.getTime())/1000;
          if(since_secs > until_secs && since_secs && until_secs){
            alert("La fecha inicial debe de ser anterior a la fecha final");
            return;
          }
          if(since_secs){
            params.finicio = Math.trunc(since_secs);
          }
          if(until_secs){
            params.ffinal = Math.trunc(until_secs);
          }
          if(vm.searchWords != ""){
            params.text = vm.searchWords
          }
          if(vm.searchInPost){
            params.posts = true
          }else{
            params.posts = false
          }
          $http({url: url_req, method: 'GET', params:params})
            .then(function(response, headers){
              vm.commentsArray = response.data;
              if(vm.commentsArray.length > 0){
                vm.keysArray = Object.keys(vm.commentsArray[0]);
                var commentsArray = response.data;
                vm.originalCommentsArray = commentsArray;
                var resultArray = [];
                var responseComments = [];
                for (var i = 0; i < commentsArray.length; i++){
                  if(commentsArray[i].is_reply == 0){
                    if(responseComments.length>0){
                      commentsArray[i].commentsResponse=responseComments;
                      responseComments = [];
                    }else{
                      commentsArray[i].commentsResponse=[];
                    }
                    resultArray.push(commentsArray[i]);
                  }else{
                    responseComments.push(commentsArray[i]);
                  }
                }
                for (var i = 0; i < resultArray.length; i++){
                  resultArray[i].comment_count = resultArray[i].commentsResponse.length;
                }
                vm.commentsArray = resultArray;
                vm.showLoader = false;
              }else{
                vm.showLoader = false;
                alert('No se encontraron comentarios asociados a posts que contengan las palabras claves');
              }
            }) 
        }else{
          vm.showLoader = false;
          alert('La búsqueda debe de contener palabras clave o un rango de fechas');
        }
      }
     
  
      function init(){
        vm.currentUserActive = $cookies.getObject('currentUserActive');
        if(vm.currentUserActive == null){
          $location.path('/login');
        }
        $http.get(vm.sqlServer+'/Media/getMedia')
        .then(function(response, headers){
          vm.media = response.data.data;
        })
        $http.get(vm.sqlServer+'/category/getCategory/')
        .then(function(response, headers){
          vm.subjects = response.data.data;
        })
      }init();
    }
  })();
  