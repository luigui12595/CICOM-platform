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
              for(var i = 0; i < jsonArr.length; i++) {
                jsonArr[i].from = scope.$parent.files.mediaSelected;
              }
              console.log(jsonArr);
              scope.$apply(scope.$parent.files.dataArray = jsonArr);
              if(changeEvent.target.files[0].name.endsWith('fullstats.tab')){
                scope.$apply(scope.$parent.files.documentType = 'Posts');
              }else if(changeEvent.target.files[0].name.endsWith('comments.tab')){
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
      vm.mediaSelected = " "
      vm.dataArray=[];
      vm.documentType=" "
      vm.showLoader = false;
      vm.saveData = function(){
        vm.showLoader = true;
        var url_req = "";
        if(vm.documentType == "Comentarios"){
          url_req = vm.mongoServer+'/insertComments';
        }else if(vm.documentType == "Posts"){
          url_req = vm.mongoServer+'/insertPost';
        }
        $http.post(url_req, {'dataArray':vm.dataArray}, vm.headers)
          .then(function(response){
            var results = response.data;
            if(results.stateMessage.code == 1000){
              alert('Datos insertados correctamente: '+results.responseObject.nUpserted+'\n Conicidencias de Datos: '+results.responseObject.nMatched);
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
      
      
    }
  })();
  