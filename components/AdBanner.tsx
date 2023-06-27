import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function AdBanner({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View className="px-4">
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#EFE5D5", "#F2F0E0"]}
        className="items-center flex-row p-4 rounded-xl my-10 w-full"
      >
        <>
          <View>
            <Text className="text-base font-black max-w-xs text-accent-orange">
              {title}
            </Text>
            <Text className="text-accent-orange pt-2 text-sm max-w-[180]">
              {subtitle}
            </Text>
            <Text className="text-sm max-w-[180] pt-3 text-accent-green">
              Coming soon...
            </Text>
          </View>
          <Image
            style={{ height: 150, width: 150 }}
            resizeMode="contain"
            source={require("../assets/vr_headset.png")}
          />
        </>
      </LinearGradient>
    </View>
  );
}
