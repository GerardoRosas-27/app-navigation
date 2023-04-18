import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const SettingsScreen = () => {

    const { width, height } = Dimensions.get('window');
    const numColumns = width > 411 ? 4 : 3;
    console.log('numColumns ', numColumns)

    return (


        <View style={styles.containerRow}>
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
                <View style={styles.contentText} >
                    <Text>col 1</Text>
                </View>
            </View>
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
                <View style={styles.contentText} >
                    <Text>col 2</Text>
                </View>
            </View>
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
                <View style={styles.contentText} >
                    <Text>col 3</Text>
                </View>
            </View>
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
                <View style={styles.contentText} >
                    <Text>col 4</Text>
                </View>
            </View>
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
                <View style={styles.contentText} >
                    <Text>col 5</Text>
                </View>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    containerRow: {
        height: '10%',
        flexDirection: 'row', 
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    containerColumm: {
        height: '100%',
        paddingHorizontal: 5
    },
    contentText: {
        backgroundColor: 'red',
        height: '100%'
    }

});
export default SettingsScreen;
