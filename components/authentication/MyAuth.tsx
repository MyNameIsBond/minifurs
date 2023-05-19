import { useReducer } from "react";
import { Alert, View, TextInput, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { Link } from "@react-navigation/native";
import AuthSceleton from "./AuthSceleton";
import MyButton from "../reusables/MyButton";
import { useSelector, useDispatch } from "react-redux";

import reducerSignUp, {
  ACTION,
  initialState,
} from "../../lib/dispachers/reducerSignUp";
import { RootState } from "../../app/store";
import { changeInput, showPasswordToggle } from "../../app/features/auth/auth";
import { useLoginUserQuery } from "../../app/services/user";

export default function MyAuth() {
  const { email, password, showPassword } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const [state, dispacher] = useReducer(reducerSignUp, initialState);

  const handleChange = (text: string, name: string) => {
    dispatch(changeInput({ name, text }));
  };

  async function signInWithEmail() {
    dispacher({ type: ACTION.LOADING, payload: { loading: true } });
    try {
      const { error, isLoading } = useLoginUserQuery({ email, password });

      // const { error } = await supabase.auth.signInWithPassword({
      //   email: email,
      //   password: password,
      // });

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
        value={email}
        placeholder="email@address.com"
        autoCapitalize={"none"}
      />
      <View className="relative">
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
          onChangeText={(text) => handleChange(text, "password")}
          value={password}
          secureTextEntry={showPassword}
          placeholder="password"
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          className="absolute right-0 top-0 h-full w-10 flex items-center justify-center"
          onPress={() => {
            dispatch(showPasswordToggle());
          }}
        >
          {showPassword ? (
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
