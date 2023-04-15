import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Breadcrumb from '../components/Breadcrumb';
import { getPrayerRandom } from '../services/prayersService';
import { randomOrderArray, transformObjetToArrayPrayer } from '../commons/helpers/prayersHelper';


const PrayersScreen: React.FC = () => {

  const [prayer, setprayer] = useState<string[]>([]);
  const [selectedText, setSelectedText] = useState('');

  const handleBreadcrumbClick = (text: string) => {
    setSelectedText(text);
  };

  useEffect(() => {
    (async () => {
      let resultPrayer = await getPrayerRandom();
      if (resultPrayer) {
        let prayerArray =  transformObjetToArrayPrayer(resultPrayer)
        prayerArray.shift()
        prayerArray =  randomOrderArray(prayerArray)
        console.log(prayerArray)
        setprayer(prayerArray)
      }
    })();

  }, [])


  return (
    <View style={styles.container}>
      <Breadcrumb path={prayer} onBreadcrumbClick={handleBreadcrumbClick}/>
      <Text>Selected: {selectedText}</Text>
      <Breadcrumb path={prayer}  onBreadcrumbClick={handleBreadcrumbClick}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PrayersScreen;
