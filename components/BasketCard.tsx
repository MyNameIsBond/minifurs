import { View, Text, Image, TouchableOpacity } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
export default function BasketCard({
  product,
  basketid,
}: {
  product: any;
  basketid: string;
}): JSX.Element {
  const deleteItem = async () => {
    try {
      const { data, error } = await supabase
        .from("basket")
        .delete()
        .match({ id: basketid, user_id: user?.id });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="flex-row items-center rounded-md w-full m-1 px-2 py-3 bg-gray-50">
      <Image
        source={{ uri: product.profile_pic }}
        className="w-20 h-20 rounded-md"
      />
      <View className="pl-2 flex-col space-y-1">
        <Text className="text-lg font-bold">{product.title}</Text>
        <Text className="text-gray-500">EST Time: </Text>
        <Text className="text-gray-500">amount: </Text>
      </View>
      <Text className="ml-auto pr-6 text-accent-orange text-lg font-bold">
        £ {product.price}
      </Text>
      <View className="mb-auto bg-gray-100 p-1">
        <TouchableOpacity onPress={() => deleteItem()}>
          <XMarkIcon color="darkgray" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
