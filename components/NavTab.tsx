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
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
const Tab = createMaterialBottomTabNavigator();

interface IconProps {
  color: string;
}

function NavTab() {
  const basket = useAppSelector((state: RootState) => state.basket);
  const { numberOfBasketItems, numberOfFavItems } = basket;

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
          tabBarIcon: ({ color }: IconProps) => (
            <HomeIcon color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Basket"
        component={Card}
        options={{
          tabBarBadge: numberOfBasketItems === 0 ? false : numberOfBasketItems,
          tabBarIcon: ({ color }: IconProps) => (
            <ShoppingBagIcon color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarBadge: numberOfFavItems === 0 ? false : numberOfFavItems,
          tabBarIcon: ({ color }: IconProps) => (
            <HeartIcon color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }: IconProps) => (
            <UserIcon color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default NavTab;
