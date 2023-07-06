import {
  CompositeNavigationProp,
  NavigationProp,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  HomePage: undefined;
  Search: { search: string };
  Category: { category: string };
  SeeAll: { title: string };
};

export type AppStackProps = {
  Landing: undefined;
  Auth: undefined;
  SignUp: undefined;
  Nav: undefined;
  Product: { id: string };
};

export type ProductionProps = NativeStackScreenProps<AppStackProps, "Product">;

export type CategoryProps = NativeStackScreenProps<
  RootStackParamList,
  "Category"
>;

export type SearchProps = NativeStackScreenProps<RootStackParamList, "Search">;

export type ProductScreenNavigationProp = CompositeNavigationProp<
  NavigationProp<AppStackProps, "Product">,
  NavigationProp<AppStackProps>
>;

export type CardDisplayNavigationProp = CompositeNavigationProp<
  NavigationProp<RootStackParamList, "SeeAll">,
  NavigationProp<AppStackProps>
>;

export type SearchNavigationProp = CompositeNavigationProp<
  NavigationProp<RootStackParamList, "Search">,
  NavigationProp<AppStackProps>
>;

export type CategoryNavigationProp = CompositeNavigationProp<
  NavigationProp<RootStackParamList, "Category">,
  NavigationProp<AppStackProps>
>;
