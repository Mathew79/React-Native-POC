'use strict';

var validateStore = {}

validateStore['email'] = email;
validateStore['street'] = street;
validateStore['city'] = city;
validateStore['postalCode'] = postalCode;


function street(string) {
    let regx = RegExp('^([0-9]+ )?[a-zA-Z ]+$');
    let valid = regx.test(string);

    if (valid)
        return [true, '']
    else
        return [false, 'Enter valid street address']
}


function city(string) {
    let regx = RegExp('^([a-zA-Z\u0080-\u024F]+(?:. |-| |\'))*[a-zA-Z\u0080-\u024F]*$');
    let valid = regx.test(string);

    if (valid)
        return [true, '']
    else
        return [false, 'Enter valid city']
}

function postalCode(string) {
    let regx = RegExp('^[0-9]{5}(?:-[0-9]{4})?$')
    let valid = regx.test(string);

    if (valid)
        return [true, '']
    else
        return [false, 'Enter valid postal code']
}


function email(string) {
    return [false, 'Enter valid email']
}


export default function validate(string, key) {
    let fn = validateStore[key];

    if (fn != 'undefined' && fn != null)
        return fn(string)
    else
        return [true, ''];
}