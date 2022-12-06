import React from "react";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";

export default function Home({}) {
  return (
    <>
      <View className="">
        <ImageBackground
          resizeMode="cover"
          source={require("../assets/homebg.png")}
          style={{ opacity: 0.2 }}
        >
          <SafeAreaView>
            <Text className="text-2xl">Set up your space easily</Text>
          </SafeAreaView>
        </ImageBackground>
      </View>
      <Text>from Home</Text>
    </>
  );
}
