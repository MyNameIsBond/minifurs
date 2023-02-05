import { View, Text, TextInput, SafeAreaView, ScrollView } from "react-native";
import { useEffect, useReducer } from "react";
import { useUser } from "../lib/helpers/UserContext";
import reducerCheckout, {
  initialState,
  ACTION,
} from "../lib/dispachers/reducerCheckout";
import MyButton from "../components/reusables/MyButton";
import { supabase } from "../lib/supabase";

// TODO: add limits to inputs
// TODO: add validation to inputs
// TODO: add error messages to inputs

export default function Checkout({}) {
  const { user } = useUser();
  const [state, dispacher] = useReducer(reducerCheckout, initialState);

  const handleChange = (text: string, name: string) => {
    dispacher({
      type: ACTION.CHANGE_INPUT,
      payload: { name: name, value: text },
    });
  };

  const doesUserExist = async (): Promise<boolean> => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .match({ id: user?.id });
    if (data && data.length > 0) {
      return true;
    } else {
      return false;
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
      // handleChange("", "email");
      // handleChange("", "name");
      // handleChange("", "phone_number");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      dispacher({ type: ACTION.SET_USER, payload: user });
    }
  }, []);

  return (
    <SafeAreaView className="px-4">
      <ScrollView>
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
      </ScrollView>
    </SafeAreaView>
  );
}
