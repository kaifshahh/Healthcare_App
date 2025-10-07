// Hospital_card.js
import { View, Text, Image } from "react-native";
import React from "react";
import { Icon } from "react-native-paper";

const Hospital_card = ({
  name,
  address,
  specialization,
  image,
  timing,
  id,
}) => {
  return (
    <View className=" mt-4 " key={id}>
      <View className="border-1 border-yellow-400 p-1 flex flex-row ">
        <View className="border-1 border-gray-700 mr-2 rounded-xl bg-white ">
          <Image
            className="rounded-xl"
            source={{
              uri:
                image ||
                "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
            height={120}
            width={120}
          />
        </View>

        <View className="border-1 border-purple-700 flex justify-between py-2 px-2">
          <View>
            <Text className="text-2xl">{name}</Text>
            <Text className="text-l opacity-70 text-gray-500">{address}</Text>
            <Text>{specialization}</Text>
          </View>
          <View className="flex flex-row items-center ">
            <Icon source="clock" size={20} />
            <Text className="text-xl ml-2">{timing}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Hospital_card;
