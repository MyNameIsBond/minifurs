import "react-native-url-polyfill/auto";
import { NavigationContainer } from "@react-navigation/native";
import { supabase } from "./lib/supabase";
import React, { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import NavTab from "./components/NavTab";
import Auth from "./screens/Authentication/Auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./screens/Authentication/SignUp";
import Landing from "./screens/Authentication/Landing";
import { ActivityIndicator, View } from "react-native";
import Product from "./screens/Product/Product";
import { UserContext } from "./lib/helpers/UserContext";

const Stack = createNativeStackNavigator();
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoading(true);
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(true);
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return loading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <NavigationContainer>
      {!session ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Group>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Group>
        </Stack.Navigator>
      ) : (
        <UserContext value={session}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
              <Stack.Screen name="Nav" component={NavTab} />
              <Stack.Screen name="Product" component={Product} />
            </Stack.Group>
          </Stack.Navigator>
        </UserContext>
      )}
    </NavigationContainer>
  );
}
