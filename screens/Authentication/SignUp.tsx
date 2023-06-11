import { useEffect } from "react";
import { Alert, View, TextInput, Text, TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { Link } from "@react-navigation/native";
import AuthSceleton from "../../components/authentication/AuthSceleton";
import MyButton from "../../components/reusables/MyButton";
import { useSignUpUserMutation } from "../../app/services/user";
import { RootState } from "../../app/store";
import { changeInput, showPasswordToggle } from "../../app/features/auth/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function MyAuth() {
  const [signUpMutation, { data, error, isLoading }] = useSignUpUserMutation();
  const dispatch = useAppDispatch();

  const { email, password, showPassword } = useAppSelector(
    (state: RootState) => state.auth
  );

  const handleChange = (text: string, name: string) => {
    dispatch(changeInput({ name, text }));
  };
  useEffect(() => {
    if (data) {
      console.log(data);
      Alert.alert("Check your email for validation email");
    }
    if (error) {
      Alert.alert(error as string);
    }
  }, [error, data]);

  const signUp = () => {
    signUpMutation({ email, password });
  };

  return (
    <AuthSceleton
      title="Create Account"
      subtitle="Enter your details for a new account"
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
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 backdrop-blur-lg bg-gray-50"
          onChangeText={(text) => handleChange(text, "password")}
          value={password}
          secureTextEntry={showPassword}
          placeholder="password"
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          className="absolute right-0 top-0 h-full w-10 flex items-center justify-center"
          onPress={() => dispatch(showPasswordToggle())}
        >
          {showPassword ? (
            <EyeSlashIcon color="black" className="bg-gray-500" size={20} />
          ) : (
            <EyeIcon color="black" className="bg-gray-500" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <MyButton title="Sign Up" loading={isLoading} onPress={signUp} />
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
