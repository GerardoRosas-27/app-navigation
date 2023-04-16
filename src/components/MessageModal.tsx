import React from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';

type MessageType = 'success' | 'error';

type Props = {
  message: string;
  type: MessageType;
  visible: boolean;
  onClose: (next: boolean) => void;
};

const MessageModal: React.FC<Props> = ({ message, type, visible, onClose }) => {
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

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
        <Text style={[styles.message, { color: getTextColor() }]}>{message}</Text>
        <Text style={styles.close} onPress={() => onClose(type === 'success' ? true : false)}>
          {type === 'success' ? 'Next' : 'Clouse'}
        </Text>
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
  close: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default MessageModal;
