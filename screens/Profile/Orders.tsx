import { View, Text, ScrollView } from "react-native";
import { ShoppingBagIcon } from "react-native-heroicons/outline";
import { useGetOrdersQuery } from "../../app/services/addOrder";
import { useUser } from "../../lib/helpers/UserContext";
import LoadingView from "../../components/LoadingView";
import OrderCard from "../../components/OrderCard";

export default function Orders() {
  const { id } = useUser();
  const { data: orders, isLoading } = useGetOrdersQuery(id);

  if (isLoading) {
    return <LoadingView />;
  }

  if (orders?.length === 0) {
    return (
      <View className="flex-col px-4 items-center h-full pt-[30%]">
        <ShoppingBagIcon color="#284F49" size={30} />
        <Text className="text-lg font-bold pt-4">No orders yet!</Text>
        <Text className="text-base text-center max-w-xs">
          for the time being you have no made any order
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="p-4">
        <Text className="text-xs text-gray-600 font-bold pl-2 pt-2 uppercase">
          orders
        </Text>
        <Text className=" text-3xl font-bold p-2">On The Way</Text>
        {orders
          .filter((e) => !e?.delivered)
          .map((order) => (
            <OrderCard
              key={order.id}
              profile_pic={order?.products?.profile_pic}
              title={order?.product?.title}
              quantity={order?.quantity}
              price={order?.products?.price}
            />
          ))}
        {orders.filter((e) => e?.delivered).length !== 0 && (
          <View className="py-10">
            <Text className="text-xs text-gray-600 font-bold pl-2 pt-2 uppercase">
              orders
            </Text>
            <Text className=" text-3xl font-bold p-2">Delivered</Text>
            {orders
              .filter((e) => e?.delivered)
              .map((order) => (
                <OrderCard
                  key={order.id}
                  profile_pic={order?.products?.profile_pic}
                  title={order?.product?.title}
                  quantity={order?.quantity}
                  price={order?.products?.price}
                />
              ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
