import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import SignupPage from "./screens/SignupPage";
import JournalPage from "./screens/JournalPage";
import Onboarding from "./components/Onboarding/Onboarding";
import ChatFromAi from "./components/ChatOpenAi";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewsPage from "./screens/NewsPage";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LandingPageTabs() {
  return (
    <Tab.Navigator
      initialRouteName="LandingPageTabs"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={LandingPage}
        options={{
          tabBarLabelStyle: { fontSize: 13, marginBottom: 5 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy-outline" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsPage}
        options={{
          tabBarLabelStyle: { fontSize: 13, marginBottom: 5 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatAi"
        component={ChatFromAi}
        options={{
          tabBarLabelStyle: { fontSize: 13, marginBottom: 5 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy-outline" color={color} size={27} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="ChatOpenAi" component={ChatFromAi} />
        <Stack.Screen name="LandingPageTabs" component={LandingPageTabs} />
        <Stack.Screen name="JournalPage" component={JournalPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
