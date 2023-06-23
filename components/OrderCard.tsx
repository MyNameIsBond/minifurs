import { View, Text, Image } from "react-native";

export default function OrderCard({
  profile_pic,
  title,
  quantity,
  price,
}: {
  profile_pic: string;
  title: string;
  quantity: number;
  price: number;
}): JSX.Element {
  return (
    <View className="flex-row items-center rounded-md w-full m-1 px-2 py-3 bg-gray-50">
      <Image source={{ uri: profile_pic }} className="w-20 h-20 rounded-md" />
      <View className="pl-2 flex-col space-y-1">
        <Text className="text-lg font-bold">{title}</Text>
        <Text className="text-gray-500">EST Time: 1 days</Text>
        <Text className="text-gray-500">amount: {quantity}</Text>
      </View>
      <Text className="ml-auto pr-6 text-accent-orange text-lg font-bold">
        £ {price * quantity}
      </Text>
    </View>
  );
}
