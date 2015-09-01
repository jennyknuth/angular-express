app.controller('SwordController', ['$scope', 'swordservice', function ($scope, swordservice) {

  swordservice.getSwords().then(function(data){
    $scope.swords = data
  })
  $scope.toggleForm = function () {
    $scope.form === true ? $scope.form = false : $scope.form = true
  }
  $scope.addSword = function (sword) {
    console.log(sword);
    swordservice.newSword(sword)
  }
  $scope.removeSword = function (sword) {
    swordservice.remove(sword)
  }
  $scope.editSword = function (sword) {
    console.log('hello');
    sword.edit === true ? sword.edit = false : sword.edit = true
  }
  $scope.updateSword = function (sword) {
    swordservice.update(sword)
  }
}])

app.controller('ItemController', ['$scope', 'swordservice', '$routeParams', '$location', function ($scope, swordservice, $routeParams, $location) {

  console.log($routeParams);
  item = $routeParams;// an object
  swordservice.getSword(item).then(function(data){
    $scope.sword = data
  })
  $scope.editSword = function (sword) {
    console.log('hello');
    sword.edit === true ? sword.edit = false : sword.edit = true
  }
  $scope.removeSword = function (sword) {
    swordservice.remove(sword)
    $location.path('/')
  }
}])
