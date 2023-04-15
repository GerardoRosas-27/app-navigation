import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

interface BreadcrumbProps {
    path: string[];
    onBreadcrumbClick: (text: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onBreadcrumbClick }) => {

    const handleClick = (text: string) => {
        onBreadcrumbClick(text);
    };

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={path}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => handleClick(item)}>
                        <Text style={styles.buttonText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: '#EDEDED',
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
    },
    buttonText: {
        color: '#333',
        fontSize: 14,
    },
});

export default Breadcrumb;
