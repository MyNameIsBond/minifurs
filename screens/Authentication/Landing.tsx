import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MyButton from "../../components/reusables/MyButton";

export default function Landing({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  return (
    <ImageBackground
      imageStyle={{ opacity: 0.09 }}
      source={require("../../assets/loginbg.png")}
      resizeMode="cover"
    >
      <SafeAreaView>
        <View className="h-screen px-4">
          <Image
            source={require("../../assets/mainimage.png")}
            className=""
            style={{
              width: "100%",
              height: 300,
              resizeMode: "contain",
              marginTop: 50,
            }}
          />
          <View className="flex-col space-y-2 mb-12">
            <Text className="text-2xl text-center font-bold text-gray-500">
              Optimize your space using tech and creativity in africa
            </Text>
            <Text className="text-center text-gray-500 font-medium">
              Fitting your furnitures in your space before buying{" "}
            </Text>
          </View>
          <View className="flex-col items-center space-y-4">
            <MyButton
              title="Existing User (Sign In)"
              onPress={() => navigation.navigate("Auth")}
            />
            <TouchableOpacity
              className="bg-accent-orange w-full rounded-lg"
              style={{ backgroundColor: "#FFE4C7" }}
              onPress={(e) => {
                navigation.navigate("SignUp");
              }}
            >
              <Text className="text-center p-4 text-accent-orange font-bold">
                Create an account (Sign Up)
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-gray-500 text-xs pt-4">
              By tapping Create Account and using Minifurs, you agree to our{" "}
              <Text className="text-center text-gray-900 text-xs">
                Terms of Servce & Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
