// Whole-script strict mode syntax
(function () {
    "use strict";
    // For getting the username
    var name = prompt("Please enter your name");


    var app  = angular.module('chatApp', ['ui.bootstrap', 'ngRoute']);

    // Set a socket listening on port 3000
    app.factory('socket', function () {
        var socket = io.connect('http://localhost:3000');
        return socket;
    });


    app.controller('ChatCtrl', function ($scope, socket) {
        $scope.username    = [];
        $scope.username    = name;
        console.log('username:' + $scope.username);
        $scope.CurrentDate = new Date();
        $scope.msgs        = [];

        // Send message to server
        $scope.sendMsg     = function () {
            socket.emit('send msg', { message: $scope.msg.text, username: $scope.username });
            console.log(' angular send message' + $scope.msg.text);
            $scope.msg.text = '';
        };
        // On message from server
        socket.on('get msg', function (data) {
            console.log('client recived message:' + data.message + '\n username' + data.username);
            $scope.msgs.push(data);
            $scope.$digest();
        });
    });
})();
