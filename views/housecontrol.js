var app = angular.module('house', []);
app.controller("housecontrol", function ($scope, $http, $interval){
$scope.on = function(){
$http.post('/control/on').success(function(res){
	console.log("ON CMD DONE");
	$scope.info = "Clicked ON";

   $scope.cl = 'green';

});
}
$scope.off = function(){
$http.post('/control/off').success(function(res){
	console.log("OFF CMD DONE");
	$scope.info = "Clicked OFF";
$scope.cl = "red";
});

}
var getdata = function(){
	$http.post('/value').success(function(response){
$scope.pot = response;
	});
}
$interval(getdata,300);

});