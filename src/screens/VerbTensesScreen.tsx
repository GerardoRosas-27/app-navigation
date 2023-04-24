import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import InfiniteList from '../components/InfiniteList';
import { WordModel } from '../models/verbModel';
import { getFutureVerbs, getPastTenses, getVerbPresents } from '../services/verbsService';
import AlertToast from '../components/AlertToast';
type VerbsTensen = 'Paset' | 'Present' | 'Future';
type AlertToastType = 'success' | 'error' | 'hiden';
const VerbTensesScreen = () => {

    let initialVerb: WordModel = {
        id: 0,
        value: '',
        translate: ''
    }

    const [pastTenseList, setPastTenseList] = useState<WordModel[]>([]);
    const [verbPresentList, setVerbPresentList] = useState<WordModel[]>([]);
    const [futureVerbsList, setFutureVerbsList] = useState<WordModel[]>([]);

    const [selectPastTense, setSelectPastTense] = useState<WordModel>(initialVerb);
    const [selectVerbPresent, setSelectVerbPresent] = useState<WordModel>(initialVerb);
    const [selectFutureVerbs, setselectFutureVerbs] = useState<WordModel>(initialVerb);

    const [showToast, setShowToast] = useState<AlertToastType>('hiden'); // variable de estado para controlar si el Toast debe ser mostrado

    const numColumns = 3;
    const handleSelectVerb = (data: WordModel, origin: VerbsTensen) => {
        switch (origin) {
            case 'Paset':
                setSelectPastTense(data)
                break;
            case 'Present':
                setSelectVerbPresent(data)
                break;
            case 'Future':
                setselectFutureVerbs(data)
                break;
            default:
                reload()
                break;
        }

    }
    const reload = () => {
        setSelectPastTense(initialVerb)
        setSelectVerbPresent(initialVerb)
        setselectFutureVerbs(initialVerb)
    }
    const resetToast = () => {
        setShowToast('hiden');
      };
    useEffect(() => { // detecte change value: selectPastTense, selectVerbPresent, selectFutureVerbs
        console.log('diferente de 0: ', selectPastTense, selectVerbPresent, selectFutureVerbs);
        //delete equals verbs tense
        if (selectPastTense.id !== 0 && selectVerbPresent.id !== 0 && selectFutureVerbs.id !== 0) {
            if (selectPastTense.id === selectVerbPresent.id && selectPastTense.id === selectFutureVerbs.id) {
                setPastTenseList(item => item.filter(value => value.id !== selectPastTense.id));
                setVerbPresentList(item => item.filter(value => value.id !== selectVerbPresent.id));
                setFutureVerbsList(item => item.filter(value => value.id !== selectFutureVerbs.id));
                setShowToast('success');
                reload()
            } else {
                setShowToast('error');
                reload()
            }
        }

    }, [selectPastTense, selectVerbPresent, selectFutureVerbs])

    useEffect(() => {
        (async () => {
            let result1 = await getPastTenses();
            let result2 = await getVerbPresents();
            let result3 = await getFutureVerbs();
            if (result1 && result2 && result3) {
                setPastTenseList(result1);
                setVerbPresentList(result2);
                setFutureVerbsList(result3);
            }
        })();
    }, [])


    return (

        <View style={styles.containerRow}>
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
                <Text>Translate: {selectPastTense.translate}</Text>
                <Text>Response: {selectPastTense.value}</Text>
                <InfiniteList data={pastTenseList} onVerbsClick={handleSelectVerb} origin='Paset' />
            </View>
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
                <Text>Translate: {selectVerbPresent.translate}</Text>
                <Text>Response: {selectVerbPresent.value}</Text>
                <InfiniteList data={verbPresentList} onVerbsClick={handleSelectVerb} origin='Present' />
            </View>
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
                <Text>Translate: {selectFutureVerbs.translate}</Text>
                <Text>Response: {selectFutureVerbs.value}</Text>
                <InfiniteList data={futureVerbsList} onVerbsClick={handleSelectVerb} origin='Future' />
            </View>
            {showToast !== 'hiden' ? showToast === 'success' ? <AlertToast message="Operación exitosa" type="success" onClose={resetToast} /> : <AlertToast message="Ocurrió un error" type="error" onClose={resetToast} /> : null}

        </View>
    )
}

const styles = StyleSheet.create({
    containerRow: {
        height: '100%',
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
export default VerbTensesScreen;
