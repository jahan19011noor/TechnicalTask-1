/**
 * Created by nmukammel on 12/15/17.
 */
(function(){
    "use strict"
    angular.module("ContactManagement")
        .filter('arrangNamesInDescOrd', function() {
          return function(arrayNames) {
              if(arrayNames){

                  return arrayNames.sort(function(a,b)
                    {
                        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                    });

              }
          }
        });
}());