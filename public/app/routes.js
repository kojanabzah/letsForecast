(function(){
    var app = angular.module("letsForecast");

    app.config(function($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl:"partials/index.jade",
                controller:"HomeController"
            })
            .otherwise({redirectTo:"/home"});
    });
}());