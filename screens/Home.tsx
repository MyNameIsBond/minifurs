import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Category from "./Home/Category";
import HomePage from "./Home/HomePage";
import Search from "./Home/Search";

const Stack = createNativeStackNavigator();
export default function Profile() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Group screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen
          options={({ route }) => ({
            headerTitle: "Category",
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerBlurEffect: "systemMaterial",
            headerTitleStyle: {
              color: "#284F49",
              fontSize: 20,
            },
          })}
          name="Category"
          component={Category}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
