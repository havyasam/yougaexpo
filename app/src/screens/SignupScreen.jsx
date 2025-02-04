import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useAuth } from '../context/UserContext'; 
import { toast } from "sonner-native";
import { Toaster } from "sonner-native";
import * as Font from 'expo-font';

import { MaterialIcons } from "@expo/vector-icons"; 
import { RadioButton } from "react-native-paper";

const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpVisible, setIsOtpVisible] = useState(true);
  const [nationality, setNationality] = useState('India');
  const [flexibility, setFlexibility] = useState('flexible');
  const [isOtpClicked, setIsOtpClicked] = useState(false); // State to manage visibility of other fields
  const navigation = useNavigation();
  const { signup } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false); 

  const handleIconPress = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Yatra': require('../fnt/YatraOne-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const handleGetOtp = async () => {
    try {
      const response = await axios.post(
        'https://youga-server.onrender.com/api/routes/native/v1/registration/request-otp',
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setIsOtpVisible(true);
        isOtpClicked(true);
        toast.success("OTP Sent", {
          description: "An OTP has been sent to your email.",
        });
      } else {
        Alert.alert('Error', 'Email not registered.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(
        'https://youga-server.onrender.com/api/routes/native/v1/registration/verify-otp',
        {
          email,
          name: fullName,
          otp: otp.join(''),
          flexibilityLevel: flexibility,
          country: nationality
        }
      );

      if (response.status === 201) {
        const { token, user } = response.data;

        toast.success("SignUp Successful", {
          description: "You have successfully signed up.",
        });

        signup(token, user);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'OTP verification failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while verifying OTP.');
      console.error(error);
    }
  };

  const handleChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <Toaster />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={{ fontFamily: 'Yatra', fontSize: 40, color: '#F9862D' }}>Namaste!</Text>
       <View className='pb-[20px]'> <Text className='mb-[20px]'>Already registered? <View className='mb-[8px]' ><TouchableOpacity onPress={() =>navigation.navigate('Login')}><Text className='text-clr1'>Click here to login</Text></TouchableOpacity></View></Text></View>

        {/* Render fields only if isOtpClicked is false */}
        {!isOtpClicked && (
          <>
            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Joseph Mario"
              value={fullName}
              onChangeText={setFullName}
            />

            {/* Email */}
            

            {/* Nationality */}
            <Text style={styles.label}>Nationality</Text>
            <View style={{ borderWidth: 1, borderColor: "gray", borderRadius: 15, backgroundColor: "#E6E6E6", height: 50, position: 'relative' }}>
              <TouchableOpacity onPress={handleIconPress} style={{ position: 'absolute', left: 292.5, top: '40%', transform: [{ translateY: -10 }] }}>
                <MaterialIcons name="keyboard-arrow-down" size={30} color="#F9862D" />
              </TouchableOpacity>

              {isPickerVisible && (
                <Picker
                  onValueChange={(value) => setNationality(value)}
                  style={styles.picker}
                  dropdownIconColor="#E6E6E6"
                >
                  <Picker.Item label="Select Nationality" value="" />
                  <Picker.Item label="India" value="India" />
                  <Picker.Item label="USA" value="USA" />
                </Picker>
              )}
            </View>

            {/* Flexibility */}
            <Text style={styles.label}>Level of Flexibility</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Group onValueChange={(value) => setFlexibility(value)} value={flexibility}>
                <View style={styles.radioOption}>
                  <RadioButton value="flexible" color="#F9862D" uncheckedColor="#E6E6E6" />
                  <Text style={[styles.radioLabel, flexibility === "flexible" && styles.selectedText]}>I have no pre-existing injury and have good flexibility</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton value="not flexible" color="#F9862D" uncheckedColor="#E6E6E6" />
                  <Text style={[styles.radioLabel, flexibility === "not flexible" && styles.selectedText]}>I have limited flexibility due to my age / injury</Text>
                </View>
              </RadioButton.Group>
            </View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="ken@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Get OTP */}
            <TouchableOpacity style={styles.customButton} onPress={handleGetOtp}>
              <Text style={styles.customButtonText}>Get OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {/* OTP Input */}
        {isOtpVisible && (
          <View style={styles.otpContainer}>
            <Text style={styles.label}>Enter OTP</Text>
            <View style={styles.inputRow}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  style={styles.otpBox}
                  value={value}
                  onChangeText={(text) => handleChange(text, index)}
                  keyboardType="numeric"
                  maxLength={1}
                />
              ))}
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleOtpSubmit}>
              <Text style={styles.submitButtonText}>Submit OTP</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 18,
    
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#E6E6E6',
    marginBottom: 10,
  },
  otpContainer: {
    marginTop: 20,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpBox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#F9862D',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 10,
  },
  customButton: {
    width: 'auto',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  customButtonText: {
    color: '#F9862D',
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9862D',
  },
  submitButton: {
    marginTop: 20,
    width: '100%',
    height: 50,
    backgroundColor: '#F9862D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 700,
  },
  radioGroup: {
    flexDirection: "column",
    padding: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  selectedText: {
    color: "#F9862D",
  },
});

export default SignupScreen;
