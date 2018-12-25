/* 
 * Flatten deeply nested object in standard javascript without external library like Immutable 
 * No recursive, no map/reduce no heavy array movement and still generator friendly() 
 * can 
 */ 

/* 
 * Utility flatten deep structured object/array 
 * return array of(or yield) key value pair in depth/breath first traversal
 * '.' as segment key delimiter
 * @param o: any 
 * @param includeNonBuiltInType : boolean   
 * @param includeInherited : boolean 
 * @param breathFirst : boolean 
 */ 
function deepFlatten(o,includeNonBuiltInType,includeInherited,breathFirst) {
    var getKeys = function(o) {
          var result=[]; 
          for (var k in o) {
            if (includeInherited || Object.prototype.hasOwnProperty.call(o, k)) result.push(k)
          }
          return result;
         }
    var isContainerType = function(valConstructor) {
          return !(
            valConstructor === String 
            || valConstructor === Boolean
            || valConstructor === Number 
            || valConstructor === Date 
            || valConstructor === Function 
            || valConstructor === RegExp 
            ) 
        }
    var containers=[{prefix:null,level:0, val:o, kidx:0, keys:getKeys(o)}]
        ,result=[]
    for (var i = 0; containers.length > (breathFirst ? i : 0); i = i + 1) {
      var obj = breathFirst ? containers[i] : containers.pop()
          ,prefix = obj.prefix
          ,keys = obj.keys
          ,klen = keys.length
          ,start = obj.kidx;
      for (var j = start; j < klen; j = j + 1 ) {
        var key = keys[j]
            ,val = obj.val[key]
            ,flattenKey = (prefix ? prefix + '.' : '') + key
            ,constructor = val.constructor
            ,level = obj.level + 1
        if (constructor===Object || constructor===Array || (includeNonBuiltInType && isContainerType(constructor))){
          if (j + 1 < klen && !breathFirst) containers.push({prefix:prefix,level:obj.level,val:obj.val,kidx:j+1,keys:keys})
          containers.push({prefix:flattenKey, level:level, kidx:0, val:val, keys:getKeys(val)})
          if (!breathFirst) break;
        }
        else {
          // can be yield for generator function  
          result.push({key:flattenKey,level:level, val:val})
        }
      }
    }
    return result;
  }