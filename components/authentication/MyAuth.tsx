import { Alert, View, TextInput, Text, TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { Link } from "@react-navigation/native";
import AuthSceleton from "./AuthSceleton";
import MyButton from "../reusables/MyButton";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { changeInput, showPasswordToggle } from "../../app/features/auth/auth";
import { useLoginUserMutation } from "../../app/services/user";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";

export default function MyAuth() {
  const [login, { error, isLoading }] = useLoginUserMutation();
  const { email, password, showPassword } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert(error as string);
    }
  }, [error]);

  const handleChange = (text: string, name: string) => {
    dispatch(changeInput({ name, text }));
  };

  const signInWithEmail = () => {
    login({
      email,
      password,
    });
  };

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
            <EyeSlashIcon color="black" className="bg-gray-500" size={20} />
          ) : (
            <EyeIcon color="black" className="bg-gray-500" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View className="rounded-md mt-6 bg-accent-green">
        <MyButton
          title="Sign In"
          loading={isLoading}
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
