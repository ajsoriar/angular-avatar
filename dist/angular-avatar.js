/**
 * angular-avatar
 * Angular Avatar is an AngularJS directive that generates a letter's avatar like Google does in several web apps. First letter of each word in a string will be used to generate the avatar.
 * @version v1.0.4 - 2016-05-08
 * @link https://github.com/ajsoriar/angular-avatar
 * @author Andres J. Soria R. <ajsoriar@gmail.com>
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
                roundShape: '@roundShape',
                class: '@class',
                style: '@style',
                string:'@string',
                cornerRadius: '@cornerRadius',
                autocolor: '@autocolor',
                pictureFormat: '@pictureFormat'
            },
            link: function(scope, element, attrs) {

                var _long = 45,
                    _picture_resolution = 256,
                    _wrapper = true,
                    _str = scope.initials || "",
                    _bgcolor = "#000",
                    _textcolor = "#fff",
                    _pixelated = false,
                    _img_styling = "vertical-align: top;",
                    _roundShape = false,
                    _wrapper_styling = "border-radius: 0;display: block;overflow: hidden;",
                    _extra_classes = "",
                    _extra_styles = "",
                    _corner_radius = "0",
                    _autocolor = true,
                    _picture_format = "png";

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
                    if ( _pixelated === "true" ) { _img_styling += "image-rendering: pixelated; image-rendering: -moz-crisp-edges;"; }
                }

                if (scope.roundShape != undefined) {
                    _roundShape = scope.roundShape;
                    if ( _roundShape ) _wrapper_styling += "border-radius: "+ _long +"px;";
                } else {
                    if ( scope.cornerRadius != undefined ){
                        _corner_radius = scope.cornerRadius;
                        _wrapper_styling += "border-radius: "+ _corner_radius +"px;";
                    }
                }

                if (scope.class != undefined) {
                    _extra_classes = scope.class;
                }

                if (scope.style != undefined) {
                    _extra_styles = scope.style;
                }

                if (scope.string != undefined) {
                    _str = getInitialsFromString( scope.string );
                }

                if (scope.pictureFormat === 'jpeg') {
                    _picture_format = "jpeg";

                    // jpeg quality
                }

                function generateAvatar(name, w, h, bgcolor, textcolor, bgImage) {

                    var WIDTH = 256;
                    var HEIGHT = 256;

                    if (w != undefined && w > 0) {
                        if (h != undefined && h > 0) {
                            WIDTH = w;
                            HEIGHT = h;
                        }
                    }

                    /*
                    if (bgImage != undefined && bgImage != null) {

                    } 
                    */

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

                    var img = canvas.toDataURL("image/"+ _picture_format );
                    return img;
                };

                function getInitialsFromString(str){

                    var output = "", 
                        i = 0, 
                        str = str.split(" "),
                        len = str.length;
                    
                    for ( i; i < len; i++ ) if ( str[i] != "" ) output += str[i][0].toUpperCase();
                    return output;
                };

                var imgData = generateAvatar( _str, _picture_resolution, _picture_resolution, _bgcolor, _textcolor, null);

                var html = '';
                if (_wrapper) html += '<div class="avatar-wrapper '+ _extra_classes +'" style="'+ _wrapper_styling +'width: ' + _long + 'px;height: ' + _long + 'px;'+ _extra_styles +'">';
                html += '<img src="' + imgData + '" class="avatar-picture" style="'+ _img_styling +'" width="100%" height="" />';
                if (_wrapper) html += '</div>';

                element.replaceWith(html);

            }
        };
    }]);

}());
