import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useUser } from "../lib/helpers/UserContext";
import ListCards from "../components/ListCardsContainer";
import { ShoppingBagIcon } from "react-native-heroicons/outline";
import BasketCard from "../components/BasketCard";
import LoadingView from "../components/LoadingView";
import { useFetchCardQuery } from "../app/services/basket";
import { useStripe } from "@stripe/stripe-react-native";
import { API_URL } from "@env";

export default function Card({ navigation }: { navigation: any }) {
  const { id } = useUser();
  const { data, isLoading, refetch } = useFetchCardQuery({
    user_id: id,
  });
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    console.log(response);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };
  const realtimeTable = () => {
    supabase
      .channel("public:basket")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "basket",
          filter: `user_id=eq.${id}`,
        },
        () => {
          refetch();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "basket",
          filter: `user_id=eq.${id}`,
        },
        () => {
          refetch();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "basket",
          filter: `user_id=eq.${id}`,
        },
        () => {
          refetch();
        }
      )
      .subscribe();
  };

  useEffect(() => {
    realtimeTable();
    initializePaymentSheet();
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }

  if (data?.length === 0) {
    return (
      <View className="flex-col px-4 items-center h-full pt-[30%]">
        <ShoppingBagIcon color="#284F49" size={30} />
        <Text className="text-lg font-bold pt-4">Add Item to you basket!</Text>
        <Text className="text-base text-center max-w-xs">
          You can add items to your basket by clicking the add to basket button
        </Text>
      </View>
    );
  }

  return (
    <ListCards classNames="h-full">
      <>
        {data?.map((product) => (
          <BasketCard
            key={product.id}
            product={product.products}
            basketid={product.id}
            quantity={product.quantity}
            user_id={id}
          />
        ))}
        <View className="flex-row justify-between py-5 w-full">
          <View className="flex-col items-start">
            <View className="flex-row items-end">
              <Text className="text-gray-600 text-base">Total: </Text>
              <Text className="text-center text-lg text-accent-orange font-bold">
                £{data?.reduce((a, b) => a + b.products.price * b.quantity, 0)}
              </Text>
            </View>
            <Text className="text-xs text-gray-600">DELIVERY EXCLUSIVE</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => openPaymentSheet()}
              className="shadow flex-row justify-center items-center w-full rounded-xl bg-accent-green"
            >
              <Text className="text-center text-gray-50 py-4 font-bold pl-3">
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </ListCards>
  );
}
