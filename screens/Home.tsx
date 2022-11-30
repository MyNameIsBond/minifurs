import React from "react";
import { SafeAreaView, Text } from "react-native";
import Auth from "../components/Auth";

export default function Home() {
  const e = process.env.SUPABASE_URL;
  return (
    <SafeAreaView>
      <Text>{e} ela:</Text>
    </SafeAreaView>
  );
}
