/**
 * Created by nmukammel on 12/15/17.
 */
(function(){
    "use strict"
    angular.module("ContactManagement")
        .config(["$stateProvider",
                "$urlRouterProvider",
                function ($stateProvider, $urlRouterProvider) {
                    $urlRouterProvider.otherwise("/contactList");
                    $stateProvider
                        .state("contactList", {
                            url: "/contactList",
                            templateUrl: "static/views/contactList.html",
                            controller: "contactListCtrl",
                            data: { title: "Contact List" }
                        })
                        .state("contactEdit", {
                            url: "/contact/edit/:contactId",
                            templateUrl: "static/views/contactEdit.html",
                            controller: "contactEditCtrl",
                            resolve: {
                                contactResource: "ContactResource",

                                contact: function(contactResource, $stateParams) {
                                    var contactId = $stateParams.contactId;
                                    return contactResource.getSingle({ id: contactId }).$promise;
                                }
                            }
                        })
                        .state("contactView", {
                            url: "/contact/view/:contactId",
                            templateUrl: "static/views/contactView.html",
                            controller: "contactViewCtrl",
                            resolve: {
                                contactResource: "ContactResource",

                                contact: function(contactResource, $stateParams) {
                                    var contactId = $stateParams.contactId;
                                    return contactResource.getSingle({ id: contactId }).$promise;
                                }
                            }
                        })
                        .state("contactCreate", {
                            url: "/contact/create/",
                            templateUrl: "static/views/contactAdd.html",
                            controller: "contactAddCtrl",
                        })
                }]
    );
}());
