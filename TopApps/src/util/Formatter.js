'use strict'

var formatStore = {}

export default function format(string, key) {
    let fn = formatStore[key];

    if (fn != 'undefined' && fn != null)
        return fn(string)
    else
        return string;
}