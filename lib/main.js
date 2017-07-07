
const DOMNC = require('./dom_node_collection');

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
