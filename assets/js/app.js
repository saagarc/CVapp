
var app = angular.module('appEditor', []);
var $j = $.noConflict();

var obs = [{
	title: 'Webdeveloper',
	company: 'Mediabureau',
	place: 'Almere',
	dates: ['25 januari 2016', '02 februari 2016', "Mo Jan 25 2016" , 'Tue Feb 2 2016'],
	body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis officia fugit, assumenda ad soluta atque eum facilis incidunt esse. Mollitia ea,'
},	{
	title: 'Chauffeur',
	company: 'TNT',
	place: 'Amsterdam',
	dates: ['25 januari 2016', '02 februari 2016', 'Mo Jan 25 2016' , 'Tue Feb 2 2016'],
	body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'

}
]
//converts input date to a readable date string
function dateConverter(date){
	fixedDate = date.setHours(date.getHours() + 1);
	convertedDate = date.toISOString();
	var writtenMonths = ["Januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "october", "november", "december"];
	var month = writtenMonths[convertedDate.substring(5, 7) - 1];
	return convertedDate.substring(8, 10) + " " + month + " " + convertedDate.substring(0, 4);
}

app.controller('MyController', ['$scope', function($scope) {
	$scope.jobs = obs;
	$scope.editing = false;
	$scope.editIndex = "";
	$scope.dateTest = "";

	//adds the content of edit-experience form to object or if editing is true replaces part of object
	$scope.addJob = function(){
		var fromDate = $j( "#dateFrom").datepicker( "getDate" );
		var tillDate = $j( "#dateTill").datepicker( "getDate" );

		if ($scope.editing == false){
			$scope.jobs.push({
				'title':$scope.jobTitle, 
				'company':$scope.jobCompany, 
				'place':$scope.jobPlace, 
				'dates':[dateConverter(fromDate), dateConverter(tillDate), fromDate.toDateString(), tillDate.toDateString()], 
				'body':$scope.jobBody
			})
		} else {
			$scope.jobs[$scope.editIndex] = {
				'title':$scope.jobTitle, 
				'company':$scope.jobCompany, 
				'place':$scope.jobPlace, 
				'dates':[dateConverter(fromDate), dateConverter(tillDate), fromDate.toDateString(-1), tillDate.toDateString()], 
				'body':$scope.jobBody
			}
		}
		$scope.editing = true;
		$scope.editIndex = "";
		console.log($scope.jobs[0].dates)

		$scope.clearInput();
	}	

	//button for removing of the given section
   $scope.removeJob = function(index){
	   $scope.jobs.splice(index, index + 1)
	   console.log($scope.jobs[0]);
   }

	//button for editing a section
	$scope.editButton = function(index){
		 var fromDateObject = new Date($scope.jobs[index].dates[2]);
		 var tillDateObject = new Date($scope.jobs[index].dates[3]);
		$scope.editIndex = index;
		$scope.editing = true;
		$scope.jobTitle = $scope.jobs[index].title;
		$scope.jobCompany = $scope.jobs[index].company;
		$scope.jobPlace = $scope.jobs[index].place;		
		$j("#dateFrom").datepicker( "setDate", fromDateObject);
		$j("#dateTill").datepicker( "setDate", tillDateObject);
		$scope.jobBody = $scope.jobs[index].body;
	}

	//clears input field
	$scope.clearInput = function(){
		$scope.jobTitle = "";
		$scope.jobCompany = "";
		$scope.jobPlace = "";
		$scope.jobBody = "";
		$j("#dateFrom").datepicker( "setDate", null);
		$j("#dateTill").datepicker( "setDate", null);
	}

}]);

//sets datepicker widgets format
$j(function(){
	$j( '#dateTill' ).datepicker({ dateFormat: 'dd-mm-yy'}); 
	$j( '#dateFrom' ).datepicker({ dateFormat: 'dd-mm-yy'}); 
	console.log("datepicker test")
});


