
var app = angular.module('appEditor', []);
var $j = $.noConflict();

var obs = {
	job: [{
			job: 'Webdeveloper',
			company: 'Mediabureau',			
			place: 'Almere',			
			body: 'LLorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis officia fugit, assumenda ad soluta atque eum facilis incidunt esse. Mollitia ea,',
			dates: ['25 januari 2016', '02 februari 2016', "Mo Jan 25 2016" , 'Tue Feb 2 2016']
		},	{
			job: 'Chauffeur',
			company: 'TNT',
			place: 'Amsterdam',			
			body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
			dates: ['26 januari 2016', '03 februari 2016', 'Tue Jan 26 2016' , 'Wed Feb 3 2016']
		}
	],

	education: [{
			education:"Webdeveloper",
			schoolName:"ROC",
			place:"Almere",
			state:"finished",
			dates:["27 januari 2016","04 februari 2016","Wed Jan 27 2016","Thu Feb 4 2016"],			
		},{
			education:"Comp Science",
			schoolName:"HVA",
			place:"Almere",
			state:"finished",
			dates:["25 januari 2016","02 februari 2016","Mo Jan 25 2016","Tue Feb 2 2016"],			
		}
	]
}

//converts input date to a readable date string
function dateConverter(date){
	fixedDate = date.setHours(date.getHours() + 1);
	convertedDate = date.toISOString();
	var writtenMonths = ["Januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "october", "november", "december"];
	var month = writtenMonths[convertedDate.substring(5, 7) - 1];
	return convertedDate.substring(8, 10) + " " + month + " " + convertedDate.substring(0, 4);
}

//returns children of a div as an array
function returnChildren(object){
	var childArr = [];
	$j("#" + Object.keys(object[0])[0] + "-form").children().each(function(){
		if($j(this).attr("id") != undefined && $j(this).attr("id").substring(0, 4) != "date"){
			childArr.push($j(this).attr("id"))
		}	
	})
	return childArr;
}


app.controller('MyController', ['$scope', function($scope) {

	$scope.jobs = obs.job;
	$scope.educations = obs.education;
	$scope.editing = false;
	$scope.editIndex = "";

	//adds the content of edit-experience form to object or if editing is true replaces part of object
	$scope.addJob = function(object){
		var fromDate = $j( "#dateFrom-" + Object.keys(object[0])[0]).datepicker( "getDate" );
		var tillDate = $j( "#dateTill-" + Object.keys(object[0])[0]).datepicker( "getDate" );
		var childArr = returnChildren(object);
		console.log(childArr);

		if ($scope.editing == false){
			object.push({});
			var lastObject = object.length - 1;
			console.log(lastObject)
			childArr.forEach(function(value, index){
				object[lastObject][Object.keys(object[0])[index]] = $j("#" + value).val(); 
			});	
			//This is going to cause problems for sections that don't have a date.			
			object[lastObject].dates = [dateConverter(fromDate), dateConverter(tillDate), fromDate.toDateString(-1), tillDate.toDateString()]
		} else {
			childArr.forEach(function(value, index){
				object[$scope.editIndex][Object.keys(object[0])[index]] = $j("#" + value).val(); 
			});				
			//This is going to cause problems for sections that don't have a date.			
			object[$scope.editIndex].dates = [dateConverter(fromDate), dateConverter(tillDate), fromDate.toDateString(-1), tillDate.toDateString()]
		}
		$scope.editing = false;
		$scope.editIndex = "";
		$scope.clearInput();
		console.log(JSON.stringify(object));
	}	

	//button for removing of the given section
   $scope.removeJob = function(index, object){
   	console.log(index)
		object.splice(index, 1)
		$scope.editing = false;
		$scope.editIndex = "";
		$scope.clearInput();
		console.log(object)
   }

   


	//button for editing a section
	$scope.editButton = function(index, object){
		//first key in given object
		var objectKey = Object.keys(object[index])[0];

		//creates dates in the format datepicker needs
		var fromDateObject = new Date(object[index].dates[2]);
		var tillDateObject = new Date(object[index].dates[3]);

		var childArr = returnChildren(object);

		 //changes value of every input to the values of the edited object
		childArr.forEach(function(value, arrayIndex){
		 	var objectKey = Object.keys(object[index])[arrayIndex]
			$j("#" + value).val(object[index][objectKey]);		 
		})		 
		 
		$scope.editIndex = index;
		$scope.editing = true;
		$j("#dateFrom-" + objectKey).datepicker( "setDate", fromDateObject);
		$j("#dateTill-" + objectKey).datepicker( "setDate", tillDateObject);
	}

	//clears input field
	$scope.clearInput = function(){
		$j(".inputForm").children().each(function(){
			$j(this).val("");
		})
		$j(".datePicker").datepicker( "setDate", null);
	}

	//switched to different sections
	$scope.switchButton = function(object){
		console.log(Object.keys($scope.jobs[0])[0])
		$j(".inputForm").hide();
		$j("#" + Object.keys(object[0])[0] + "-form" ).show();
		$scope.clearInput()
	}
}]);

//sets datepicker widgets format
$j(function(){
	$j( '.datePicker' ).datepicker({ dateFormat: 'dd-mm-yy'}); 
});


[{
	"education":"Webdeveloper",
	"schoolName":"ROC",
	"place":"Almere",
	"state":"finished",
	"dates":["27 januari 2016","04 februari 2016","Wed Jan 27 2016","Thu Feb 4 2016"],
	"$$hashKey":"object:7"
},
{
	"education":"Comp Science",
	"schoolName":"HVA",
	"place":"Almere",
	"state":"finished",
	"dates":["25 januari 2016","02 februari 2016","Mo Jan 25 2016","Tue Feb 2 2016"],
	"$$hashKey":"object:8"
},
{
	"education":""
	,"schoolName":"",
	"place":"",
	"state":"",
	"$$hashKey":"object:24"
},
{
	"education":"1",
	"schoolName":"1",
	"place":"1",
	"state":"1",
	"dates":["25 december 2016","28 december 2016","Sun Dec 25 2016","Wed Dec 28 2016"]
	,"$$hashKey":"object:26"
},
{
	"education":"1",
	"schoolName":"1",
	"place":"1",
	"state":"1",
	"dates":["18 december 2016","29 december 2016","Sun Dec 18 2016","Thu Dec 29 2016"],
	"$$hashKey":"object:28"
},
{
	"education":"2",
	"schoolName":"2",
	"place":"2",
	"state":"2",
	"dates":["19 december 2016","26 december 2016","Mon Dec 19 2016","Mon Dec 26 2016"]
}]