// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };
// But instead we're going to implement it from scratch:
var getElementsByClassName = function(classname){
  var arr =[];
  function searcher(start, index){
    if(index === undefined){
      index = start.children.length;
    };
    if(start.className.includes(classname) && (arr.indexOf(start) === -1)){
      arr.push(start);
    };
    if(index === 0 || index === undefined){
      return false;
    } else {
      return searcher(start.children[index-1]) ||
             searcher(start, index - 1);
    };
  }
  searcher(document.body);
  return arr;
};