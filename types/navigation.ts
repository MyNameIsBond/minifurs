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
