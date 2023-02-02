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
import Product from "./screens/Product/Product";
import { MyUserContextProvider } from "./lib/helpers/UserContext";
import LoadingView from "./components/LoadingView";
import Checkout from "./screens/Checkout";

const Stack = createNativeStackNavigator();
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
    return <LoadingView />;
  }

  return !session ? (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <MyUserContextProvider session={session} supabaseClient={supabase}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Group>
            <Stack.Screen name="Nav" component={NavTab} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={({ route }) => ({
                headerShown: true,
                headerTitle: "Checkout",
                headerBackTitleVisible: false,
                headerTransparent: true,
                headerBlurEffect: "systemMaterial",
                headerTitleStyle: {
                  color: "#284F49",
                  fontSize: 20,
                },
              })}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </MyUserContextProvider>
  );
}
