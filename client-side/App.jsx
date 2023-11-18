import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/LandingPage'
import JournalPage from './screens/JournalPage'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: true}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="JournalPage" component={JournalPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}