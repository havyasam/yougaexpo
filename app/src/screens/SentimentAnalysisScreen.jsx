import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
} from "react-native";
import { Audio } from "expo-av";
import { SvgUri } from "react-native-svg";
import * as FileSystem from "expo-file-system";

const SentimentAnalysisScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [response, setResponse] = useState("");
  const [animation, setAnimation] = useState(new Animated.Value(1));
  const [buttonText, setButtonText] = useState("Start Recording");
  const [buttonColor, setButtonColor] = useState("green");
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [showRecordingMessage, setShowRecordingMessage] = useState(false);

  const backendURL = "https://your-backend-api.com/analyze"; // Replace with your backend URL

  // Animation setup
  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopAnimation = () => {
    animation.stopAnimation();
  };

  // Start recording audio
  const startRecording = async () => {
    try {
      console.log("Requesting microphone permissions...");
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access microphone is required.");
        console.log("Permission not granted.");
        return;
      }

      console.log("Starting audio recording...");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
      setResponse("");
      setShowThankYouMessage(false);
      setShowAnalyzeButton(false);
      setButtonText("Stop Recording");
      setButtonColor("red");
      startAnimation();
      console.log("Recording started.");

      // Automatically stop the recording after 60 seconds
      setTimeout(stopRecording, 60000); // 60 seconds
      console.log("Recording will stop automatically in 60 seconds.");
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  // Stop recording audio
  const stopRecording = async () => {
    try {
      console.log("Stopping recording...");
      setIsRecording(false);
      stopAnimation();
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording stopped and stored at:", uri);

      // Show "Analyze My Response" button after recording
      setShowAnalyzeButton(true);

      // Show "Thank you" message after 6 seconds if the user hasn't clicked "Analyze My Response"
      setTimeout(() => {
        if (!response) {
          setResponse("Thank you for your response!");
        }
      }, 6000); // 6 seconds
    } catch (err) {
      console.error("Failed to stop recording:", err);
    }
  };

  // Send recorded audio to backend
  const sendAudioToBackend = async (uri) => {
    try {
      console.log("Uploading audio...");
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("Audio file read as Base64:", file.slice(0, 100)); // Show first 100 characters of the Base64 string

      const response = await fetch(backendURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audio: file }),
      });

      const data = await response.json();
      console.log("Response from backend:", data);
      setResponse(data.message || "Analysis complete.");
    } catch (err) {
      console.error("Failed to send audio to backend:", err);
      setResponse("Error processing audio.");
    }
  };

  // Analyze the response when the "Analyze My Response" button is pressed
  const analyzeResponse = () => {
    console.log("Analyzing the response...");
    if (recording) {
      sendAudioToBackend(recording.getURI());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech Sentiment Analysis</Text>

      {/* Animated Icon */}
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: isRecording ? animation : 1 }] },
        ]}
      >
        <SvgUri
          width="80"
          height="80"
          uri="https://upload.wikimedia.org/wikipedia/commons/3/3f/Google_Meet_Logo.svg"
        />
      </Animated.View>

      {/* Start/Stop Recording Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {buttonText}
        </Text>
      </TouchableOpacity>

      {/* Analyze My Response Button */}
      {showAnalyzeButton && (
        <TouchableOpacity
          style={[styles.button, styles.analyzeButton]}
          onPress={analyzeResponse}
        >
          <Text style={styles.buttonText}>Analyze My Response</Text>
        </TouchableOpacity>
      )}

      {/* Response Section */}
      <View style={styles.responseContainer}>
        <TextInput
          style={styles.textArea}
          editable={false}
          multiline={true}
          value={response || "Your sentiment analysis response will appear here."}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f7",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 20,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "green",
  },
  stopButton: {
    backgroundColor: "red",
  },
  analyzeButton: {
    backgroundColor: "yellow",
  },
  buttonText: {
    color: "#000", // Text color should be black for visibility on yellow button
    fontWeight: "bold",
    fontSize: 16,
  },
  responseContainer: {
    width: "100%",
    marginTop: 20,
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    height: 150,
  },
});

export default SentimentAnalysisScreen;
