//FUNCTION WRAPPER
(function() {

//MAIN DEPENDENCIES
var app = angular.module('NoteTakr', ['ionic', 'NoteTakr.notestore']);

//CONFIG for States
app.config(function($stateProvider, $urlRouterProvider) {

  //List State
  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  });

  //Edit State
  $stateProvider.state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
  });

  //Add State
  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  });

  //Default State - List
  $urlRouterProvider.otherwise('/list');

});

/*
MAIN CONTROLLERS
*/

//List Controller
app.controller('ListCtrl', function($scope, NoteStore) {

  $scope.reordering = false;
  $scope.notes = NoteStore.list();

  $scope.remove = function(noteId) {
    NoteStore.remove(noteId);
  };

  $scope.move = function(note, fromIndex, toIndex) {
    NoteStore.move(note, fromIndex, toIndex);
  };

  $scope.toggleReordering = function () {
    $scope.reordering = !$scope.reordering;
  };

});

//Edit Controller
app.controller('EditCtrl', function($scope, $state, NoteStore) {

  $scope.note = angular.copy(NoteStore.get($state.params.noteId));

  $scope.save = function() {
    NoteStore.update($scope.note);
  $state.go('list');
  };

});

//Add Controller
app.controller('AddCtrl', function($scope, $state, NoteStore) {

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: '',
    datemonth: '',
    dateday: '',
    dateyear: '2015',
    priority: 1
  };

  $scope.save = function() {
    NoteStore.create($scope.note);
  $state.go('list');
  };

});

//App Start
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
//this is a test to commith changes
}());
