import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';


type AlertToastType = 'success' | 'error' | 'hiden';
interface ToastProps {
    message: string;
    type: AlertToastType;
    duration?: number;
    onClose?: () => void;
}

const AlertToast: FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
    const [animation] = useState(new Animated.Value(0));
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showToast = () => {
        setVisible(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            timeoutRef.current = setTimeout(() => hideToast(), duration);
        });
    };

    const hideToast = () => {
        clearTimeout(timeoutRef.current!);
        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
            if (onClose) onClose();
        });
    };

    useEffect(() => {
        showToast();
        return () => {
            clearTimeout(timeoutRef.current!);
        };
    }, []);

    const bgColor = type === 'success' ? '#8BC34A' : '#FF5722';

    return (
        <Animated.View style={[styles.toastContainer, { opacity: animation, transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-50, 0] }) }] }]}>
            {visible && (
                <View style={[styles.toastContent, { backgroundColor: bgColor }]}>
                    <Text style={styles.toastMessage}>{message}</Text>
                </View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    toastContent: {
        backgroundColor: '#8BC34A',
        padding: 10,
        borderRadius: 5,
    },
    toastMessage: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default AlertToast;
