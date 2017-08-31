function generateObj(seed, deep) {
	if (deep < 0) {
		return 'copy copy which is fast';
	}
	var key = `key${deep}`;
	var aSeed = {};
	seed[key] = generateObj(aSeed, --deep);
	return seed;
}

function extendWidth(width) {
	var o = {};
	for (var i = 0; i < width; i++) {
		var gObj = generateObj({}, 5);
		o[`width${i}`] = gObj;
	}
	return o;
}

function deepCopy(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object') {
        return;
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            deepCopy(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};

let gObj = extendWidth(20);
let deepCopyObj = deepCopy(gObj);

export default {
	deepCopy,
	extendWidth,
	gObj,
	deepCopyObj
}