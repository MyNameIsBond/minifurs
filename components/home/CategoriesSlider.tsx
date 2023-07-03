import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { ElementType } from "react";
import PopularSvg from "./svg/PopularSvg";
import ChairSvg from "./svg/ChairSvg";
import WorkstationSvg from "./svg/WorkstationSvg";
import OfficeSvg from "./svg/OfficeSvg";
import SofaSvg from "./svg/SofaSvg";
import BedSvg from "./svg/BedSvg";
import { useNavigation } from "@react-navigation/native";

export default function CategoriesSlider({}): JSX.Element {
  const navigation = useNavigation();
  const categories: { title: string; icon: ElementType }[] = [
    { title: "Popular", icon: PopularSvg },
    { title: "Chair", icon: ChairSvg },
    { title: "Workstation", icon: WorkstationSvg },
    { title: "Living Room", icon: SofaSvg },
    { title: "Bedroom", icon: BedSvg },
    { title: "Office", icon: OfficeSvg },
  ];

  const renderItem = ({
    item,
  }: {
    item: { title: string; icon: ElementType };
  }) => {
    console.log("ITEM:", item);
    const Icon = item.icon;
    return (
      <View className="flex-col mr-3 items-center gap-y-2 w-20">
        <TouchableOpacity
          onPress={(e) => {
            navigation.navigate("Category", { category: item.title });
          }}
        >
          <View
            className={`${
              item.title === "Popular" ? "bg-accent-orange" : "bg-gray-200"
            } flex flex-col items-center justify-center origin-center w-14 h-14 rounded-2xl`}
          >
            <Icon />
          </View>
        </TouchableOpacity>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <FlatList
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      className="h-24"
    />
  );
}
