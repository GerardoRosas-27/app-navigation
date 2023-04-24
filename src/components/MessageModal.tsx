import React from 'react';
import { View, Modal, Text, StyleSheet, Button } from 'react-native';

type MessageType = 'success' | 'error';

type Props = {
  message: string;
  type: MessageType;
  visible: boolean;
  onClose: (next: boolean) => void;
  onReplay: (next: boolean) => void;
};

const MessageModal: React.FC<Props> = ({ message, type, visible, onClose, onReplay }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      default:
        return '#fff';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return '#fff';
      case 'error':
        return '#fff';
      default:
        return '#000';
    }
  };
  let numColumns = type === 'success' ? 2 : 1;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
        <Text style={[styles.message, { color: getTextColor() }]}>{message}</Text>
        <View style={styles.containerRow}>
          <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
            <Button title={type === 'success' ? 'Next' : 'Clouse'} onPress={() => onClose(type === 'success' ? true : false)} />
          </View>
          {type === 'success' &&
            <View style={{ width: `${100 / numColumns}%`, ...styles.containerColumm }} >
              <Button
                title="Replay"
                onPress={() => onReplay(true)}
              />
            </View>
          }

        </View>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    maxWidth: '80%',
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  containerRow: {
    height: '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  containerColumm: {
    height: 100,
    paddingHorizontal: 5
  },
  contentText: {
    backgroundColor: 'red',
    height: '100%'
  }
});

export default MessageModal;
