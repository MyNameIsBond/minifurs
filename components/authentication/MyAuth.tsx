import { useReducer } from "react";
import { Alert, View, TextInput, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { Link } from "@react-navigation/native";
import AuthSceleton from "./AuthSceleton";
import MyButton from "../reusables/MyButton";
import reducerSignUp, {
  ACTION,
  initialState,
} from "../../lib/dispachers/reducerSignUp";

export default function MyAuth() {
  const [state, dispacher] = useReducer(reducerSignUp, initialState);

  const handleChange = (text: string, name: string) => {
    dispacher({
      type: ACTION.CHANGE_INPUT,
      payload: { name: name, value: text },
    });
  };

  async function signInWithEmail() {
    dispacher({ type: ACTION.LOADING, payload: { loading: true } });
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: state.email,
        password: state.password,
      });

      dispacher({ type: ACTION.LOADING, payload: { loading: false } });
      if (error) {
        Alert.alert(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthSceleton
      title="Welcome Back"
      subtitle="Login to your minifurs account"
    >
      <TextInput
        className="border py-4 px-2 rounded-md border-green-900 border-opacity-80 bg-gray-50"
        onChangeText={(text) => handleChange(text, "email")}
        value={state.email}
        placeholder="email@address.com"
        autoCapitalize={"none"}
      />
      <View className="relative">
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
          onChangeText={(text) => handleChange(text, "password")}
          value={state.password}
          secureTextEntry={state.showPassword}
          placeholder="password"
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          className="absolute right-0 top-0 h-full w-10 flex items-center justify-center"
          onPress={() => {
            dispacher({
              type: ACTION.SHOWPASSWORD,
              payload: { showPassword: !state.showPassword },
            });
          }}
        >
          {state.showPassword ? (
            <EyeIcon color="black" className="bg-gray-500" size={20} />
          ) : (
            <EyeSlashIcon color="black" className="bg-gray-500" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View className="rounded-md mt-6 bg-accent-green">
        <MyButton
          title="Sign In"
          loading={state.loading}
          onPress={signInWithEmail}
        />
      </View>
      <View className="flex-row px-4 mx-auto mt-5 text-center">
        <Text className="text-gray-600 font-light">Don't have an account?</Text>
        <Link to={{ screen: "SignUp" }}>
          <Text className="text-accent-orange font-medium"> sign up</Text>
        </Link>
      </View>
    </AuthSceleton>
  );
}
