import { View, Text, Image, TouchableOpacity } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useDeleteCardFromBasketMutation } from "../app/services/basket";
export default function BasketCard({
  product,
  basketid,
  user_id,
  quantity,
}: {
  product: any;
  basketid: string;
  user_id: string;
  quantity: number;
}): JSX.Element {
  const [deleteCard] = useDeleteCardFromBasketMutation();
  return (
    <View className="flex-row items-center rounded-md w-full m-1 px-2 py-3 bg-gray-50">
      <Image
        source={{ uri: product.profile_pic }}
        className="w-20 h-20 rounded-md"
      />
      <View className="pl-2 flex-col space-y-1">
        <Text className="text-lg font-bold">{product.title}</Text>
        <Text className="text-gray-500">EST Time: 1 days</Text>
        <Text className="text-gray-500">amount: {quantity}</Text>
      </View>
      <Text className="ml-auto pr-6 text-accent-orange text-lg font-bold">
        £ {product.price * quantity}
      </Text>
      <View className="mb-auto bg-gray-100 p-1">
        <TouchableOpacity
          onPress={() => deleteCard({ user_id: user_id, basket_id: basketid })}
        >
          <XMarkIcon color="darkgray" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
