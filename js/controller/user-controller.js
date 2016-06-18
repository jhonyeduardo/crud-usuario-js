/*global angular, userController*/
(function () {
    'use strict';
    
    angular.
        module('userModule').
        controller('UserController', UserController);
    
    UserController.$injector = ['$uibModal', 'userService'];
    
    function UserController($uibModal, userService) {
        var self = this,
            model = userService;
        
        self.showFormUser = showFormUser;
        self.remove = remove;
        self.edit = edit;
        self.users = [{name: "Jhony Eduardo", lastName: "Senem", email: "jhony@totvs.com"}, 
                      {name: "Henrique Senem", lastName: "Senem", email: "henrique@totvs.com"}, 
                      {name: "Mikaela Iwa", lastName: "Senem", email: "mika@totvs.com"}];
        
        function remove(id) {
            model.remove(id);
            self.users = model.list;
        }
        
        function add(user) {
            var id = user.id;
            
            if (!id) {
                model.add(user);
            } else {
                model.edit(id, user);
            }

            self.users = model.list;
        }
        
        function edit(id) {
            var user;

            user = model.getUser(id)[0];
            showFormUser(user);
            self.users = model.list;
        }
        
        function showFormUser(user) {
            var modalInstance, options;
            
            options = {
                keyboard: true,
                size: 'lg',
                backdrop: 'static',
                templateUrl : 'html/add-user.html',
                controller : ModalUserCtrl,
                controllerAs: 'controller',
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            };

            modalInstance = $uibModal.open(options);

            modalInstance.result.then(function (user) {
                add(user);
            });
        }
    }
    
    /* Controller da modal de cadastro de usuário */
    angular.
        module('userModule').
        controller('ModalUserCtrl', ModalUserCtrl);
    
    ModalUserCtrl.$injector = ['$uibModalInstance', '$uibModal'];
    
    function ModalUserCtrl($uibModalInstance, $uibModal, user) {
        var self = this;
        self.user = {};
        
        if (user) {
            self.user = angular.copy(user);
        }
        
        self.save = function () {
            $uibModalInstance.close(self.user);
        };
        
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    
}());