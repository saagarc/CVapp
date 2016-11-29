var app = angular.module('appEditor', []);

var obs = [{
	title: 'Webdeveloper',
	company: 'Mediabureau',
	place: 'Almere',
	dates: '25 januari tot 2 februari',
	body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis officia fugit, assumenda ad soluta atque eum facilis incidunt esse. Mollitia ea,'
},	{
	title: 'Chauffeur',
	company: 'TNT',
	place: 'Amsterdam',
	dates: '25 januari tot 2 februari',
	body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'

}
]

app.controller('MyController', ['$scope', function($scope) {
   $scope.jobs = obs;

   $scope.addJob = function(){
   	console.log("str");
   	$scope.jobs.push({'title':$scope.live.title, 'company':'$scope.live.company'});
   }






}]);





