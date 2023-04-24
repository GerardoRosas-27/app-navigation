import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
interface Props {
  navigation: any
}
const GramaticaScreen = ({navigation}:Props) => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <View style={styles.container}>
        <Button
        title="Crear oraciones"
        onPress={() => navigation.navigate('Oraciones')}
      />
       <Button
        title="Tiempos verbales"
        onPress={() => navigation.navigate('Verbos')}
      />
      <View style={styles.countContainer}>
        <Text>Errors: {count}</Text>
      </View>
 
    </View>
  );
};

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

export default GramaticaScreen;