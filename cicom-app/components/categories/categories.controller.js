(function (){
    'use strict';
  
    angular
    .module('cmsApp')
    .controller('CategoriesController', CategoriesController)
    .controller('SideNavController', SideNavController);
    
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
        cookies.remove('currentUserActive');
        console.log($cookies.get('currentUserActive'));
        //vm.loginCorrect = false;
        
        $location.path('/login');
      }
    }
  
    function CategoriesController($http, $cookies, $location) {
      var vm = this;
      //LOCAL
      vm.server = 'http://localhost:8081';
      //PROD
      // vm.server = 'http://cluster.cenat.ac.cr:8081';
      vm.headers = {
                      'Content-Type':'application/json',
                      'Accept':'application/json'
                    }
      vm.candidateArray;
      vm.framingArray;
      vm.framingSelected=[];
      vm.candidateSelected=[];
      vm.currentUserActive;
      function init(){
        vm.currentUserActive = $cookies.getObject('currentUserActive');
        if(vm.currentUserActive == null){
          $location.path('/login');
        }
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
    }
  })();
  