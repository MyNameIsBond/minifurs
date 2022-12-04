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
import Notifications from "./screens/Profile/Notifications";
import ContactUs from "./screens/Profile/ContactUs";
import Orders from "./screens/Orders";
import MyDetails from "./screens/Profile/MyDetails";
import DeliveryAddress from "./screens/Profile/DeliveryAddress";
const Stack = createNativeStackNavigator();
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={NavTab} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="MyDetails" component={MyDetails} />
          <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
