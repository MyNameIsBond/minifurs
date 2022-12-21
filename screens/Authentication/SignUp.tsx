import React, { useState } from "react";
import { Alert, View, TextInput, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { Link } from "@react-navigation/native";
import AuthSceleton from "../../components/authentication/AuthSceleton";
import MyButton from "../../components/reusables/MyButton";

export default function MyAuth({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  async function signUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Now you can sign in");
      navigation.navigate("Auth");
    }
    setLoading(false);
  }

  return (
    <AuthSceleton
      title="Create Account"
      subtitle="Enter your details for a new account"
    >
      <TextInput
        className="border py-4 px-2 rounded-md border-green-900 border-opacity-80 bg-gray-50"
        onChangeText={setEmail}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={"none"}
      />
      <View className="relative">
        <TextInput
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 backdrop-blur-lg bg-gray-50"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={showPassword}
          placeholder="password"
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          className="absolute right-0 top-0 h-full w-10 flex items-center justify-center"
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeSlashIcon color="black" className="bg-gray-500" size={20} />
          ) : (
            <EyeIcon color="black" className="bg-gray-500" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <MyButton title="Sign Up" onPress={signUp} />
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
