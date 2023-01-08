import { useReducer, useState } from "react";
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleChangeEmail = (e: string) => {
    dispacher({
      type: ACTION.CHANGE_INPUT,
      payload: { name: "email", value: e },
    });
  };

  const handleChangePassword = (e: string) => {
    dispacher({
      type: ACTION.CHANGE_INPUT,
      payload: { name: "password", value: e },
    });
  };

  async function signInWithEmail() {
    dispacher({ type: ACTION.LOADING, payload: { loading: true } });
    const { error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    dispacher({ type: ACTION.LOADING, payload: { loading: false } });
  }

  return (
    <AuthSceleton
      title="Welcome Back"
      subtitle="Login to your minifurs account"
    >
      <TextInput
        className="border py-4 px-2 rounded-md border-green-900 border-opacity-80 bg-gray-50"
        onChangeText={handleChangeEmail}
        value={state.email}
        placeholder="email@address.com"
        autoCapitalize={"none"}
      />
      <View className="relative">
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
          onChangeText={handleChangePassword}
          value={state.password}
          secureTextEntry={state.showPassword}
          placeholder="password"
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          className="absolute right-0 top-0 h-full w-10 flex items-center justify-center"
          onPress={() => {
            console.log("serio nova");
            dispacher({
              type: ACTION.SHOWPASSWORD,
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
        <MyButton title="Sign In" onPress={signInWithEmail} />
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
