import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactUs from "./Profile/ContactUs";
import DeliveryAddress from "./Profile/DeliveryAddress";
import MyDetails from "./Profile/MyDetails";
import MyProfile from "./Profile/MyProfile";
import Notifications from "./Profile/Notifications";
import Orders from "./Profile/Orders";

const Stack = createNativeStackNavigator();
export default function Profile() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Prfile" component={MyProfile} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="MyDetails" component={MyDetails} />
        <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
