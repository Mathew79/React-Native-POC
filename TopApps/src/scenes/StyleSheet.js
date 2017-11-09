import React from 'react';

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        margin: 0,
        flex: 1,
        backgroundColor: 'white',
    },
    table: {
        flex: 1,
        margin: 0,
        backgroundColor: "transparent",
    },
    row: {

        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'transparent',
        height: 60,
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",

    },
    seperator: {
        height: 1,
        backgroundColor: '#E3E3E2',
        marginLeft: 73,
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    },
    text: {
        flex: 1,
        fontSize: 14,
        right: 10,
        left: 0,
    },
    logo: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        width: 53,
        height: 53,
        marginRight: 10,

    },
    error: {
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    },

});

export const buttonStyles = StyleSheet.create({
    amount: {
        flex: 0,
        width: 60,
        height: 24,
        marginRight: 10,
        marginLeft: 5,
        borderColor: '#0C67FB',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    amountGreen: {
        flex: 0,
        width: 60,
        height: 24,
        marginRight: 10,
        marginLeft: 5,
        borderColor: '#70C971',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftBar: {
        overflow: 'hidden',
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },

});


export const textStyles = StyleSheet.create({
    amount: {
        textAlign: 'center',
        color: '#0C67FB',
        fontWeight: '500'
    },
    amountGreen: {
        textAlign: 'center',
        color: '#70C971',
        fontWeight: '500'
    }
});


export const addressStyles = StyleSheet.create({
    label: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 2,
        color: '#848BAF'
    }
    ,
    input: {
        height: 35,
        color: '#ECEFF4',
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 4,
       
    },
    error: {
        marginLeft: 10,
        marginTop: 2,
        marginBottom: 2,
        color: '#FF8A8A'
    } 
});



