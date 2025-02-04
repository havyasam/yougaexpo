import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  Keyboard,
  Image
} from "react-native";
import { Toaster } from "sonner-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { toast } from "sonner-native";
import { useAuth } from "../context/UserContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "","",""]);
  const [isOtpVisible, setIsOtpVisible] = useState(true);
  const navigation = useNavigation();
  const { login } = useAuth(); 
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [containerBottom, setContainerBottom] = useState("3%");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      setContainerBottom("-38%"); // Adjust the bottom position when keyboard is visible
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      setContainerBottom("3%"); // Reset the bottom position when keyboard is hidden
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleGetOtp = async () => {
    Keyboard.dismiss()
    try {
      const response = await fetch(
        "https://youga-server.onrender.com/api/routes/native/v1/login/request-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setIsOtpVisible(true);
        toast.success("OTP Sent", {
          description: "An OTP has been sent to your email.",
        });
      } else {
        const error = await response.json();
        Alert.alert("Error", error.message || "Failed to send OTP.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await fetch(
        "https://youga-server.onrender.com/api/routes/native/v1/login/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: otp.join("") }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        toast.success("Login Successful", {
          description: "You have been logged in successfully.",
        });
        login(token);
      } else {
        const error = await response.json();
        Alert.alert("Error", error.message || "Invalid OTP.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error);
    }
  };

  const handleChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    // Automatically focus on the next input if text is entered
    if (text && index < otp.length - 1) {
      inputs[index + 1]?.focus();
    }
  };

  const inputs = [];

  return (
    <View style={styles.container}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Text style={styles.headerText}>Namaste!</Text>
        <Image
          style={styles.image}
          source={require('../images/wave.png')}
        />
      </View>

      {/* Main Form Container */}
      <View style={[styles.formContainer, { bottom: containerBottom }]}>
        <Text style={styles.title}>Registered Email</Text>

        
        <TextInput
          style={styles.input}
          
          placeholder="ken@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Get OTP Button */}
        <TouchableOpacity style={styles.customButton} onPress={handleGetOtp}>
          <Text style={styles.customButtonText}>Get OTP</Text>
        </TouchableOpacity>

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
                  ref={(input) => (inputs[index] = input)}
                />
              ))}
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleOtpSubmit}>
              <Text style={styles.submitButtonText}>Submit OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.separator}></View>

        {/* Signup Redirect */}
        <Text style={styles.signupText}>Don't have an account yet?</Text>
        <TouchableOpacity style={styles.submitButton1}>
          <Text style={styles.submitButtonText}>Register</Text>
        </TouchableOpacity>

        <Toaster />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
 
    
   
  },
  headerText: {
    fontFamily: 'Yatra',
    fontSize: 40,
    color: '#F9862D',
    position: 'absolute',
    top:10,
    paddingHorizontal:14
    
  },
  image: {
    width: '100%',
    height: 380,
    resizeMode: 'cover',
  },
  formContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#fff',
    paddingVertical: 20,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 10,
    marginTop:40
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#E6E6E6',
    
    marginBottom: 10,
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
  otpContainer: {
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
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
  submitButton: {
    marginTop: 25,
    width: '65%',
    height: 45,
    backgroundColor: '#F9862D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft: 60,
  },
  submitButton1: {
    marginTop: 15,
    width: '65%',
    height: 45,
    backgroundColor: '#F9862D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft: 55,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  separator: {
    backgroundColor: '#E6E6E6',
    width: '100%',
    height: 2,
    marginVertical: 40,
  },
  signupText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;