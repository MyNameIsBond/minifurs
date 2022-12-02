import React, { useState } from "react";
import {
  Alert,
  View,
  TextInput,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "react-native-elements";

export default function MyAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <ImageBackground
      imageStyle={{ opacity: 0.07 }}
      source={require("../assets/loginbg.png")}
      resizeMode="cover"
    >
      <View className="h-screen px-5">
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 100, height: 100 }}
        />
        <View>
          <Text className="text-lg text-accent-green font-bold">Welcome</Text>
          <Text className="text-gray-500">Login to your minifurs account</Text>
        </View>
        <View>
          <TextInput
            className="border py-4 px-2 rounded-md"
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View>
          <Button
            title="Sign in"
            disabled={loading}
            className=""
            onPress={() => signInWithEmail()}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
