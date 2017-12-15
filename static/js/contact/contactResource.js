/**
 * Created by nmukammel on 12/15/17.
 */
(function(){
    "use strict"
    angular.module("ContactManagement")
        .factory("ContactResource",["$resource",ContactResource]);

    function ContactResource($resource){
        return $resource("/api/v1/contact/:id/",{ id : '@id' },{
            update: {
                method: 'PUT',
                url:"/api/v1/contact/:id"
            },
            query: {
                method: 'GET',
                isArray:true
            },
            create: {
                method: 'POST',
                url:"/api/v1/contact/"
            },
            remove: {
                method: 'DELETE',
                url:"/api/v1/contact/:id/"
            },
            getSingle:{
                method: 'GET',
                url:"/api/v1/contact/:id/"
            }
        });
    };
}());
