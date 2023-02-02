import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Category from "./Home/Category";
import HomePage from "./Home/HomePage";
import Search from "./Home/Search";
import SeeAll from "./SeeAll";

const Stack = createNativeStackNavigator();
export default function Profile({}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Group screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="Search"
          options={({ route }) => ({
            headerTitle: route.params?.search,
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerBlurEffect: "systemMaterial",
            headerTitleStyle: {
              color: "#284F49",
              fontSize: 20,
            },
          })}
          component={Search}
        />
        <Stack.Screen
          options={({ route }) => ({
            headerTitle: route.params?.category,
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
        <Stack.Screen
          options={({ route }) => ({
            headerTitle: route.params?.title,
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerBlurEffect: "systemMaterial",
            headerTitleStyle: {
              color: "#284F49",
              fontSize: 20,
            },
          })}
          name="SeeAll"
          component={SeeAll}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
