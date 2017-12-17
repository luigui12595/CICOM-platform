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
      vm.candidateArray;
      vm.framingArray;
      vm.framingSelected=[];
      vm.candidateSelected=[];
      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        var myEl = angular.element( document.querySelector( '#news' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#candidates' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#categories' ) );
        myEl.addClass('active')
        $http.get(vm.server+'/candidates/getCandidates')
        .then(function(response, headers){
          vm.candidateArray = response.data.data;
        })
        $http.get(vm.server+'/subjects/getSubjects')
        .then(function(response, headers){
          vm.framingArray = response.data.data;
        })
      }init();

      
      vm.deleteFraming =function (){
        if(vm.framingSelected != []){
          if(!vm.framingSelected[0].subject_id){
            alert("No se puede eliminar un tono sin guardar");
          }else{
            var elemId = vm.framingSelected[0].subject_id;
            var objectToDelete = { 
              "subject_id":elemId
            }
            $http.post(vm.server+'/subjects/deleteSubject', objectToDelete )
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/subjects/getSubjects')
                .then(function(response, headers){
                  vm.framingArray = response.data.data;
                  alert("Tono eliminado");
                })
              }else{
                alert("Ocurrió un error al eliminar el tono, inténtelo de nuevo");
              }
            }) 
          }
        }else{
          alert("No se ha seleccionado un tono");
        }
      }

      vm.saveFraming =function (){
        if(vm.framingSelected != []){
          if(!vm.framingSelected[0].subject_id){
            var elemName = vm.framingSelected[0].name;
            var objectToCreate = { 
              "name":elemName
            }
            //HTTP FUNCTION crear tono 
            $http.post(vm.server+'/subjects/createSubject', objectToCreate)
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/subjects/getSubjects')
                .then(function(response, headers){
                  vm.framingArray = response.data.data;
                  alert("Tono creado");
                  vm.framingSelected = [];
                })
              }else{
                alert("Ocurrió un error al crear el tono, inténtelo de nuevo");
              }
            })
          }else{
            var elemName = vm.framingSelected[0].name;
            var elemId = vm.framingSelected[0].subject_id;
            var objectToCreate = { 
              "name":elemName,
              "subjectId":elemId
            }
            $http.put(vm.server+'/subjects/updateSubject', objectToCreate)
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/subjects/getSubjects')
                .then(function(response, headers){
                  vm.framingArray = response.data.data;
                  alert("Tono actualizado");
                  vm.framingSelected = [];
                })
              }else{
                alert("Ocurrió un error al actualizar el tono, inténtelo de nuevo");
              }
            }) 
          }
        }else{
          alert("No se ha seleccionado un tono");
        }
      }

      vm.cancelFraming = function(){
        vm.framingSelected = [];
      }

      vm.deleteCandidate =function (){
        if(vm.candidateSelected != []){
          if(!vm.candidateSelected[0].candidate_id){
            alert("No se puede eliminar un candidato sin guardar");
          }else{
            var elemId = vm.candidateSelected[0].candidate_id;
            var objectToDelete = { 
              "candidateId":elemId
            }
            $http.post(vm.server+'/candidates/deleteCandidate', objectToDelete )
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/candidates/getCandidates')
                .then(function(response, headers){
                  vm.candidateArray = response.data.data;
                  alert("Candidato eliminado");
                })
              }else{
                alert("Ocurrió un error al eliminar el candidato, inténtelo de nuevo");
              }
            }) 
          }
        }else{
          alert("No se ha seleccionado un candidato");
        }
      }

      vm.saveCandidate =function (){
        if(vm.candidateSelected != []){
          if(!vm.candidateSelected[0].candidate_id){
            var elemName = vm.candidateSelected[0].name;
            var objectToCreate = { 
              "name":elemName
            }
            //HTTP FUNCTION crear tono 
            $http.post(vm.server+'/candidates/createCandidate', objectToCreate)
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/candidates/getCandidates')
                .then(function(response, headers){
                  vm.candidateArray = response.data.data;
                  alert("Candidato creado");
                  vm.candidateSelected = [];
                })
              }else{
                alert("Ocurrió un error al crear el candidato, inténtelo de nuevo");
              }
            })
          }else{
            var elemName = vm.candidateSelected[0].name;
            var elemId = vm.candidateSelected[0].candidate_id;
            var objectToCreate = { 
              "name":elemName,
              "candidateId":elemId
            }
            $http.put(vm.server+'/candidates/updateCandidate', objectToCreate)
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/candidates/getCandidates')
                .then(function(response, headers){
                  vm.candidateArray = response.data.data;
                  alert("Candidato actualizado");
                  vm.candidateSelected = [];
                })
              }else{
                alert("Ocurrió un error al actualizar el candidato, inténtelo de nuevo");
              }
            }) 
          }
        }else{
          alert("No se ha seleccionado un candidate");
        }
      }

      vm.cancelCandidate = function(){
        vm.candidateSelected = [];
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
  