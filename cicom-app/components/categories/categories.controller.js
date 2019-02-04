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
      //vm.server = 'http://localhost:8081';
      //PROD
      vm.server = 'http://cluster.cenat.ac.cr:8081';
      vm.headers = {
                      'Content-Type':'application/json',
                      'Accept':'application/json'
                    }
      vm.candidateArray;
      vm.categoryArray;
      vm.categorySelected=[];
      vm.subcategorySelected=[];
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
          $http.get(vm.server+'/category/getCategory')
          .then(function(response, headers){
            vm.categoryArray = response.data.data;
          })
      }init();

      
      vm.deleteCategory =function (){
        if(vm.categorySelected != []){
          if(!vm.categorySelected[0].category_id){
            alert("No se puede eliminar una categoría sin guardar");
          }else{
            $http.post(vm.server+'/category/deleteCategory', vm.categorySelected[0] )
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/category/getCategory')
                .then(function(response, headers){
                  vm.categoryArray = response.data.data;
                  alert("Tono eliminado");
                })
              }else{
                alert("Ocurrió un error al eliminar la categoría, inténtelo de nuevo");
              }
            }) 
          }
        }else{
          alert("No se ha seleccionado una categoría");
        }
      }

      vm.deleteSubCategory =function (){
        if(vm.subcategorySelected != []){
          if(!vm.subcategorySelected[0].category_id || !vm.subcategorySelected[0].sub_category_id){
            alert("No se puede eliminar una subcategoría sin guardar");
          }else{
            $http.post(vm.server+'/category/deleteSubCategory', vm.subcategorySelected[0] )
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/category/getCategory')
                .then(function(response, headers){
                  vm.categoryArray = response.data.data;
                  alert("Subcategoría eliminada");
                })
              }else{
                alert("Ocurrió un error al eliminar la subcategoría, inténtelo de nuevo");
              }
            }) 
          }
        }else{
          alert("No se ha seleccionado una subcategoría");
        }
      }

      vm.saveCategory = function (){
        if(vm.categorySelected.length >0){
          if(!vm.categorySelected[0].category_id){
            //HTTP FUNCTION crear tono 
            $http.post(vm.server+'/category/createCategory', vm.categorySelected[0])
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/category/getCategory')
                .then(function(response, headers){
                  vm.categoryArray = response.data.data;
                  alert("Tono creado");
                })
              }else{
                alert("Ocurrió un error al crear la categoría, inténtelo de nuevo");
              }
            })
          }else{
            $http.put(vm.server+'/category/updateCategory', vm.categorySelected[0])
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/category/getCategory')
                .then(function(response, headers){
                  vm.categoryArray = response.data.data;
                  alert("Tono actualizado");
                })
              }else{
                alert("Ocurrió un error al actualizar la categoría, inténtelo de nuevo");
              }
            }) 
          }
        }else{
          alert("No se ha seleccionado la categoría");
        }
      }

      vm.saveSubCategory = function (){
        if(vm.subcategorySelected.length >0){
          if(!vm.subcategorySelected[0].sub_category_id){
            vm.subcategorySelected[0].category_id = vm.categorySelected[0].category_id;
            $http.post(vm.server+'/category/createSubcategory', vm.subcategorySelected[0])
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/category/getCategory')
                .then(function(response, headers){
                  vm.categoryArray = response.data.data;
                  alert("Subcategoría creada");
                })
              }else{
                alert("Ocurrió un error al crear la categoría, inténtelo de nuevo");
              }
            })
          }else{
            $http.put(vm.server+'/category/updateSubcategory', vm.subcategorySelected[0])
            .then(function(response, headers){
              if(response.data.state.code<2000){
                $http.get(vm.server+'/category/getCategory')
                .then(function(response, headers){
                  vm.categoryArray = response.data.data;
                  alert("Subcategoría actualizada");
                })
              }else{
                alert("Ocurrió un error al actualizar la categoría, inténtelo de nuevo");
              }
            }) 
          }
        }else{
          alert("No se ha seleccionado la categoría");
        }
      }

      vm.cancelCategory = function(){
        vm.categorySelected = [];
      }

      vm.cancelSubCategory = function(){
        vm.subcategorySelected = [];
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
  