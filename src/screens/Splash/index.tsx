import { View, Text, Image } from 'react-native'
import React, { useEffect }  from 'react'
import { styles } from './style';
import LottieView from 'lottie-react-native';

interface SplashProps {
    inicial:() => void;
}

export default function Splash({inicial}:SplashProps) {

    useEffect(()=> {
        const timer = setTimeout(() => {
        inicial();
        }, 5000);

        return () => clearTimeout(timer);
    },[]);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../img/anime2.json')}
                autoPlay
                loop
                style={styles.animacao}
                />
        </View>
    )
}