import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

interface MyButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export default function MyButton({
  title,
  onPress,
  loading,
}: MyButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      className="bg-accent-green w-full rounded-lg"
      onPress={onPress}
    >
      <View className="flex items-center">
        <Text className="text-center p-4 rounded-lg text-gray-50 font-bold">
          {loading ? <ActivityIndicator /> : <>{title}</>}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
