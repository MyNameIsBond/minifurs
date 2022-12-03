import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { Link, NavigationContainer } from "@react-navigation/native";

import {
  ChevronRightIcon,
  MapPinIcon,
  NewspaperIcon,
  ShoppingBagIcon,
  PhoneIcon,
  BellIcon,
} from "react-native-heroicons/outline";
import MyButton from "../../components/reusables/MyButton";

export default function Profile({ navigation }: {}): JSX.Element {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);
  const list: { title: string; icon: Element; link: string }[] = [
    { title: "orders", icon: ShoppingBagIcon, link: "Orders" },
    { title: "My Details", icon: NewspaperIcon, link: "MyDetails" },
    { title: "Delivery Address", icon: MapPinIcon, link: "DeliveryAddress" },
    { title: "Notifications", icon: BellIcon, link: "Notifications" },
    { title: "Contact us", icon: PhoneIcon, link: "ContactUs" },
  ];

  const icon = session?.user?.avatar_url
    ? { uri: session?.user?.avatar_url }
    : require("../../assets/user-pic.png");
  return (
    <SafeAreaView>
      <View className="px-5 max-w-xs flex flex-row space-x-5 items-center py-16">
        <Image
          source={icon}
          className="rounded-full"
          style={{ width: 60, height: 60 }}
        />
        <View className="flex space-y-2">
          <Text className="capitalize">
            {session?.user?.username ? session?.user?.username : "username"}
          </Text>
          <Text className="text-gray-600">{session?.user?.email}</Text>
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
