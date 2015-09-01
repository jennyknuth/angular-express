app.config(function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/list.html',
    controller: 'SwordController'
  })
  .when('/:id', {
    templateUrl: 'views/show.html',
    controller: 'ItemController'
  })
  .otherwise('/', {
    templateUrl: 'views/list.html',
    controller: 'SwordController'
  })
})
