import { ReactNode } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TextInput,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

export default function HomeSceleton({
  children,
  search,
  setSearch,
}: {
  children: ReactNode;
  search: string;
  setSearch: (text: string) => void;
}): JSX.Element {
  return (
    <>
      <View className="bg-accent-green">
        <ImageBackground
          resizeMode="cover"
          source={require("../../assets/homebg.png")}
          imageStyle={{
            opacity: 0.3,
            backgroundColor: "#00cc00",
          }}
        >
          <SafeAreaView>
            <View className="flex items-center mt-14 mb-20">
              <Text className="text-2xl text-gray-50 font-bold">
                Set up your space easily
              </Text>
              <View className="relative mx-10 mt-4">
                <TextInput
                  className="border min-w-full py-4 pr-2 pl-10 rounded-xl border-green-900 border-opacity-80 backdrop-blur-lg bg-gray-50"
                  placeholder="search"
                  onChangeText={setSearch}
                  value={search}
                />
                <View className="absolute left-0 top-0 h-full w-10 flex items-center justify-center">
                  <MagnifyingGlassIcon
                    color="black"
                    className="bg-gray-500"
                    size={20}
                  />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
      <View className="rounded-t-3xl pt-10 -mt-5 bg-gray-100">{children}</View>
    </>
  );
}
