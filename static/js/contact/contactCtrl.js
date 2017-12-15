(function() {//created self executing function or IIFE

    "use strict"//put into strict mode allows javascript to catch bugs

    var app = angular.module("ContactManagement")//assigned the root module to app variable

    app.controller("contactListCtrl", ["ContactResource","$scope","$state",contactListCtrl])
    app.controller("contactEditCtrl", ["ContactResource","$scope","contact", "$state",contactEditCtrl])
    app.controller("contactViewCtrl", ["ContactResource","$scope","contact", "$state",contactViewCtrl])
    app.controller("contactAddCtrl", ["ContactResource","$scope","$state",contactAddCtrl])

    function contactListCtrl (ContactResource, $scope, $state) {
        var vm = this;  //assigned this to a variable

        var ActionLinkTemplate = "<md-button class='md-raised md-primary' ng-click='grid.appScope.edit(row.entity.id)'>Edit Contact</md-button>"+
                                "<md-button class='md-raised md-primary' ng-click='grid.appScope.view(row.entity.id)'>View Contact</md-button>"+
                                "<md-button class='md-raised md-primary' ng-click='grid.appScope.delete(row.entity.id)'>Delete Contact</md-button>";


        $scope.load = function () {
            ContactResource.query(function (data) {
                $scope.gridOptions.data = data;
                $scope.arrayNames = data;
            });
        }

        $scope.load();

        $scope.myDefs = [
                    { field: 'name', displayName: 'Name', width: "*", resizable: false},
                    { field: 'phone', displayName: 'Phone Number', width: "20%" },
                    { field: 'email', displayName: 'Email', width: "*" },
                    { field: 'address', displayName: 'Address', width: "*" },
                    { field: 'action', displayName:'Action', width: 400, cellTemplate:ActionLinkTemplate, cellClass:'text-center', enableColumnMenu: false}
                    ];
        $scope.gridOptions = {
            columnDefs: $scope.myDefs
        };

        $scope.edit = function(id){
            console.log('Contact ID: '+id);
            $state.go('contactEdit', {contactId:id})
        }

        $scope.view = function(id){
            console.log('Contact ID: '+id);
            $state.go('contactView', {contactId:id})
        }

        $scope.delete = function (id) {
            $scope.deleteContact = ContactResource.remove({ id: id }).$promise.then(function () {
                console.log("perfect")
                $scope.load();
            });
        }

        $scope.add = function () {
            $state.go('contactCreate')
        }
    }

    function contactEditCtrl(ContactResource,$scope,contact,$state){
        $scope.model = new ContactResource(contact);
        $scope.error = null;
        $scope.save = function(){
            $scope.model.$update(function(res){
                    $state.go('contactList')
                },
                function(res){
                    $scope.error = res.data;
                })

        }

        $scope.cancel = function () {
            $state.go('contactList')
          };
    };

    function contactAddCtrl(ContactResource,$scope,$state){
        $scope.model = new ContactResource();
        $scope.error = null;
        $scope.save = function(){
            $scope.model.$create(function(res){
                    $state.go('contactList')
                },
                function(res){
                    $scope.error = res.data;
                })
        }

        $scope.cancel = function () {
            $state.go('contactList')
          };
    };

    function contactViewCtrl(ContactResource,$scope,contact,$state){
        $scope.model = new ContactResource(contact);
        $scope.error = null;

        $scope.goback = function () {
            $state.go('contactList')
          };
    };

}());//created self executing function or IIFE