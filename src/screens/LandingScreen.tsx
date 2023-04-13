import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    navigation: any
}

const LandingScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.countContainer}>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Gramatica')}>
                <Text>Gramatica</Text>
            </TouchableOpacity>
        </View>
    )
}
export default LandingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#5fbcf3',
        padding: 10,
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
});
