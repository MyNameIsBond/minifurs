import ContactUs from "./Profile/ContactUs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfile from "./Profile/MyProfile";
import Notifications from "./Profile/Notifications";
import Orders from "./Orders";
import MyDetails from "./Profile/MyDetails";
import DeliveryAddress from "./Profile/DeliveryAddress";
const Stack = createNativeStackNavigator();
export default function Profile({}): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Group>
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="MyDetails" component={MyDetails} />
        <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
