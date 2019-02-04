(function (){
    'use strict';
  
    angular
    .module('cmsApp')
    .controller('FilesController', FilesController)
    .controller('SideNavController', SideNavController)
    .directive("importSheetJs", SheetJSImportDirective);

    function SheetJSImportDirective() {
      return {
        scope: true,
        controller:'FilesController',
        bindToController:true,
        controllerAs:'vm',
        link: function (scope, $elm) {
          $elm.on('change', function (changeEvent) {
            var reader = new FileReader();
            reader.onload = function (e) {
              /* read workbook */
              var bstr = e.target.result;
              var splited_data = bstr.split('\n')
              var jsonArr = [];
              //console.log(splited_data);
              var keysArray = splited_data[0].split('\t');
              for (var i = 1; i < splited_data.length; i++) {
                var valuesArray = splited_data[i].split('\t');
                var elementJson = {};
                for (var j = 0; j < keysArray.length; j++) {
                  if(valuesArray[j] != undefined){
                    if(isNaN(valuesArray[j])){
                      elementJson[keysArray[j]] = valuesArray[j];
                    }else{
                      elementJson[keysArray[j]] = parseInt(valuesArray[j]);
                    }
                  }
                }
                if(elementJson != {}){
                  jsonArr.push(cloneObject(elementJson));
                }
              }
              var filename = changeEvent.target.files[0].name;
              var splittedFilename = filename.split("_");
              var media = scope.$parent.files.media;
              var mediaSelected = {};
              for(var i = 0; i < media.length; i++) {
                if(splittedFilename[1]==media[i].facebook_id){
                  mediaSelected = media[i];
                }
              } 
              for(var i = 0; i < jsonArr.length; i++) {
                jsonArr[i].from = mediaSelected;
              }
              scope.$apply(scope.$parent.files.mediaSelected = mediaSelected.name);
              scope.$apply(scope.$parent.files.dataArray = jsonArr);
              if(filename.endsWith('fullstats.tab')&& Object.keys(mediaSelected).length > 0){
                scope.$apply(scope.$parent.files.documentType = 'Posts');
              }else if(filename.endsWith('comments.tab')&& Object.keys(mediaSelected).length > 0){
                scope.$apply(scope.$parent.files.documentType = 'Comentarios');
              }else{
                alert('Archivo no soportado');
                scope.$apply(scope.$parent.files.documentType = ' ');
                scope.$apply(scope.$parent.files.dataArray = []);
              }        
            };
            
            reader.readAsText(changeEvent.target.files[0],'UTF-8');
          });
        }
      };
    }

    function cloneObject(object){
      var clone = {};
      for(var key in object){
        if(object.hasOwnProperty(key))
          clone[key] = object[key];
      }
      return clone;
    };

    function SideNavController($http, $cookies, $location, $scope) {
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
      //LOCAL
      //vm.sqlServer = 'http://localhost:8081';
      //vm.mongoServer = 'http://localhost:8082';
      //PROD
      vm.sqlServer = 'http://cluster.cenat.ac.cr:8081';
      vm.mongoServer = 'http://cluster.cenat.ac.cr:8082';
      vm.media;
      vm.mediaSelected = " "
      vm.dataArray=[];
      vm.documentType=" "
      vm.showLoader = false;
      vm.currentUserActive;
      vm.saveData = function(){
        vm.showLoader = true;
        var url_req = "";
        if(vm.documentType == "Comentarios"){
          url_req = vm.mongoServer+'/insertComments';
        }else if(vm.documentType == "Posts"){
          url_req = vm.mongoServer+'/insertPost';
        }
        var config = {
          headers : {
              'Content-Type': 'text/plain'
          }
        }
        $http.post(url_req, {'dataArray':vm.dataArray}, config)
          .then(function(response){
            var results = response.data;
            if(response.status == 200){
              alert('Datos insertados correctamente: '+results.nUpserted+'\nDatos previamente insertados: '+results.nMatched);
              vm.dataArray=[];
              vm.mediaSelected = " ";
              vm.documentType = " "
            }else{
              alert('Ocurrió un error, por favor inténtelo más tarde.');
              vm.dataArray=[];
              vm.mediaSelected = " ";
              vm.documentType = " "
            }
          },
            function(response){
              var results = response;
              console.log(results);
            }
          ).finally(function(){
            vm.showLoader = false;
          })
      }
      vm.cancelData = function () {
        vm.dataArray=[];
        vm.mediaSelected = " "
        vm.documentType = " "
      }
      
      function init(){
        vm.currentUserActive = $cookies.getObject('currentUserActive');
        if(vm.currentUserActive == null){
          $location.path('/login');
        }
        $http.get(vm.sqlServer+'/Media/getMedia')
        .then(function(response, headers){
            var mediaArray = response.data.data;
            mediaArray.pop();
            vm.media = mediaArray;
        })
      }init();
      
      
    }
  })();
  