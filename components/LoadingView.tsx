import { View, SafeAreaView, ActivityIndicator } from "react-native";

export default function LoadingView() {
  return (
    <SafeAreaView>
      <View className="w-full h-full flex items-center justify-center">
        <ActivityIndicator />
      </View>
    </SafeAreaView>
  );
}
