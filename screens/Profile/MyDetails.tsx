import { View, Text, TextInput, Button } from "react-native";
import React, { useEffect } from "react";
import MyButton from "../../components/reusables/MyButton";
import { supabase } from "../../lib/supabase";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { changeInput, editToggle } from "../../app/features/userDetails";
import { useUser } from "../../lib/helpers/UserContext";

export default function MyDetails() {
  const user = useUser();
  const { edit, phone, username, road, town, county, postCode } =
    useAppSelector((state: RootState) => state.userDetails);
  const dispatch = useAppDispatch();

  const CheckIfUserDetailsExist = () => {
    supabase
      .channel("public:users")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users" },
        () => {
          console.log("ads");
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "users" },
        () => {
          console.log("ads");
        }
      )
      .subscribe();
  };

  const handleChange = (text: string, name: string) => {
    dispatch(changeInput({ name, text }));
  };

  useEffect(() => {
    CheckIfUserDetailsExist();
  }, []);

  return (
    <View>
      <View className="flex gap-y-4 px-3 mt-5 m-3 p-3 bg-gray-50 rounded-md shadow">
        <Text className="font-semibold uppercase text-xs">
          Delivery Details
        </Text>
        {edit ? (
          <View className="flex gap-y-4">
            <TextInput
              className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
              onChangeText={(text) => handleChange(text, "username")}
              value={username}
              placeholder="Full Name"
              autoCapitalize={"none"}
            />
            <TextInput
              className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 mb-5 bg-gray-50"
              onChangeText={(text) => handleChange(text, "phone")}
              value={phone}
              placeholder="Phone Number"
              autoCapitalize={"none"}
            />
            <View className="flex-row justify-around w-full">
              <View className="flex-col items-start">
                <Button title="cancel" onPress={() => dispatch(editToggle())} />
              </View>
              <View>
                <MyButton title="Save" onPress={() => {}} />
              </View>
            </View>
          </View>
        ) : (
          <View className="flex flex-col gap-y-2">
            <Text>Fullname: {username ? username : "no fullname"}</Text>
            <Text>Phone: {phone ? phone : "no phone number"}</Text>
            <Button title="edit" onPress={() => dispatch(editToggle())} />
          </View>
        )}
      </View>
      <View className="flex gap-y-4 px-3 mt-5 m-3 p-3 bg-gray-50 rounded-md shadow">
        <Text className="font-semibold uppercase text-xs">Address</Text>
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
          onChangeText={(text) => handleChange(text, "road")}
          value={road}
          placeholder="Road"
          autoCapitalize={"none"}
        />
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
          onChangeText={(text) => handleChange(text, "town")}
          value={town}
          placeholder="Town"
          autoCapitalize={"none"}
        />
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
          onChangeText={(text) => handleChange(text, "county")}
          value={county}
          placeholder="County"
          autoCapitalize={"none"}
        />
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50 mb-6"
          onChangeText={(text) => handleChange(text, "postCode")}
          value={postCode}
          placeholder="Post code"
          autoCapitalize={"none"}
        />
        <View className="flex-row justify-around w-full">
          <View className="flex-col items-start">
            <Button title="cancel" />
          </View>
          <View>
            <MyButton title="Save" onPress={() => {}} />
          </View>
        </View>
      </View>
    </View>
  );
}
