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
  Checkout: undefined;
};

export type ProductionProps = NativeStackScreenProps<AppStackProps, "Product">;
