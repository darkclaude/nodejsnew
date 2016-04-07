function AppCtrl($scope, $http, $interval,$timeout, $window) {
                $timeout( function(){ $scope.getid(); }, 100)
                var theuser="d";
                $scope.getid= function(){
                   $http.get('/anggetuser').success(function(response){
                    theuser = response;
                   });
                };
    var r = 0;
    var count = 0;
    var x = 1000;
    var p = 0;
    var y = 1000;
     var g = new JustGage({
    id: "gauge",
    value: 0,
    min: 0,
    max: 100,
    title: "Temperature °C",
   // gaugeColor: "blue" ,
   levelColors : ["#66c2ff","#feff1a", "#ff0000"],
    donut : true
  });
      var f = new JustGage({
    id: "gauge1",
    value: 0,
    min: 0,
    max: 100,
    title: "Humidity %",
       levelColors : ["#feff1a","#66c2ff", "#ff0000"],
    donut : true
  });
     var h = new JustGage({
    id: "gauge2",
    value: 0.00,
    min: 0.00,
    max: 1000.00,
    decimals: true,
  levelColors:   [ "#ff0000","#feff1a","#66c2ff"],
    title: "Solar Volts(V)",
    donut : true
  });
    console.log("LOL ko");
    var data = "";
    var key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWQ4ZjJlZjI4Nzk3MjIwMjMxZDA5Y2MiLCJsb2NhbCI6eyJwYXNzd29yZCI6IiQyYSQwOSRZdkxaOXAxSllHbGtJekcxdm5oVkJ1ZTFLcHJJbkNCcXplQ2JLVVBCeWo0ZU1VMldzbmUwNiIsInVzZXJuYW1lIjoia28ifX0.cxeqi6GsgoOJLw89zjRPmobBd1-DS0OqpA6Rm1SIC3M";
    var refresh = function() {
        $scope.c = "Data From Sensor Node: ";
        $http.post('/api/angData/'+theuser+'?token=' + key).success(function(response) {
            console.log("GOT IT BIT");
            console.log(response);
            if (response.temp == "nan" && response.humidity == "nan" && response.pot == "nan") {
                response.temp = "Not Available";
                response.hum = "Not Available";
                response.pot = "Not Available";
                g.refresh(0);
                f.refresh(0);
                h.refresh(0);
                $scope.datalist = response
            } else {
                $scope.datalist = response;
                g.refresh(parseInt($scope.datalist.temp));
                f.refresh(parseInt($scope.datalist.hum));
                h.refresh(parseFloat($scope.datalist.pot)*100.00);
                $scope.datalist.temp = $scope.datalist.temp + "°C";
                $scope.datalist.hum = $scope.datalist.hum + " %";
                $scope.datalist.pot = $scope.datalist.pot + " Vs"
            }
            $scope.types = ""
        })
    };

    var gets = function() {
        $http.post('/api/st?token=' + key).success(function(response) {
            count = 0;
            $scope.cl = "green";
            $scope.t = "Connected!";
            r = r + 1
        });
        if (p == r) {
            count = count + 1;
            var to = count;
            if (to % 2 == 0) {
                var f = 10 - (count / 2);
                var ch = ".";
                var str;
                $scope.cl = "red";
                if(count<=20){
                $scope.t = "Error Connecting in " + f;
            }
            }
            if (count == 20) {
                $window.location = "/dash"
            }
        }
        if (p != r) {
            p = r
        }
    };
    $interval(function() {
        gets();
        refresh();
    }, x)

    $scope.callAtTimeout = function() {
        //console.log("$scope.callAtTimeout - Timeout occurred");
        $scope.mat = "Ready.....";
        $scope.tms = ""
    }



    $scope.ss = function(){
        $http.post('/api/cmdData/'+$scope.tms+'?token='+ key).success(function(response){
           $scope.mat = response;
            $timeout( function(){ $scope.callAtTimeout(); }, 1000)
         //  y=1;
        });
    }
}