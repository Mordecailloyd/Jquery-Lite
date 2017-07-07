/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


const DOMNC = __webpack_require__(1);

// $(() => {



// console.log('hello world.');
let loaded=false;
let funcArr = [];
const $el = function (selector) {

  if (typeof(selector)==='function'){
    if(loaded) {selector();}
    else {funcArr.push(selector);}
    return;
  }
  if(selector instanceof HTMLElement){
    return DOMNC([selector]);
  }
  let selected = document.querySelectorAll(selector);
  let stringArr = [];
  selected.forEach((val,idx)=>{//this loop converts array-like objects into arrays
    stringArr.push(val);
  });
  return new DOMNC(stringArr);
};

$el.extend = (obja,...objs) => {
  for (var i = 0; i < objs.length; i++) {
    let keys=Object.keys(objs[i]);
    for (var j = 0; j < keys.length; j++) {
      obja[keys[j]]=objs[i][keys[j]];
    }
  }
  return obja;
};

$el.ajax = (opts) => {
  const defs = {success:()=>{},
  error:() => {},
  url: './',
  method: 'GET',
  data: '',
  contentType: '',
  };
  opts = $el.extend(defs,opts);
  const xhr = new XMLHttpRequest();

  // step 2 - specify path and verb
  xhr.open(opts['method'] ,opts['url']);

  // step 3 - register a callback
  xhr.onload = function () {
    defs['success'](xhr.response);
    // defs['error'](xhr.onerror);
    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(xhr.response);
  };
  xhr.onerror=function() {
    defs['error'](xhr.response);
  };
  xhr.send(opts);
};

window.$el=$el;

window.onload = (() =>{
  loaded=true;
  for (var i = 0; i < funcArr.length; i++) {
    funcArr[i]();
  }
});
// });
$el(()=>{
  console.log("stuff works!");
});


// $.ajax({
//   type: 'GET',
//   url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
//   success(data) {
//     console.log("We have your weather!")
//     console.log(data);
//   },
//   error() {
//     console.error("An error occurred.");
//   },
// });


/***/ }),
/* 1 */
/***/ (function(module, exports) {



class DOMNodeCollection {
  constructor(htmlArr) {
    this.htmlArr=htmlArr;
    return this;
  }
}

DOMNodeCollection.prototype.empty=function(){
  for (var i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i]["innerHTML"]="";
  }
};

DOMNodeCollection.prototype.append = function (input) {
  if (typeof(input) === "string"){
    for (var i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i]['innerHTML'] += input;
    }
  }
  // else if (input instanceof HTMLElement) {
  // }
  else{
    for (var i = 0; i < input.htmlArr.length; i++) {
      for (var j = 0; j < this.htmlArr.length; j++) {
        this.htmlArr[j]['innerHTML']+=(input.htmlArr[i]['innerHTML']);
      }
    }
  }
};

DOMNodeCollection.prototype.html=function(string) {
  if(string===undefined){
    return this.htmlArr[0]["innerHTML"];
  }else{
    for (var i = 0; i < this.htmlArr.length; i++) {
       this.htmlArr[i]["innerHTML"] = string;
    }
  }
};

DOMNodeCollection.prototype.attr=function(type,val) {
  if(val === undefined){
    return this.htmlArr[0]['attributes'][type];
  }else{
    for (var i = 0; i < this.htmlArr.length; i++) {
       this.htmlArr[i]['attributes'][type] = val;
    }
  }
};

DOMNodeCollection.prototype.addClass=function(classarg) {
  for (var i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i]['classList'] +=( ' ' + classarg);
  }
};

DOMNodeCollection.prototype.removeClass=function(classarg){
  for (var i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i]['classList'].remove(classarg);
  }
};

DOMNodeCollection.prototype.children=function() {
  let newCollection = [];
  for (var i = 0; i < this.htmlArr.length; i++) {
    newCollection = newCollection.concat(this.htmlArr[i]['children']);
  }
  return (new DOMNodeCollection(newCollection));
};

DOMNodeCollection.prototype.parent=function() {
  let newCollection = [];
  for (var i = 0; i < this.htmlArr.length; i++) {
    newCollection = newCollection.concat(this.htmlArr[i]['parentNode']);
  }
  return (new DOMNodeCollection(newCollection));
};

DOMNodeCollection.prototype.find=function(selector) {
  let col=[];
  for (var i = 0; i < this.htmlArr.length; i++) {
    col = col.concat(Array.from(this.htmlArr[i].querySelectorAll(selector)));
  }
  return new DOMNodeCollection(col);
};

DOMNodeCollection.prototype.remove=function() {
  for (var i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i]["parentNode"].removeChild(this.htmlArr[i]);
  }
  this.htmlArr = [];
};

DOMNodeCollection.prototype.on = function(event, cb) {//event must be a string or string coercible
  for (var i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i]['on'+event] = cb;
  }
};

DOMNodeCollection.prototype.off = function (event) {
  for (var i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i]['on'+event] = null;
  }
};

module.exports=DOMNodeCollection;






//


/***/ })
/******/ ]);