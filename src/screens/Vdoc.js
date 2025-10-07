import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// Static responses for different types of queries
const staticResponses = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    response:
      "Hello! I'm your virtual medical assistant. How can I help you today? Please describe your symptoms or health concerns.",
  },
  {
    keywords: ["headache", "head pain", "migraine"],
    response:
      "**Symptoms:** Headache/Head pain\n**Possible Causes:** Tension, dehydration, stress, eye strain, or migraine\n**Seriousness:** Usually mild to moderate\n**Medication:** Over-the-counter pain relievers like acetaminophen or ibuprofen\n**Diet:** Stay hydrated, avoid caffeine and alcohol\n**Precautions:** Rest in a dark room, apply cold compress. If severe or persistent, consult a doctor.",
  },
  {
    keywords: ["fever", "temperature", "hot", "chills"],
    response:
      "**Symptoms:** Fever/High temperature\n**Possible Causes:** Viral or bacterial infection\n**Seriousness:** Monitor closely, seek medical attention if above 103°F (39.4°C)\n**Medication:** Acetaminophen or ibuprofen to reduce fever\n**Diet:** Increase fluid intake, light foods like soup and toast\n**Precautions:** Rest, monitor temperature regularly. See a doctor if fever persists over 3 days.",
  },
  {
    keywords: ["cough", "coughing", "throat"],
    response:
      "**Symptoms:** Cough/Throat irritation\n**Possible Causes:** Common cold, allergies, or respiratory infection\n**Seriousness:** Usually mild, monitor for breathing difficulties\n**Medication:** Cough drops, honey, or over-the-counter cough syrup\n**Diet:** Warm liquids, honey tea, avoid dairy if producing mucus\n**Precautions:** Stay hydrated, use humidifier. See doctor if cough persists over 2 weeks or includes blood.",
  },
  {
    keywords: ["stomach", "nausea", "vomit", "digestive", "belly"],
    response:
      "**Symptoms:** Stomach issues/Nausea\n**Possible Causes:** Food poisoning, stress, viral infection, or dietary issues\n**Seriousness:** Usually mild, monitor for dehydration\n**Medication:** Anti-nausea medication if severe, probiotics\n**Diet:** BRAT diet (Bananas, Rice, Applesauce, Toast), clear fluids\n**Precautions:** Stay hydrated, rest. See doctor if symptoms persist over 48 hours or severe dehydration occurs.",
  },
  {
    keywords: ["back pain", "spine", "lower back"],
    response:
      "**Symptoms:** Back pain\n**Possible Causes:** Muscle strain, poor posture, or herniated disc\n**Seriousness:** Usually mild to moderate, concerning if radiating to legs\n**Medication:** Anti-inflammatory drugs like ibuprofen\n**Diet:** Anti-inflammatory foods, maintain healthy weight\n**Precautions:** Apply heat/ice, gentle stretching, proper posture. See doctor if pain radiates to legs or persists.",
  },
  {
    keywords: ["chest pain", "heart", "breathing"],
    response:
      "**Symptoms:** Chest pain/Breathing issues\n**Possible Causes:** Various causes from muscle strain to serious cardiac issues\n**Seriousness:** POTENTIALLY SERIOUS - Seek immediate medical attention\n**Recommendation:** Please consult a cardiologist or visit emergency room immediately\n**Precautions:** Do not ignore chest pain, especially if accompanied by shortness of breath, sweating, or arm pain.",
  },
  {
    keywords: ["skin", "rash", "itch", "allergy"],
    response:
      "**Symptoms:** Skin irritation/Rash\n**Possible Causes:** Allergic reaction, contact dermatitis, or skin condition\n**Seriousness:** Usually mild unless widespread or breathing affected\n**Medication:** Antihistamines, topical corticosteroid cream\n**Diet:** Avoid known allergens, increase water intake\n**Precautions:** Avoid scratching, use gentle soaps. See dermatologist if severe or persistent.",
  },
];

// Default response for unrecognized queries
const defaultResponse =
  "I understand you have a health concern. While I can provide general information, it's important to consult with a healthcare professional for proper diagnosis and treatment. Please describe your specific symptoms for more targeted guidance, or consider scheduling an appointment with a doctor.";

const Vdoc = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Initial greeting message
    const initialMessage = [
      {
        _id: uuidv4(),
        text: "Hello! I'm your virtual medical assistant. I can help provide general health information and guidance. Please describe your symptoms or health concerns, and I'll do my best to assist you. Remember, this is for informational purposes only and doesn't replace professional medical advice.",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Medical Assistant",
          avatar: require("../../assets/svg/docAvatar.png"),
        },
      },
    ];

    setMessages(initialMessage);
  }, []);

  const getStaticResponse = (userText) => {
    const lowercaseText = userText.toLowerCase();

    // Find matching response based on keywords
    for (const responseObj of staticResponses) {
      if (
        responseObj.keywords.some((keyword) => lowercaseText.includes(keyword))
      ) {
        return responseObj.response;
      }
    }

    // Return default response if no keywords match
    return defaultResponse;
  };

  const simulateTyping = (responseText) => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const responseMessage = [
        {
          _id: uuidv4(),
          text: responseText,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "Medical Assistant",
            avatar: require("../../assets/svg/docAvatar.png"),
          },
        },
      ];

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, responseMessage)
      );
      setLoading(false);
    }, 1500); // 1.5 second delay to simulate real response time
  };

  const onSend = useCallback((messages = []) => {
    // Add user message immediately
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    // Get static response and simulate typing
    const userMessage = messages[0]?.text;
    const staticResponse = getStaticResponse(userMessage);
    simulateTyping(staticResponse);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <GiftedChat
          isTyping={isLoading}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          showUserAvatar
          user={{
            _id: 2,
            avatar: require("../../assets/svg/userAvatar.png"),
            name: "User",
          }}
          placeholder="Type your health concern here..."
          alwaysShowSend
          scrollToBottom
          renderUsernameOnMessage
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default Vdoc;
