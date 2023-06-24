import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../lib/supabase";

import {
  ChevronRightIcon,
  MapPinIcon,
  NewspaperIcon,
  ShoppingBagIcon,
  PhoneIcon,
} from "react-native-heroicons/outline";
import MyButton from "../../components/reusables/MyButton";
import { useUser } from "../../lib/helpers/UserContext";
import { ElementType } from "react";

export default function Profile({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const { username, email } = useUser();

  const list: { title: string; icon: ElementType; link: string }[] = [
    { title: "orders", icon: ShoppingBagIcon, link: "Orders" },
    { title: "My Details", icon: NewspaperIcon, link: "MyDetails" },
    { title: "Delivery Address", icon: MapPinIcon, link: "DeliveryAddress" },
    { title: "Contact us", icon: PhoneIcon, link: "ContactUs" },
  ];

  return (
    <SafeAreaView>
      <View className="px-5 max-w-xs flex flex-row space-x-5 items-center py-16">
        <Image
          source={require("../../assets/user-pic.png")}
          className="rounded-full"
          style={{ width: 60, height: 60 }}
        />
        <View className="flex space-y-2">
          <Text className="capitalize">{username ? username : "username"}</Text>
          <Text className="text-gray-600">
            {email ? email : "email@example.com"}
          </Text>
        </View>
      </View>
      {list.map((item) => (
        <TouchableOpacity
          key={item.title}
          className="px-5 flex-row py-5 space-x-4 items-center border-b border-gray-300"
          onPress={() => {
            navigation.navigate(item.link);
          }}
        >
          <item.icon color="black" className="bg-gray-500" size={20} />
          <View className="flex-1">
            <Text className="font-semibold">{item.title}</Text>
          </View>
          <ChevronRightIcon color="black" size={20} />
        </TouchableOpacity>
      ))}
      <View className="pt-14 px-10">
        <MyButton title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </SafeAreaView>
  );
}
