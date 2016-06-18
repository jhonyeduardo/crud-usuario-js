/*global angular, userService*/
(function () {
    "use strict";
    
    angular.
        module('userModule').
        service('userService', userService);
    
    function userService() {
        var self = this;

        self.list = [];
        
        self.add = function (user) {
            user.id = new Date().getTime();
            self.list.push(user);
        };
        
        self.edit = function (id, user) {
            if (id && user) {
                self.list.forEach(function (val) {
                    if (val.id === id) {
                        self.list.splice(self.list.indexOf(val), 1, user);
                    }
                });
            }
        };
        
        self.getUser = function (id) {
            return self.list.filter(function (user) {
                return user.id === id;
            });
        };
        
        self.remove = function remove(id) {
            self.list.forEach(function (user) {
                if (user.id === id) {
                    self.list.splice(self.list.indexOf(user), 1);
                }
            });
        };
    }
}());