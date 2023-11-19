import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/LandingPage'
import LoginPage from './screens/LoginPage'
import SignupPage from './screens/SignupPage';
import JournalPage from './screens/JournalPage';
import Onboarding from './components/Onboarding/Onboarding';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="JournalPage" component={JournalPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
