import React, { useState } from "react";
import { Alert, View, TextInput, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";

import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { Link } from "@react-navigation/native";
import AuthSceleton from "./AuthSceleton";
import MyButton from "../reusables/MyButton";

export default function MyAuth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <AuthSceleton
      title="Welcome Back"
      subtitle="Login to your minifurs account"
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
          className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
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
