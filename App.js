import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import Test from './components/Test';
export default function App() {
  return (
    <SafeAreaView>
      <Test />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}