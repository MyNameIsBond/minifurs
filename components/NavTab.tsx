import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import {
  HomeIcon,
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";
import Favourite from "../screens/Favourite";
import Card from "../screens/Card";
const Tab = createMaterialBottomTabNavigator();

function NavTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#E68314"
      barStyle={{ backgroundColor: "#ffffff" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name="Card"
        component={Card}
        options={{
          tabBarIcon: ({ color }) => (
            <ShoppingBagIcon color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({ color }) => <HeartIcon color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <UserIcon color={color} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default NavTab;
