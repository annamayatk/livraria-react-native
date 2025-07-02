import { StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container:{
        overflow: 'hidden',
        width: '100%',
        height: 30,
        justifyContent: "center",
        backgroundColor: '#F57C00',
    },
    text:{
        fontSize:18,
        fontWeight: 'bold',
        paddingTop:2,
        color:'#ffffff',
        textShadowColor:'#000000',
        textShadowOffset:{width:1,height:1},
        textShadowRadius:3,
    },
})