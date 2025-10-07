import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";

import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import CameraModal from "../components/general/CameraModal";
import Loader from "../components/general/Loader";

const NutriSnap = () => {
  const [showModal, setshowModal] = useState(false);
  const [image, setimage] = useState("");
  const [foodData, setfoodData] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);

  useEffect(() => {
    console.log("Updated image:", image);
  }, [image]);

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log(status);

    if (status == "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("data from camera", result.assets[0].uri);
      if (!result.canceled) {
        setimage(result.assets[0].uri);
      } else {
        console.log("Image capture cancelled");
      }
      setshowModal(!showModal);
    }
  };

  const uploadImage = async () => {
    try {
      setloading(true);
      const newImageUri = "file:///" + image.split("file:/").join("");
      const file = {
        name: newImageUri.split("/").pop(),
        uri: newImageUri,
        type: "image/jpeg",
      };
      const formData = new FormData();
      formData.append("image", file);
      console.log("this is form data", formData);

      const { data } = await axios.post(
        "http://172.20.10.8:6969/api/v1/upload-file",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Raw response:", data);

      // Parse the string response and create a clean object
      let parsedData;
      if (typeof data.data === "string") {
        // Clean the string by removing extra formatting and backticks
        let cleanString = data.data.trim();

        // Remove backticks and "```" if present
        cleanString = cleanString
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        // Find the JSON part (between the first { and last })
        const jsonStart = cleanString.indexOf("{");
        const jsonEnd = cleanString.lastIndexOf("}");

        if (jsonStart !== -1 && jsonEnd !== -1) {
          cleanString = cleanString.substring(jsonStart, jsonEnd + 1);
        }

        console.log("Cleaned string:", cleanString);
        parsedData = JSON.parse(cleanString);
      } else {
        parsedData = data.data;
      }

      // Create a clean food object
      const cleanFoodData = {
        name: parsedData?.Name || "Unknown Food",
        status: parsedData?.status || "Unknown",
        calories: parsedData?.est_calories || "Not available",
        description: parsedData?.description || "No description available",
        diet: parsedData?.diet || "Not specified",
        xp: parsedData?.XP || "Not available",
      };

      console.log("Parsed data:", parsedData);
      console.log("Clean food object:", cleanFoodData);

      setfoodData(cleanFoodData);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to analyze the image. Please try again.");
    }
  };

  const handleGallery = () => {};

  return (
    <ScrollView className="pr-2 overflow-x-scroll flex-1">
      <View className=" pt-10 ">
        <Text
          className="text-center text-xl mb-2 font-semibold"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          {" "}
          Scan What you Eat !{" "}
        </Text>
        <View className="justify-center items-center">
          <TouchableOpacity
            onPress={() => setshowModal(!showModal)}
            className="p-2 h-10 w-64  bg-green-300 border-2 border-red-300 rounded-lg shadow-lg"
          >
            <Text className="text-center ">Select photo</Text>
          </TouchableOpacity>
        </View>

        <CameraModal
          handleCamera={handleCamera}
          handleGallery={handleGallery}
          showModal={showModal}
          setshowModal={setshowModal}
        />
        <View className="mt-4 p-2">
          {image && (
            <View className="p-2 my-2 justify-center items-center">
              <Image height={200} width={300} source={{ uri: `${image}` }} />
              <Button className="bg-white mt-8 w-64 " onPress={uploadImage}>
                Analyze
              </Button>
            </View>
          )}

          {foodData && (
            <View className="w-full bg-white py-2 px-2 rounded-lg shadow-lg my-2">
              <Text className="text-xl font-bold mb-2">Food Details:</Text>

              <View className="flex flex-row gap-2 items-center mb-2">
                <Text className="text-base font-medium">Name:</Text>
                <Text className="text-base">{foodData.name}</Text>
              </View>

              <View className="flex flex-row gap-2 items-center mb-2">
                <Text className="text-base font-medium">Status:</Text>
                <Text className="text-base">{foodData.status}</Text>
              </View>

              <View className="flex flex-row gap-2 items-center mb-2">
                <Text className="text-base font-medium">Est Calories:</Text>
                <Text className="text-base">{foodData.calories}</Text>
              </View>

              <View className="mb-2">
                <Text className="text-base font-medium mb-2">Description:</Text>
                <Text className="text-base overflow-wrap break-words">
                  {foodData.description}
                </Text>
              </View>

              <View className="flex flex-row gap-2 items-center mb-2">
                <Text className="text-base font-medium">Diet:</Text>
                <Text className="text-base">{foodData.diet}</Text>
              </View>

              <View className="flex flex-row gap-2 items-center mb-2">
                <Text className="text-base font-medium">Health Score:</Text>
                <Text className="text-base">{foodData.xp}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      {loading ? <Loader /> : null}
    </ScrollView>
  );
};

export default NutriSnap;
