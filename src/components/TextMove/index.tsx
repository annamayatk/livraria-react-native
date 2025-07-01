import { View, Dimensions, Animated, StatusBar } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { styles } from './styles';

interface TextMoveProps{
    textoMove: string;
}

export default function TextMove({textoMove}:TextMoveProps) {

    const screenWidth = Dimensions.get('window').width; //pega a largura da tela
    const animatedValue = useRef(new Animated.Value(screenWidth)).current;
    const [textWidth, setTextWidth] = useState<number>(0);

    useEffect(() => {

        if(textWidth === 0) return;

        Animated.loop(
            Animated.timing(animatedValue,{
                toValue: -textWidth,
                duration: 9000,
                useNativeDriver: true,
            })
        ).start();
    }, [textWidth]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <Animated.Text
                style={[styles.text,
                    {transform: [{translateX:animatedValue}]}
                ]}
                onLayout={(e)=>{
                    const {width} = e.nativeEvent.layout;
                    setTextWidth(width)
                }}
            >
                {textoMove}
            </Animated.Text>
        </View>
    )
}