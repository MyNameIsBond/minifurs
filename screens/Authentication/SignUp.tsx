import { useReducer } from "react";
import { Alert, View, TextInput, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { Link } from "@react-navigation/native";
import AuthSceleton from "../../components/authentication/AuthSceleton";
import MyButton from "../../components/reusables/MyButton";
import reducerSignUp, {
  ACTION,
  initialState,
} from "../../lib/dispachers/reducerSignUp";

export default function MyAuth({ navigation }: { navigation: any }) {
  const [state, dispacher] = useReducer(reducerSignUp, initialState);

  const handleChange = (text: string, name: string) => {
    dispacher({
      type: ACTION.CHANGE_INPUT,
      payload: { name: name, value: text },
    });
  };

  async function signUp() {
    dispacher({ type: ACTION.LOADING, payload: { loading: true } });
    try {
      const { error } = await supabase.auth.signUp({
        email: state.email,
        password: state.password,
      });

      if (error) {
        Alert.alert(error.message);
      } else {
        Alert.alert("Now you can sign in");
        navigation.navigate("Auth");
      }
      dispacher({ type: ACTION.LOADING, payload: { loading: false } });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthSceleton
      title="Create Account"
      subtitle="Enter your details for a new account"
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
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 backdrop-blur-lg bg-gray-50"
          onChangeText={(text) => handleChange(text, "password")}
          value={state.password}
          secureTextEntry={state.showPassword}
          placeholder="password"
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          className="absolute right-0 top-0 h-full w-10 flex items-center justify-center"
          onPress={() =>
            dispacher({
              type: ACTION.SHOWPASSWORD,
              payload: { showPassword: !state.showPassword },
            })
          }
        >
          {state.showPassword ? (
            <EyeSlashIcon color="black" className="bg-gray-500" size={20} />
          ) : (
            <EyeIcon color="black" className="bg-gray-500" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <MyButton title="Sign Up" loading={state.loading} onPress={signUp} />
      </View>
      <View className="flex-row px-4 mx-auto mt-5 text-center">
        <Text className="text-gray-600 font-light">Existing User?</Text>
        <Link to={{ screen: "Auth" }}>
          <Text className="text-accent-orange font-medium"> sign in</Text>
        </Link>
      </View>
    </AuthSceleton>
  );
}
