app.factory('swordservice', ["$http", "$q", "$location", "$route", function ($http, $q, $location, $route) {
  var swordservice = {}
  var baseUrl = "https://secure-headland-5231.herokuapp.com"
  var url = baseUrl + '/api/swords'

  swordservice.getSwords = function() {
    var deferred = $q.defer();
    $http.get(url).success(function (data) {
      deferred.resolve(data);
    }).error(function () {
      deferred.reject("Error!");
    });
    return deferred.promise;
  }
  swordservice.getSword = function(item){
    var deferred = $q.defer();
    $http.get(url + '/' + item.id).success(function (data) {
      deferred.resolve(data);
    }).error(function () {
      deferred.reject("Error!");
    });
    return deferred.promise;
  }
  swordservice.newSword = function(sword) {
    $http.post(url, sword).then(function(response){
      console.log(response);
      $route.reload();
    });
  }
  // swordservice.update = function(sword) {
  //   console.log(sword);
  //   $http.put(url + '/' + sword._id, sword).then(function(response) {
  //     console.log(response);
  //     $route.reload();
  //   });
  // }
  swordservice.remove = function(sword) {
    console.log(sword);
    $http.delete(url + '/' + sword._id, sword).then(function(response) {
      console.log(response);
      $route.reload();
    });
  }
  swordservice.update = function(sword) {
    console.log(sword);
    sword.edit = undefined
    $http.put(url + '/' + sword._id, sword).then(function(response) {
      console.log(response);
      $route.reload();
    });
  }

  return swordservice
}])
