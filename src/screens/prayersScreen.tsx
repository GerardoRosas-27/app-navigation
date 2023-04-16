import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Breadcrumb from '../components/Breadcrumb';
import { getPrayerRandom } from '../services/prayersService';
import { randomOrderArray, transformObjetToArrayPrayer } from '../commons/helpers/prayersHelper';
import { Prayers } from '../models/prayersModel';
import MessageModal from '../components/MessageModal';

type MessageType = 'success' | 'error';
type BreadcrumbType = 'prayersRandom' | 'prayersCompleted';

const PrayersScreen: React.FC = () => {
  const initialPrayer: Prayers = {
    id: 0,
    subject: '',
    verb: '',
    directObject: '',
    indirectObject: ''
  }
  //state for prayers
  const [prayer, setprayer] = useState<string[]>([]);
  const [prayerCompleted, setprayerCompleted] = useState<string[]>([]);
  const [selectedPrayerRandom, setSelectedPrayerRandom] = useState<Prayers>(initialPrayer);
  const [contPrayerSuccess, setContPrayerSuccess] = useState<number>(0);
  const [colorCont, setColorCont] = useState<string>('#138aec');
  //state for modal messages
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<MessageType>('success');

  const handleBreadcrumbClick = (text: string, origin: BreadcrumbType) => {
    if (origin === 'prayersRandom') {
      setprayer(prevState => prevState.filter(value => value !== text));
      setprayerCompleted(prevState => [...prevState, text]);
    }
    if (origin === 'prayersCompleted') {
      setprayerCompleted(prevState => prevState.filter(value => value !== text));
      setprayer(prevState => [...prevState, text]);
    }
  };

  const handleClickValidatePrayer = () => {
    let stringPrayer = selectedPrayerRandom.subject + ' ' + selectedPrayerRandom.verb + ' ' + selectedPrayerRandom.directObject + ' ' + selectedPrayerRandom.indirectObject;
    let completedString = prayerCompleted.join(" ").trim();
    console.log("completedString: " + completedString + ' || ' + 'stringPrayer: ' + stringPrayer);
    if (completedString === stringPrayer) {
      setContPrayerSuccess(item => item + 1);
      handleShowSuccessMessage();
    } else {
      setContPrayerSuccess(item => item - 1);
      handleShowErrorMessage();
    }
  }

  const handleShowSuccessMessage = () => {
    setShowModal(true);
    setModalMessage('¡Oración correcta!');
    setModalType('success');
  };

  const handleShowErrorMessage = () => {
    setShowModal(true);
    setModalMessage('¡Error, Oración incorrecta!');
    setModalType('error');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Actualizar el color del texto cuando cambia contPrayerSuccess
  useEffect(() => {
    if (contPrayerSuccess >= 0) {
      setColorCont('#138aec');
    } else {
      setColorCont('#e34646');
    }
  }, [contPrayerSuccess]);

  useEffect(() => {
    (async () => {
      let resultPrayer = await getPrayerRandom();
      if (resultPrayer) {
        setSelectedPrayerRandom(resultPrayer);
        console.log(resultPrayer)
        let prayerArray = transformObjetToArrayPrayer(resultPrayer)
        prayerArray.shift()
        prayerArray = randomOrderArray(prayerArray)
        console.log(prayerArray)
        setprayer(prayerArray)
      }
    })();

  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.contView}>
        <Text style={{ ...styles.contText, color: colorCont }}>Cont: {contPrayerSuccess}</Text>
      </View>

      <Breadcrumb origin={'prayersCompleted'} path={prayerCompleted} onBreadcrumbClick={handleBreadcrumbClick} />

      <View style={{ marginVertical: 20 }}>
        <Button
          title="Validate Prayer"
          onPress={handleClickValidatePrayer}
        />
      </View>
      <Breadcrumb origin={'prayersRandom'} path={prayer} onBreadcrumbClick={handleBreadcrumbClick} />

      <MessageModal
        visible={showModal}
        message={modalMessage}
        type={modalType}
        onClose={handleCloseModal}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contView: {
    flex: .2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contText: {
    fontSize: 30
  }
});
export default PrayersScreen;
