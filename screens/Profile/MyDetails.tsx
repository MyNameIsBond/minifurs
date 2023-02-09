import { View, Text, TextInput } from "react-native";
import React, { useEffect, useReducer } from "react";
import MyButton from "../../components/reusables/MyButton";
import reducerCheckout, {
  ACTION,
  initialState,
} from "../../lib/dispachers/reducerCheckout";
import { supabase } from "../../lib/supabase";
import { useUser } from "../../lib/helpers/UserContext";

// This is cool!
export default function MyDetails() {
  const { user } = useUser();

  const [state, dispacher] = useReducer(reducerCheckout, initialState);

  const doesUserExist = async (): Promise<boolean> => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .match({ id: user?.id });
    if (data && data.length > 0) {
      dispacher({ type: ACTION.USER_EXIST, payload: true });
      return true;
    } else {
      dispacher({ type: ACTION.USER_EXIST, payload: false });
      return false;
    }
  };

  const ferchUserDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .match({ id: user?.id });
      if (data && data.length > 0) {
        dispacher({
          type: ACTION.CHANGE_INPUT,
          payload: { name: "username", value: data[0].username },
        });
        dispacher({
          type: ACTION.CHANGE_INPUT,
          payload: { name: "email", value: data[0].email },
        });
        dispacher({
          type: ACTION.CHANGE_INPUT,
          payload: { name: "phone_number", value: data[0].phone_number },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveUserDetails = async () => {
    try {
      if (!(await doesUserExist())) {
        await supabase.from("users").insert({
          id: user?.id,
          username: state.name,
          email: state.email,
          phone_number: state.phone_number,
        });
      } else {
        await supabase
          .from("users")
          .update({
            username: state.name,
            email: state.email,
            phone_number: state.phone_number,
          })
          .match({ id: user?.id });
      }
      handleChange("", "email");
      handleChange("", "name");
      handleChange("", "phone_number");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (text: string, name: string) => {
    dispacher({
      type: ACTION.CHANGE_INPUT,
      payload: { name: name, value: text },
    });
  };

  const CheckIfUserDetailsExist = () => {
    supabase
      .channel("public:users")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users" },
        () => {
          ferchUserDetails();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "users" },
        () => {
          ferchUserDetails();
        }
      )
      .subscribe();
  };

  useEffect(() => {
    if (user) {
      dispacher({ type: ACTION.SET_USER, payload: { user } });
      dispacher({ type: ACTION.USER_EXIST, payload: { user_exist: true } });
    }
    CheckIfUserDetailsExist();
  }, []);

  return (
    <View>
      {state.user_exist ? (
        <>
          <Text>{state.username}</Text>
        </>
      ) : (
        <View className="flex gap-y-4 p-3">
          <Text>Delivery Details</Text>
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => handleChange(text, "name")}
            value={state.name}
            placeholder="Full Name"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => handleChange(text, "email")}
            value={state.email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 mb-5 bg-gray-50"
            onChangeText={(text) => handleChange(text, "phone_number")}
            value={state.phone_number}
            placeholder="Phone Number"
            autoCapitalize={"none"}
          />
          <MyButton title="Save" onPress={() => saveUserDetails()} />
        </View>
      )}
      <View className="flex gap-y-4 px-3 mt-5 m-3 p-3 bg-gray-50 rounded-md shadow">
        <Text>Address</Text>
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
          onChangeText={(text) => handleChange(text, "road")}
          value={state.road}
          placeholder="Road"
          autoCapitalize={"none"}
        />
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
          onChangeText={(text) => handleChange(text, "town")}
          value={state.town}
          placeholder="Town"
          autoCapitalize={"none"}
        />
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
          onChangeText={(text) => handleChange(text, "county")}
          value={state.county}
          placeholder="County"
          autoCapitalize={"none"}
        />
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50 mb-6"
          onChangeText={(text) => handleChange(text, "postcode")}
          value={state.postcode}
          placeholder="Post code"
          autoCapitalize={"none"}
        />
        <MyButton title="Save" onPress={() => console.log("")} />
      </View>
    </View>
  );
}
