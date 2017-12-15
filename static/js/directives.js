/**
 * Created by nmukammel on 12/15/17.
 */
(function(){
    "use strict"
    angular.module("ContactManagement")
        .directive("phoneNumDirective", function () {
            function linkFunction($scope, elem, attrs) {
                var re = RegExp('^[0-9]$');
                var exclude = /Backspace|Enter|Tab|Delete|Del|ArrowUp|Up|ArrowDown|Down|ArrowLeft|Left|ArrowRight|Right/;

                elem.bind("keydown", function (event) {

                     if (!exclude.test(event.key) && !re.test(event.key)) {
                            event.preventDefault();
                        }
                });
            }
            return{
                restrict: 'A',
                link: linkFunction
            }
        })
}());
