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
      dispacher({ type: ACTION.SET_USER, payload: user });
    }
    CheckIfUserDetailsExist();
  }, []);

  return (
    <SafeAreaView className="px-4">
      <ScrollView>
        <Text>Ela</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
