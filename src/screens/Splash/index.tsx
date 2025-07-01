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
            
            <View>
                <View style={styles.containerCombo}>
                {/* stars */}
                <View style={styles.containerStars}>
                    <LottieView
                        source={require('../../img/alien.json')}
                        autoPlay
                        loop
                        style={styles.animacaoStars}
                        />
                </View>

                {/* ufo */}
                <View style={styles.containerStars}>
                    <LottieView
                        source={require('../../img/stars.json')}
                        autoPlay
                        loop
                        style={styles.animacaoUfo}
                        />
                </View>

                {/* stars */}
                <View style={styles.containerStars}>
                    <LottieView
                        source={require('../../img/moon.json')}
                        autoPlay
                        loop
                        style={styles.animacaoStars}
                        />
                    </View>
                </View>

                <View style={styles.containerCombo}>
                {/* stars */}
                <View style={styles.containerStars}>
                <LottieView
                    source={require('../../img/stars.json')}
                    autoPlay
                    loop
                    style={styles.animacaoStars}
                    />
                </View>

                {/* ufo */}
                <View style={styles.containerUfo}>
                <LottieView
                    source={require('../../img/ufo.json')}
                    autoPlay
                    loop
                    style={styles.animacaoUfo}
                    />
                </View>

                {/* stars */}
                <View style={styles.containerStars}>
                <LottieView
                    source={require('../../img/stars.json')}
                    autoPlay
                    loop
                    style={styles.animacaoStars}
                    />
                </View>
                </View>
            </View>
            
            {/* astronauta */}
            <View style={styles.containerAstronauta}>
                <LottieView
                    source={require('../../img/anime2.json')}
                    autoPlay
                    loop
                    style={styles.animacaoAstronauta}
                    />
            </View>

            {/* livro */}
            <View style={styles.containerLivro}>
            <LottieView
                source={require('../../img/anime1.json')}
                autoPlay
                loop
                style={styles.animacaoLivro}
                />
            </View>
        </View>
    )
}