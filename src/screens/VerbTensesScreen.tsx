import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import InfiniteList from '../components/InfiniteList';
import { WordModel } from '../models/verbModel';
import { getFutureVerbs, getPastTenses, getVerbPresents } from '../services/verbsService';

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

    const numColumns = 3;

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
                <Text>Response: </Text>
                <InfiniteList data={pastTenseList} />
            </View>
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
                <Text>Response: </Text>
                <InfiniteList data={verbPresentList} />
            </View>
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
                <Text>Response: </Text>
                <InfiniteList data={futureVerbsList} />
            </View>

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
