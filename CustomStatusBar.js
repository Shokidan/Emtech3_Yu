import React from 'react';
import { View, StyleSheet, Platform, StatusBar, Text } from 'react-native';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';

export default class Status extends React.Component {
    state = {
        info: 'none', // Set initial connectivity status
    };

    componentDidMount() {
        // Subscribe to network state changes
        this.unsubscribe = NetInfo.addEventListener(state => {
            this.setState({ info: state.type }); // Update state with current connectivity type
        });

        // Fetch initial network state
        NetInfo.fetch().then(state => {
            this.setState({ info: state.type });
        });
    }

    componentWillUnmount() {
        // Unsubscribe from network state changes
        this.unsubscribe();
    }

    render() {
        const { info } = this.state;
        const isConnected = info !== 'none'; // Determine if connected
        const backgroundColor = isConnected ? '#c7eec3' : 'red'; // Set background color based on connection status

        // Define the StatusBar based on connectivity
        const statusBar = (
            <StatusBar
                backgroundColor={backgroundColor} // Set status bar background color
                barStyle={isConnected ? 'dark-content' : 'light-content'} // Set bar style based on connectivity
                animated={false} // Set animated to false
            />
        );

        // Define the message container
        const messageContainer = (
            <View style={styles.messageContainer}>
                {statusBar}
                {!isConnected && (
                    <MessageContainer>
                        <View style={styles.bubble}>
                            <Text style={styles.text}>No network connection</Text>
                        </View>
                    </MessageContainer>
                )}
            </View>
        );

        // Return the appropriate view based on platform
        return (
            <View style={[styles.status, { backgroundColor }]}>
                {messageContainer}
            </View>
        );
    }
}

// Define MessageContainer as a functional component
const MessageContainer = ({ children }) => {
    return <View style={styles.messageWrapper}>{children}</View>;
};

// Get the status bar height
const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height: statusHeight + 80, // Adjusted to include additional height if necessary
    },
    messageContainer: {
        flex: 1,
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 20, // Adjust padding to avoid overlap with status bar
        left: 0,
        right: 0,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageWrapper: {
        marginBottom: 10, // Space between messages
        marginTop: 10,
    },
    bubble: {
        backgroundColor: 'rgba(255, 0, 0, 0.8)', // Semi-transparent red for the bubble
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        color: 'white', // White text color for the bubble
        fontSize: 16,
        textAlign: 'center',
    },
});

