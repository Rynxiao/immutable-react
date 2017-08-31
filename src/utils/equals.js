var Equals = (function() {
    var equals = {};
     
    /**
     * 比较数组
     * 
     * @param arg1
     * @param arg2
     * @returns
     */
    equals.equalsArray = function(arg1, arg2) {
        // 判断是否是 Array 对象的实例
        if (!(arg1 instanceof Array)){
            return false;
        }
        if (!(arg2 instanceof Array)){
            return false;
        }
         
        return equalsObject(arg1, arg2);
    };
     
    /**
     * 比较对象
     * 
     * @param arg1
     * @param arg2
     * @returns
     */
    equals.equalsObject = function(arg1, arg2) {
        if (arg1 === arg2) {
            // 值相等、数据类型相等
            return true;
        } else if (arg1 == arg2) {
            // 值相等，数据类型不等
            return false;
        }
         
        return equalsObject(arg1, arg2);
    };
     
    /**
     * 实现函数的 equals ，此版本没有实现
     * @param f1
     * @param f2
     */
    equals.equalsFunction = function(f1, f2) {
        throw new Error("无法比较函数");
    };
 
    /**
     * 对象比较函数
     * 
     * @param arg1
     * @param arg2
     * @returns {Boolean}
     */
    function equalsObject(arg1, arg2) {
         
        // 获得 对象的length属性，以判断是数组还是 对象
        var arg1Len = arg1.length;
        var arg2Len = arg2.length;
         
        var len1 = 0;
        var len2 = 0;
        if (arg1Len && arg2Len) {
            len1 = arg1.length;
            len2 = arg2.length;
        } else if (!arg1Len && !arg2Len) {
            for (var obj in arg1) len1++;
            for (var obj in arg2) len2++;
        } else {
            return false;
        }
        if (len1 !== len2) {
            return false;
        }
        if (arg1Len && arg2Len) {
            for (var i =0; i < arg1Len; i++) {
                if (!inLoop(arg1[i], arg2[i])){
                    return false;
                }
            }
        } else if (!arg1Len && !arg2Len) {
            for (var index in arg1) {
                if (!inLoop(arg1[index], arg2[index])) {
                    return false;
                }
            }
        } else {
            return false;
        }
         
        return true;
    }
     
    /**
     * 具体比较方式
     * 
     * @param e1
     * @param e2
     * @returns {Boolean}
     */
    function inLoop(e1, e2) {
        if (e1 === e2) {
            return true;
        }
         
        var t1 = typeof e1;
        var t2 = typeof e2;
        // 数据类型不同
        if (t1 !== t2) {
            return false;
        }
        // 其中一个元素是 null 或 undefiend
        if ((null === e1 && null !== e2) || (null !== e1 && null === e2)) {
            return false;
        }
        if ((undefined === e1 && undefined !== e2)
                || (undefined !== e1 && undefined === e2)) {
            return false;
        }
        // 无法判断函数
        if ('function' === t1 || 'function' === t2) {
            throw new Error("无法比较函数");
        }
        // 递归
        return equalsObject(e1, e2);
    }
     
    return equals;
})();

export default Equals;
