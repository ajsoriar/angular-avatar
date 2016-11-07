/**
 * angular-avatar
 * Angular Avatar is an AngularJS directive that generates a letter's avatar like Google does in several web apps. First letter of each word in a string will be used to generate the avatar.
 * @version v1.3.0 - 2016-11-07
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
                wrapper: '=wrapper',
                pictureResolution: '@pictureResolution',
                pixelated: '=pixelated',
                roundShape: '=roundShape',
                class: '@class',
                imgClass: '@imgClass',
                style: '@style',
                string:'@string',
                cornerRadius: '@cornerRadius',
                pictureFormat: '@pictureFormat',
                colorsPalette: '=colorsPalette',
                autoColor: '=autoColor',
                fontWeight: '@fontWeight',
                fontScale: '@fontScale',
                textShadow: '=textShadow',
                bind: '=bind',
                maxLength: '@maxLength',
                upperCase: '=upperCase'
            },
            link: function(scope, element, attrs) {

                var _long = 45,
                    _picture_resolution = 256,
                    _wrapper = true,
                    _str = "", //scope.initials || "",
                    _bgcolor = "#000",
                    _textcolor = "#fff",
                    _pixelated = false,
                    _img_styling = "vertical-align:top;",
                    _roundShape = false,
                    _wrapper_styling = "border-radius:0; display:block; overflow:hidden;",
                    _extra_classes = "",
                    _extra_img_classes = "",
                    _extra_styles = "",
                    _corner_radius = "0",
                    _picture_format = "png",
                    _colors_palette = ["#bdc3c7","#6f7b87","#2c3e50","#2f3193","#662d91","#922790","#ec2176","#ed1c24","#f36622","#f8941e","#fab70f","#fdde00","#d1d219","#8ec73f","#00a650","#00aa9c","#00adef","#0081cd","#005bab"],
                    _autoColor = false,
                    _font_weight = 100,
                    _font_scale = 100,
                    _text_shadow = false,
                    _bind = false,
                    _img_width = "100%",
                    _upperCase = false;

                function checkValues(){

                    if (scope.bind != undefined){
                        _bind = scope.bind;
                    }

                    if (scope.textColor != undefined) {
                        _textcolor = scope.textColor;
                    }

                    if (scope.pictureResolution != undefined) {
                        _picture_resolution = scope.pictureResolution;
                    }

                    if (scope.width != undefined) {
                        _long = scope.width;
                    }   

                    if (scope.wrapper != undefined) {
                        _wrapper = scope.wrapper;
                        if ( _wrapper === false ) { 
                            _img_width = _long;
                        }
                    }

                    if (scope.pixelated != undefined) {
                        _pixelated = scope.pixelated;
                        if ( _pixelated === true ) { 
                            _img_styling += "image-rendering:pixelated; image-rendering:-moz-crisp-edges;"; 
                        }
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

                    if (scope.imgClass != undefined) {
                        _extra_img_classes = scope.imgClass;
                    }

                    if (scope.style != undefined) {
                        _extra_styles = scope.style;
                    }

                    if (scope.initials != undefined) {
                        _str = scope.initials;
                    }

                    if (scope.string != undefined) {
                        _str = getInitialsFromString( scope.string );
                    }

                    if (scope.maxLength != undefined) {
                        _str = _str.substr(0, scope.maxLength );
                    }

                    if (scope.pictureFormat === 'jpeg') {
                        _picture_format = "jpeg";
                    }

                    if (scope.colorsPalette != undefined) {
                        _colors_palette = scope.colorsPalette;
                    }                 

                    if (scope.bgcolor != undefined) {
                        _bgcolor = scope.bgcolor;
                    } else {

                        if (scope.autoColor != undefined) {

                            _autoColor = scope.autoColor;
                            if ( _autoColor === true ) {
                                var i, lon = _str.length, charIndex=0,colorIndex;
                                for(i=0; i<lon;i++) charIndex = _str.charCodeAt(i);
                                colorIndex = charIndex % _colors_palette.length;
                                _bgcolor = _colors_palette[ colorIndex ];
                            }
                        }                     
                    }

                    if (scope.fontWeight != undefined) {
                        _font_weight = scope.fontWeight;
                    }

                    if (scope.fontScale != undefined) {
                        _font_scale = scope.fontScale;
                    }

                    if (scope.textShadow != undefined) {
                        _text_shadow = scope.textShadow;
                    }

                    if (scope.upperCase === true) {
                        _str = _str.toUpperCase();
                    }

                }

                function generateAvatar(name, w, h, bgcolor, textcolor, bgImage) {

                    var WIDTH = 256, HEIGHT = 256, canvas, ctx, _font_size;

                    if (w != undefined && w > 0) {
                        if (h != undefined && h > 0) {
                            WIDTH = w;
                            HEIGHT = h;
                        }
                    }

                    canvas = document.createElement('canvas');
                    canvas.id = "ngAvatar-" + Date.now();
                    canvas.width = WIDTH;
                    canvas.height = HEIGHT;

                    ctx = canvas.getContext('2d');
                    ctx.fillStyle = bgcolor;
                    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
                    _font_size = WIDTH / (2 / ( _font_scale / 100 ));     
                    ctx.font = _font_weight +" "+ _font_size +"px sans-serif";

                    if ( _text_shadow === true ) {
                        ctx.shadowColor = "black";
                        ctx.shadowOffsetX = 0; 
                        ctx.shadowOffsetY = 0; 
                        ctx.shadowBlur = 5;                        
                    }

                    ctx.textAlign = "center";
                    ctx.fillStyle = textcolor;
                    //ctx.fillText(_str, WIDTH / 2, HEIGHT - (HEIGHT / 2) + ( _font_size / 3) + 5 );
                    ctx.fillText( _str, WIDTH / 2, HEIGHT - (HEIGHT / 2) + ( _font_size / 3) );

                    return canvas.toDataURL("image/"+ _picture_format );
                }

                function getInitialsFromString(str){

                    var output = "", 
                        i = 0, 
                        str = str.split(" "),
                        len = str.length;
                    
                    for ( i; i < len; i++ ) if ( str[i] != "" ) output += str[i][0]; //.toUpperCase();
                    return output;
                }

                var currentElement = element;

                function render(){

                    var imgData = generateAvatar( _str, _picture_resolution, _picture_resolution, _bgcolor, _textcolor, null);

                    var html = '';
                    if (_wrapper) html += '<div class="avatar-wrapper '+ _extra_classes +'" style="'+ _wrapper_styling +' width:' + _long + 'px; height:' + _long + 'px; '+ _extra_styles +'">';
                    html += '<img src="' + imgData + '" class="avatar-picture '+ _extra_img_classes +'" style="'+ _img_styling +'" width="'+ _img_width +'" height="" />';
                    if (_wrapper) html += '</div>';

                    var replacementElement = angular.element(html);
                    currentElement.replaceWith(replacementElement);
                    currentElement = replacementElement;
                }

                checkValues();
                if ( _bind === true ){

                    scope.$watch( 'string', function ( value ) {

                        checkValues();
                        render();
                    });

                    scope.$watch( 'initials', function ( value ) {

                        checkValues();
                        render();
                    });

                    /*
                    scope.$watch( 'bgcolor', function ( value ) {

                        checkValues();
                        render();
                    });
                    */

                } else {

                    render();
                }

            }
        };
    }]);

}());
