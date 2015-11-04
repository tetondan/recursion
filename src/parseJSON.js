//Disclaimer: I had a difficult time with this project and have borrowed a gerneral outline and a bit of code from 
//Douglas Crockfords JSON parser in 'Javascript: The Good Parts' to fill in the code I had trouble writing. I do understand all 
//of the code and how it and Recursive descent parsers work after writing out the whole code.
function parseJSON(text) {
  var ind = 0;
  var chr = ' ';
  var escapee = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    b: 'b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
  }

  function error(){
    throw new SyntaxError();
  }

  function next(c){
    if(c && c !== chr){
      error();
    }
    chr = text.charAt(ind);
    ind++;
    return chr;
  }

  function string(){
    var hex,
      i,
      string = '',
      uffff;
    if (chr === '"') {
      while (next()) {
        if (chr === '"') {
          next();
          return string;
        } else if (chr === '\\') {
          next();
          if (chr === 'u') {
            uffff = 0;
            for (i = 0; i < 4; i += 1) {
            hex = parseInt(next(), 16);
              if (!isFinite(hex)) {
                break;
              }
              uffff = uffff * 16 + hex;
            }
            string += String.fromCharCode(uffff);
          } else if (typeof escapee[chr] === 'string') {
            string += escapee[chr];
          } else {
            break;
          }
        } else {
          string += chr;
        }
      }
    }
    error();
  }
  
  function number(){
    var number;
    var string = ''
    if(chr === '-'){
      string = '-';
      next('-');
    }   
    while(chr >= '0' && chr <= 9){
      string += chr;
      next();
    }
    if (chr === '.'){
      string += '.';
      while(next() && chr >= '0' && chr <= '9'){
        string += chr;
      }
    }
    number = +string;
    if(isNaN(number)){
      error();
    } else {
      return number;
    }
  }

  function whiteSpace(){
    while(chr && chr <= ' '){
      next();
    }
  }

  function tFBoo(){
    if(chr === 't'){
      next('t');
      next('r');
      next('u');
      next('e');
      return true;
    } else if (chr === 'f'){
      next('f');
      next('a');
      next('l');
      next('s');
      next('e');
      return false;
    } else if(chr === 'n'){
      next('n');
      next('u');
      next('l');
      next('l');
      return null;
    } else {
      error();
    }
  }

  var value;

  function array(){
    var array = [];
    if(chr ==='['){
      next('[');
      whiteSpace();
      if(chr === ']'){
        next(']');
        return array;
      }
      while(chr){
        array.push(value());
        whiteSpace();
        if(chr === ']'){
          next(']');
          return array;
        }
        next(',');
        whiteSpace();
      }
    }
    error();
  }

  function object(){
    var key;
    var object = {};
    if(chr === '{'){
      next('{');
      whiteSpace();
      if(chr === '}'){
        next('}');
        return object;
      }
      while(chr){
        key = string();
        whiteSpace();
        next(':');
        object[key] = value();
        whiteSpace();
        if(chr === '}'){
          next('}');
          return object;
        }
        next(',');
        whiteSpace();
      }
    }
    error()
  }

  function value(){
    whiteSpace();
    if(chr === '{'){
      return object();
    } else if (chr === '['){
      return array();
    } else if (chr === '"'){
      return string();
    } else if ((chr === '-') || (chr >= '0' && chr <= '9')){
      return number();
    } else {
      return tFBoo();
    }
  }
  return value();
};
