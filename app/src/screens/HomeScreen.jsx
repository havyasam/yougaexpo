import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getAsyncItem, saveAsyncItem } from '../utils/asyncStorageService';
import FeelingPopup from '../Components/feeling';

const HomeScreen = ({ navigation }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkLastShown = async () => {
      const lastShownDate = await getAsyncItem('lastShownDate');
      const today = new Date().toDateString();

      if (lastShownDate !== today) {
        setShowPopup(true);
        await saveAsyncItem('lastShownDate', today);
      }
    };

    checkLastShown();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.namaste}>Namaste</Text>
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('DailyChecklistScreen')}
        >
          <Text style={styles.boxText}>Perfect Daily Routine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('TodaysSessionScreen')}
        >
          <Text style={styles.boxText}>Today's Session</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('MeditationScreen')}
        >
          <Text style={styles.boxText}>Meditation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('SentimentAnalysisScreen')}
        >
          <Text style={styles.boxText}>pour your heart and speak</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('PeacefulSoundsScreen')}
        >
          <Text style={styles.boxText}>Peaceful Sounds</Text>
        </TouchableOpacity>
      </View>
      {showPopup && <FeelingPopup onClose={() => setShowPopup(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  namaste: {
    fontSize: 40,
    marginBottom: 30,
    color: '#333',
    fontFamily: 'sans-serif',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  box: {
    width: '45%',
    height: 100,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  boxText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
