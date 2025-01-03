import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const emojiData = [
  { emoji: '😊', text: 'You are feeling happy! Stay positive.' },
  { emoji: '😔', text: 'It’s okay to feel down. Take a deep breath.' },
  { emoji: '😠', text: 'Anger is natural. Try meditation to calm down.' },
  { emoji: '😴', text: 'Feeling tired? Rest and recharge.' },
  { emoji: '🤔', text: 'Feeling thoughtful? Reflect on your day.' },
];

const FeelingPopup = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [emojiClicked, setEmojiClicked] = useState(false);

  const handleEmojiClick = (text) => {
    setMessage(text); // Set the message to be displayed
    setEmojiClicked(true); // Hide emojis after a click
  };

  return (
    <View style={styles.popupContainer}>
      <View style={styles.popupContent}>
        <Text style={styles.title}>How are you feeling?</Text>
        {!emojiClicked ? (
          <View style={styles.emojiContainer}>
            {emojiData.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleEmojiClick(item.text)}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.message}>{message}</Text>
        )}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  emoji: {
    fontSize: 40,
    marginHorizontal: 10,
  },
  message: {
    fontSize: 16,
    marginTop: 20,
    color: '#333',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FeelingPopup;