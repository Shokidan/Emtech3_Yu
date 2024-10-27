import Constants from "expo-constants";
import NetInfo from '@react-native-community/netinfo';
import { StatusBar, StyleSheet, Animated, Text, View, Platform } from "react-native";
import React, { useRef, useEffect } from 'react';

const FadeInOutView = ({ isConnected, children, style }) => {
    const fadeAnim = useRef(new Animated.Value(isConnected ? 1 : 0)).current;

    useEffect(() => {
        if (isConnected) {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 3500,
                    useNativeDriver: true,
                }),
                Animated.delay(3000),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 3500,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 3500,
                useNativeDriver: true,
            }).start();
        }
    }, [isConnected]);

    return (
        <Animated.View style={{ ...style, opacity: fadeAnim }}>
            {children}
        </Animated.View>
    );
};

export default class Status extends React.Component {
    state = {
        isConnected: true,
    };

    animatedBackground = new Animated.Value(1); // 1 for connected (green), 0 for disconnected (red)

    componentDidMount() {
        this.unsubscribe = NetInfo.addEventListener(state => {
            this.setState({ isConnected: state.isConnected }, this.animateBackground);
        });

        NetInfo.fetch().then(state => {
            this.setState({ isConnected: state.isConnected }, this.animateBackground);
        }).catch(err => console.error("Failed to fetch network info: ", err));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    animateBackground = () => {
        Animated.timing(this.animatedBackground, {
            toValue: this.state.isConnected ? 1 : 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    render() {
        const { isConnected } = this.state;

        const backgroundColorInterpolation = this.animatedBackground.interpolate({
            inputRange: [0, 1],
            outputRange: ["red", "#82d074"],
        });

        const statusBarColor = (
            <StatusBar
                backgroundColor={backgroundColorInterpolation}
                barStyle="light-content"
                animated={true}
            />
        );

        const messageContainer = (
            <FadeInOutView isConnected={isConnected} style={styles.messageContainer}>
                {statusBarColor}
                {isConnected && (
                    <View style={styles.connectedBubble}>
                        <Text style={styles.text}>Connected to network</Text>
                    </View>
                )}
                {!isConnected && (
                    <View style={styles.disconnectedBubble}>
                        <Text style={styles.text}>No network connection</Text>
                    </View>
                )}
            </FadeInOutView>
        );

        return (
            <Animated.View style={[styles.status, { backgroundColor: backgroundColorInterpolation }]}>
                {messageContainer}
            </Animated.View>
        );
    }
}

const statusHeight = Platform.OS === "ios" ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height: statusHeight + 100,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    messageContainer: {
        zIndex: 2,
        position: "absolute",
        top: 200,
        left: 0,
        right: 0,
        height: 100,
        alignItems: "center",
    },
    connectedBubble: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: "#82d074",
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -50 }],
    },
    disconnectedBubble: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: "#df3232",
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -50 }],
    },
    text: {
        color: "white",
        fontWeight: 'bold',
    },
});
