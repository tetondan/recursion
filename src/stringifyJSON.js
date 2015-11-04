var stringifyJSON = function(obj) {
  var str = "";
  function stringItUp(obj){
    if(typeof(obj) === 'string'){
      str+='"'+obj+'"';
    }else if(typeof(obj) === 'number' || typeof(obj) === 'boolean'){
      str+=obj;
    }else if (obj === null){
      str+= null;
    }else if(obj.constructor === Array){
      str+='[';
      for(var i = 0; i < obj.length; i++){
        if(typeof(obj[i]) === 'string'){
          str+='"'+obj[i]+'"';
        }else if(typeof(obj[i]) === 'number' || typeof(obj[i]) === 'boolean'){
          str += obj[i];
        }else if(obj[i] === null){
          str+= null;
        }else if(typeof(obj[i]) === 'object'){
          stringItUp(obj[i]);
        }
        if(i+1 !== obj.length){
          str += ",";
        }
      }
      str+=']';
    } else {
      str += "{";
      var keys = Object.keys(obj);
      for(var i = 0; i < keys.length; i++) {
        var key = keys[i], value = obj[key];
        if(typeof(value) !== 'function' && typeof(value) !== 'undefined'){
          str+='"'+key+'"' + ':';
          if(typeof(value) === 'string'){
            str+='"'+value+'"';
          }else if(value === null){
            str += null;
          }else if(typeof(value) === 'number' || typeof(value) === 'boolean'){
            str += value;
          }else if(typeof(value) === 'object'){
            stringItUp(value);
          }
          if(i+1 !== keys.length){
            str+=',';
          }
        }else if(typeof(key)==='object'){
            stringItUp(key);
        }
      }
      str+='}';
    }
  }
  stringItUp(obj);
  return str;
};


















