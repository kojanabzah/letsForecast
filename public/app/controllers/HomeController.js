(function(){
    var app = angular.module("letsForecast");

    var homeController = function($scope,forecastFactory) {
        var forecastData = JSON.parse(forecastFactory.getForecast());

        var dateArray = [];

        (forecastData.daily.data).map( function(item) {
            var obj = { X: (new Date((item.time)*1000)).getDay(), Y: item.temperatureMin }
            switch(obj.X){
                case 0:
                    obj.X = "Sun";
                    break;
                case 1:
                    obj.X = "Mon";
                    break;
                case 2:
                    obj.X = "Tue";
                    break;
                case 3:
                    obj.X = "Wed";
                    break;
                case 4:
                    obj.X = "Thu";
                    break;
                case 5:
                    obj.X = "Fri";
                    break;
                case 6:
                    obj.X = "Sat";
                    break;
            }

            dateArray.push(obj);
        })



        $scope.corrent = forecastData.currently.summary;

        $scope.$on('$viewContentLoaded', function ()
        {
            graph = $('#graph');
            var c = graph[0].getContext('2d');
            initGraph(c,dateArray);
        });

    };


    app.controller("HomeController", ["$scope","forecastFactory", homeController]);


}());

