/**
 * angular-avatar
 * Amgular Avatar is an AngularJS directive that generates a letter's avatar like Google does in several web apps. First letter of each word in a string will be used to generate the avatar.
 * @version v1.0.1 - 2016-03-12
 * @link https://github.com/ajsoriar/angular-avatar
 * @author Andres J Soria R <ajsoriar@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function() {

    'use strict';

    var ngavatar = angular.module('ngAvatar', []);

    ngavatar.directive('ngAvatar', [function() {
 
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                initials: '@initials',
                width: '@width',
                bgcolor: '@bgColor',
                textColor: '@textColor',
                wrapper: '@wrapper',
                pictureResolution: '@pictureResolution',
                pixelated: '@pixelated',
                roundShape: '@roundShape'
            },
            link: function(scope, element, attrs) {

                //console.log("scope:", scope);
                //console.log("element:", element);
                //console.log("attrs:", attrs);

                var _long = 45;
                var _picture_resolution = 256;
                var _wrapper = true;
                var _str = scope.initials;
                var _bgcolor = "#000";
                var _textcolor = "#fff";
                var _pixelated = false;
                var _img_styling = "vertical-align: top;";
                var _roundShape = false;
                var _wrapper_styling = "border-radius: 0;display: block;overflow: hidden;";

                if (scope.bgcolor != undefined) {
                    _bgcolor = scope.bgcolor;
                }

                if (scope.textColor != undefined) {
                    _textcolor = scope.textColor;
                }

                if (scope.wrapper != undefined) {
                    _wrapper = scope.wrapper;
                }

                if (scope.pictureResolution != undefined) {
                    _picture_resolution = scope.pictureResolution;
                }

                if (scope.width != undefined) {
                    _long = scope.width;
                }

                if (scope.pixelated != undefined) {
                    _pixelated = scope.pixelated;
                    if ( _pixelated ) _img_styling += "image-rendering: pixelated; image-rendering: -moz-crisp-edges;";
                }

                if (scope.roundShape != undefined) {
                    _roundShape = scope.roundShape;
                    if ( _roundShape ) _wrapper_styling += "border-radius: "+ _long +"px;";
                }

                scope.tryOut = function(){
                    return 7;
                };

                scope.generateAvatar = function(name, w, h, bgcolor, textcolor, bgImage) {

                    var WIDTH = 256;
                    var HEIGHT = 256;

                    if (w != undefined && w > 0) {
                        if (h != undefined && h > 0) {
                            WIDTH = w;
                            HEIGHT = h;
                        }
                    }

                    if (bgImage != undefined && bgImage != null) {

                    } 

                    var canvas = document.createElement('canvas');
                    canvas.id = "ngAvatar-" + Date.now();
                    canvas.width = WIDTH;
                    canvas.height = HEIGHT;

                    var ctx = canvas.getContext('2d');

                    ctx.fillStyle = bgcolor;
                    ctx.fillRect(0, 0, WIDTH, HEIGHT);
                    ctx.font = WIDTH/2 +"px Arial";
                    ctx.textAlign = "center";
                    ctx.fillStyle = textcolor;
                    ctx.fillText(_str, WIDTH / 2, HEIGHT / 1.5);

                    var img = canvas.toDataURL("image/png");
                    return img;
                };

                var imgData = scope.generateAvatar("angular avatar", _picture_resolution, _picture_resolution, _bgcolor, _textcolor, null);

                var html = '';
                if (_wrapper) html += '<div class="avatar-wrapper" style="'+ _wrapper_styling +'width: ' + _long + 'px;height: ' + _long + 'px;">';
                html += '<img src="' + imgData + '" class="avatar-picture" style="'+ _img_styling +'" width="100%" height="" />';
                if (_wrapper) html += '</div>';

                element.replaceWith(html);
                
            } // link
        }; // return

    }]);

}());
