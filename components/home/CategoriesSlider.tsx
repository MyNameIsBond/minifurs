import { View, Text, FlatList } from "react-native";
import React from "react";
import PopularSvg from "./svg/PopularSvg";
import ChairSvg from "./svg/ChairSvg";
import WorkstationSvg from "./svg/WorkstationSvg";
import OfficeSvg from "./svg/OfficeSvg";
import SofaSvg from "./svg/SofaSvg";
import BedSvg from "./svg/BedSvg";

export default function CategoriesSlider() {
  const categories = [
    { title: "Popular", icon: PopularSvg },
    { title: "Chair", icon: ChairSvg },
    { title: "Workstation", icon: WorkstationSvg },
    { title: "Living Room", icon: SofaSvg },
    { title: "Bedroom", icon: BedSvg },
    { title: "Office", icon: OfficeSvg },
  ];

  const renderItem = ({ item }: { title: string; icon: Element }) => {
    const Icon = item.icon;
    return (
      <View className="flex-col mr-3 items-center gap-y-2 w-20">
        <View
          className={`${
            item.title === "Popular" ? "bg-accent-orange" : "bg-gray-200"
          } flex flex-col items-center justify-center origin-center w-14 h-14 rounded-2xl`}
        >
          <Icon />
        </View>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <FlatList
      horizontal
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      className="h-24"
    />
  );
}
