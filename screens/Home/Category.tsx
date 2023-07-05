import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import HomeCard from "../../components/home/HomeCard";
import { ClockIcon } from "react-native-heroicons/outline";
import LoadingView from "../../components/LoadingView";
import { useGetProductsByCategoryQuery } from "../../app/services/categories";
import type { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Category">;

export default function Category({ route }: Props): JSX.Element {
  const category = route.params.category.toLowerCase();
  const { data, isLoading } = useGetProductsByCategoryQuery(category);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView>
      <ScrollView className="h-screen bg-gray-100">
        {data?.length === 0 && (
          <View className="flex-col px-4 items-center h-full pt-[30%]">
            <ClockIcon color="#284F49" size={30} />
            <Text className="text-lg font-bold pt-4">Coming Soon!</Text>
            <Text className="text-base text-center max-w-xs">
              Find a bright ideal to suit your taste with our great selection of
              suspension, wall, floor and table lights. breathable Walking
            </Text>
          </View>
        )}
        <View className="p-3 bg-gray-100" style={styles.container}>
          {data?.map((product) => (
            <HomeCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
