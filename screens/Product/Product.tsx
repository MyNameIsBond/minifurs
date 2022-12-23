import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
export default function Product({ route }) {
  const navigation = useNavigation();
  return (
    <View>
      <SafeAreaView>
        <TouchableOpacity
          className="bg-gray-900 w-12 h-12 flex items-center justify-center rounded-xl m-1"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <Text>{route.params.id}</Text>
    </View>
  );
}
