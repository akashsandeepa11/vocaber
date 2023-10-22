import { View, Text, Image, StatusBar, Pressable, Switch } from "react-native";
import React, { useDebugValue, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { signOut } from "../store/reducers/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Feather } from "@expo/vector-icons";
import LanguageSelectorModal from "../modals/LanguageSelectorModal";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [language, setLanguage] = useState({ id: 2, name: "sinhala" });

  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

  const toggleModalLanguage = () => {
    setLanguageModalVisible(!isLanguageModalVisible);
  };

  // toggle button functions
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const signOutFunc = async () => {
    dispatch(signOut());
    await AsyncStorage.removeItem("@user");
  };

  return (
    <View className=" flex-1">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View className="bg-[#f0f0f0]">
        <View className="bg-white m-2 rounded-[24px] flex-row p-4">
          <View>
            <Image
              source={require("./../../assets/cograts_img.png")}
              className="w-[70] h-[70] rounded-full "
            />
          </View>
          <View className="ml-4 justify-center">
            <Text className="font-bold text-2xl">Akash sandeepa</Text>
            <Text>akashsandeepa@gmail.com</Text>
          </View>
        </View>

        {/* Pro */}
        <View>
          <Text></Text>
        </View>
      </View>

      <View className="bg-white m-2 rounded-[24px] p-4">
        <Text className="text-[18px] font-semibold">Notification settings</Text>
        <View className=" justify-between items-center flex-row">
          <Text className="text-[18px] font-normal">Get new word</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#1e6aca" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View className=" justify-between items-center flex-row">
          <Text className="text-[18px] font-normal">Subscription Upates</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#1e6aca" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View className=" justify-between items-center flex-row">
          <Text className="text-[18px] font-normal">All notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#1e6aca" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <View className="bg-white m-2 rounded-[24px] p-4">
        <Text className="text-[18px] font-semibold">Your Language</Text>

        <Pressable
          onPress={() => toggleModalLanguage()}
          className="border-[1px] items-center p-4 mt-3 rounded-xl border-[#1e6aca] flex-row"
        >
          <Feather name="check" size={32} color="#1e6aca" />
          <Text className="font-bold text-2xl ml-6">{language.name}</Text>
        </Pressable>
      </View>
      <View className="items-center">
        <Pressable
          className=" bg-[#1e6aca] w-[130px] justify-center items-center p-4 rounded-xl"
          onPress={() => signOutFunc()}
        >
          <Text className="text-white  font-bold text-[16px] ">Sign Out</Text>
        </Pressable>
      </View>
      <LanguageSelectorModal
        isModalVisible={isLanguageModalVisible}
        toggleModal={toggleModalLanguage}
        language={language}
        setLanguage={setLanguage}
      />
    </View>
  );
}
