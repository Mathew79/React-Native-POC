import React from 'react';
import { AsyncStorage } from 'react-native';
import { AppRecord } from '../model/AppRecord';

export async function saveToStore(item, dispatch) {
    if (item instanceof AppRecord) {
        try {
            await AsyncStorage.setItem(item.key, JSON.stringify(item));
            dispatch({ type: "ADDED_TO_STORE" });
        } catch (error) {
            //Error saving data
        }
    }
}

export async function hasItemInStore(key, dispatch) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log(value); //
            dispatch({ type: "FOUND_IN_STORE" });

            return true;
        }
        else {
            dispatch({ type: "NOT_FOUND_IN_STORE" });
            return false;
        }
    } catch (error) { }
}


export function removeFromStore(item, dispatch) {
    AsyncStorage.multiRemove([item.key]).then(() => fetchWishListFromStrore(dispatch));
    //
}

export function fetchWishListFromStrore(dispatch) {
    dispatch({ type: "FETCHING_FROM_STORE" });
    var appsArray = [];
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
                let value = store[i][1];
                if (value != null) {
                    apps = JSON.parse(value)
                    appsArray.push(apps);
                }
            });
            dispatch({ type: "FETCHED_FROM_STORE", items: appsArray });
        });

    });


    return appsArray;
}

export function totalAmount(items) {
    var sum = 0
    items.forEach(function (element) {
        let number = Number(element.price.replace(/[^0-9\.-]+/g, ""));
        sum = sum + number
    }, this);

    return '$' + sum.formatMoney(2);;
}


Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};