

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
