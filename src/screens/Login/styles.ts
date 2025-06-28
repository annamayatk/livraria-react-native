import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const styles = StyleSheet.create({
    container:{
        justifyContent:'flex-start',
        alignItems:'center',
        paddingHorizontal:20,
        paddingTop:80,
    },
    imgFundo:{
        width:'100%',
        height:'100%',
    },
    contInsert:{
        alignItems:'center',
    },
    texto:{
        fontSize:20,
        fontWeight:'bold',
        color:'blue',
        backgroundColor:'rgba(255,255,255,0.2)',
    },
    img:{
        width:120,
        height:120,
        marginBottom:20,
    },
    input:{
        fontSize:20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        padding:10,
        width:200,
        height:20,
        marginBottom:10,
        backgroundColor:'rgba(255,255,255,0.6)',
    },
    touch:{
        fontSize:20,
        fontWeight:'bold',
        color:'blue',
    },
    touchNovo:{
        fontSize:15,
        color:'blue',
        fontStyle:'italic',
    },
});