import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { WordModel } from '../models/verbModel';
type VerbsTensen = 'Paset' | 'Present' | 'Future';
interface Props {
  data: WordModel[];
  onVerbsClick: (data: WordModel, origin: VerbsTensen) => void;
  origin: VerbsTensen
}

const InfiniteList: React.FC<Props> = ({ data, onVerbsClick, origin }) => {
  const [words, setWords] = React.useState<WordModel[]>(data);

  const handleSelect = (data: WordModel, origin: VerbsTensen) => {
    onVerbsClick(data, origin)
    console.log("data: ", data);
    const newWords = words.map((word) => {
      if (word.id === data.id) {
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
      <TouchableOpacity onPress={() => handleSelect(item, origin)} style={itemStyle}>
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