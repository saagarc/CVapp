
var app = angular.module('appEditor', []);
var $j = $.noConflict();

var obs = [{
	title: 'Webdeveloper',
	company: 'Mediabureau',
	place: 'Almere',
	dates: ['25 januari', '2 februari'],
	body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis officia fugit, assumenda ad soluta atque eum facilis incidunt esse. Mollitia ea,'
},	{
	title: 'Chauffeur',
	company: 'TNT',
	place: 'Amsterdam',
	dates: ['25 januari', '2 februari'],
	body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'

}
]
//converts input date to a readable date string
function dateConverter(date){
	fixedDate = date.setDate(date.getDate() + 1);
	convertedDate = date.toISOString();
	var writtenMonths = ["Januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "october", "november", "december"];
	var month = writtenMonths[convertedDate.substring(5, 7) - 1];
	return convertedDate.substring(8, 10) + " " + month + " " + convertedDate.substring(0, 4);
}

app.controller('MyController', ['$scope', function($scope) {
   $scope.jobs = obs;

	$scope.addJob = function(){
		var fromDate = $j( "#dateFrom").datepicker( "getDate" );
		var tillDate = $j( "#dateTill").datepicker( "getDate" );
		$scope.jobs.push({
			'title':$scope.job.title, 
			'company':$scope.job.company, 
			'place':$scope.job.place, 
			'dates':[dateConverter(fromDate), dateConverter(tillDate)], 
			'body':$scope.job.body
		})
	}

	$scope.removeJob = function(index){
		   $scope.jobs.splice(index, index + 1)
		   console.log($scope.jobs[0]);
	}

	$scope.editJob = function(job){
		
	}


}]);

$j(function(){
	$j( '#dateTill' ).datepicker({ dateFormat: 'dd-mm-yy'}); 
	$j( '#dateFrom' ).datepicker({ dateFormat: 'dd-mm-yy'}); 
	console.log("datepicker test")
});


if (window.jQuery) {  
    console.log("loaded") 
} else {
    console.log("notloaded")
}
