import { View, Text } from "react-native";
import { ElementType } from "react";
import {
  EnvelopeIcon,
  MapPinIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
} from "react-native-heroicons/outline";

export default function ContactUs() {
  const contactList: {
    title: string;
    icon: ElementType;
    subTitle: string;
  }[] = [
    {
      title: "Email Us",
      icon: EnvelopeIcon,
      subTitle: "info@thehappyprogrammer.com",
    },
    { title: "Find Us", icon: MapPinIcon, subTitle: "Coventry, UK" },
    { title: "Call Us", icon: DevicePhoneMobileIcon, subTitle: "07305177963" },
    { title: "Opening Hours", icon: ClockIcon, subTitle: "Monday - Friday" },
  ];
  return (
    <View className="flex-col px-4 items-center h-full pt-[30%]">
      {contactList.map((item) => (
        <View key={item.title} className="flex-col items-center pt-4">
          <View>
            <item.icon color="black" className="bg-gray-500" size={40} />
          </View>
          <Text className="text-base font-bold pt-4">{item.title}</Text>
          <Text className="text-base text-gray-600 ">{item.subTitle}</Text>
        </View>
      ))}
    </View>
  );
}
