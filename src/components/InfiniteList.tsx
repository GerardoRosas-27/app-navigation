import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { WordModel } from '../models/verbModel';
type VerbsTensen = 'prayersRandom' | 'prayersCompleted';
interface Props {
  data: WordModel[];
}

const InfiniteList: React.FC<Props> = ({ data }) => {


  const [words, setWords] = React.useState<WordModel[]>(data);



  const handleSelect = (id: number) => {
    console.log("id: ", id)
    const newWords = words.map((word) => {
      if (word.id === id) {
        return {
          ...word,
          selected: !word.selected,
        };
      } else {
        return word;
      }
    });
    console.log("selected: ", newWords)
    setWords(newWords);
  };

  const renderItem = ({ item }: { item: WordModel }) => {
    const itemStyle = item.selected ? styles.selectedItem : styles.item;
    return (
      <TouchableOpacity onPress={() => handleSelect(item.id)} style={itemStyle}>
        <Text>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setWords(data);
  }, [data]);

  return (
    <FlatList
      data={words}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
  },
  selectedItem: {
    padding: 16,
    backgroundColor: "#2196f3",
  },
});
export default InfiniteList;