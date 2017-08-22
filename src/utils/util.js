/**
 * Created by lunachi on 17/5/25.
 */

function isArray(value) {
    if (typeof value === 'object' && Object.prototype.toString.call(value).toLowerCase() === '[object array]') {
        return true;
    }
    return false;
}

function isJSON(value) {
    if (typeof(value) === "object" && Object.prototype.toString.call(value).toLowerCase() === "[object object]" && !value.length) {
        return true;
    }
    return false;
}

function mixin(...sources) {
    let _target = Object.assign({}, ...sources);
    return _target
}

export {
    isArray,
    isJSON
    mixin
};