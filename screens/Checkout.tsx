import { View, Text, TextInput, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useUser } from "../lib/helpers/UserContext";
import MyButton from "../components/reusables/MyButton";

export default function Checkout({}) {
  const { user } = useUser();

  return (
    <SafeAreaView className="px-4">
      <ScrollView>
        <View className="flex gap-y-4 p-3">
          <Text>Delivery Details</Text>
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => console.log({ text })}
            value={""}
            placeholder="Full Name"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => console.log({ text })}
            value={""}
            placeholder="Email"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 mb-5 bg-gray-50"
            onChangeText={(text) => console.log({ text })}
            value={""}
            placeholder="Phone Number"
            autoCapitalize={"none"}
          />
          <MyButton title="Save" onPress={() => {}} />
        </View>

        <View className="flex gap-y-4 px-3 mt-5 m-3 p-3 bg-gray-50 rounded-md shadow">
          <Text>Address</Text>
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => console.log({ text })}
            value={""}
            placeholder="Road"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => console.log({ text })}
            value={""}
            placeholder="Town"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => console.log({ text })}
            value={""}
            placeholder="County"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50 mb-6"
            onChangeText={(text) => console.log({ text })}
            value={""}
            placeholder="Post code"
            autoCapitalize={"none"}
          />
          <MyButton title="Save" onPress={() => console.log("")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
