import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
type BreadcrumbType = 'prayersRandom' | 'prayersCompleted';
interface BreadcrumbProps {
    path: string[];
    onBreadcrumbClick: (text: string, origin: BreadcrumbType) => void;
    origin: BreadcrumbType
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onBreadcrumbClick, origin }) => {

    const handleClick = (text: string, origin: BreadcrumbType) => {
        onBreadcrumbClick(text, origin);
    };

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={path}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => handleClick(item, origin)}>
                        <Text style={styles.buttonText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        backgroundColor: '#EDEDED',
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    buttonText: {
        color: '#333',
        fontSize: 14,
    },
});

export default Breadcrumb;
