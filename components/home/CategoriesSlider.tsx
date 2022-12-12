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
    { title: "Office", icon: OfficeSvg },
    { title: "Living Room", icon: SofaSvg },
    { title: "Bedroom", icon: BedSvg },
  ];

  const renderItem = ({ item }: { title: string; icon: Element }) => {
    const Icon = item.icon;
    return (
      <View
        className={`${
          item.title === "Popular" ? "bg-accent-orange" : null
        } flex flex-col items-center justify-center origin-center w-24 h-24 rounded-xl shadow-md`}
      >
        <Icon width={30} height={50} className="flex-col" />
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
    ></FlatList>
  );
}
