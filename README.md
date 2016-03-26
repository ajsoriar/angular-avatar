# angular-avatar
Angular directive that generates a letter's avatar like Google does in several web apps. First letter of each word in a string will be used to generate the avatar. The generated avatar will be a picture that can be retrieved as a jpeg or png in order to be stored in back-end.

## Quick start. 

#### 1 Download and Install angular-avatar:

* Bower

	**bower install angular-avatar**

* NPM

	**npm install angular-avatar**

* NuGet

	**PM> Install-Package angular-avatar**

* github

	**https://github.com/ajsoriar/angular-avatar**


#### 2 Include dependences: 
2.1 angular-avatar.js or angular-avatar.min.js are under dist folder.

2.2 Include angular-avatar.js or angular-avatar.min.js after angular dependences, e.g.
```
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="bower_components/angular-avatar/dist/angular-avatar.js"></script>
```

2.3 Add the ngAvatar module as a dependency when creating your app, e.g.

```
var app = angular.module('myApp', ['ngAvatar']);
```

#### 3 Use it. 
No need to inject in controllers just use it in your html code this way:

```
<ng-avatar initials="AS"></ng-avatar>
```

More USSAGE examples: :+1:

![Alt text](./demo/angular-avatar-examples.png?raw=true "More examples")

```
<ng-avatar initials="A"></ng-avatar>
<div ng-avatar initials="AS" bg-color="#00FF00"></div>
<ng-avatar initials="AJS" bg-color="cyan" text-color="blue" round-shape="true" ></ng-avatar>
<div ng-avatar initials="AJ" bg-color="red" text-color="yellow" picture-resolution="512" width="64"></div>
<div ng-avatar initials="AJ" bg-color="yellow" text-color="green" picture-resolution="1024" width="32"></div>
<ng-avatar initials="AS" bg-color="lightgreen" text-color="red" picture-resolution="16" width="128" pixelated="false" ></ng-avatar>
<ng-avatar initials="AS" bg-color="lightgreen" text-color="red" picture-resolution="16" width="128" pixelated="true" ></ng-avatar>
<ng-avatar initials="AS" round-shape="true" bg-color="lightgreen" text-color="red" picture-resolution="512" width="42" pixelated="false" class="adres-css" style="border:4px solid red" ></ng-avatar>
<ng-avatar initials="AS" round-shape="true" string="  andres     jose   soria " bg-color="orange" text-color="#FFF" picture-resolution="256" width="64" pixelated="false" class="adres-css" style="border:4px solid red" ></ng-avatar>
<ng-avatar round-shape="true" bg-color="orange" text-color="white" picture-resolution="256" width="56" pixelated="false" class="adres-css" style="border:2px solid blue" ></ng-avatar>
```


#### 4 License

MIT

Copyright (c) 2016 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

**Free Software, Hell Yeah!**
