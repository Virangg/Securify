import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "react-native"
import type { RootStackParamList } from "./src/types/navigation"
import { FileProvider } from './src/components/FileContext'

// Import screens
import SplashScreen from "./src/screens/SplashScreen"
import LoginScreen from "./src/auth/LoginScreen"
import SignupScreen from "./src/auth/SignUpScreen"
import BiometricScreen from "./src/auth/BiometricScreen"
import DashboardScreen from "./src/screens/DashboardScreen"
import FileListScreen from "./src/screens/FileListScreen"
import FilePreviewScreen from "./src/screens/FilePreviewScreen"
import PasswordVaultScreen from "./src/screens/PasswordVaultScreen"
import AddPasswordScreen from "./src/screens/AddPasswordScreen"
import SettingsScreen from "./src/screens/SettingScreen"


const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Simulate app initialization
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <FileProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#FFFFFF" },
          }}
        >
          {!isAuthenticated ? (
            <>
              <Stack.Screen name="Login">
                {props => (
                  <LoginScreen {...props} onAuthenticated={() => setIsAuthenticated(true)} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {props => (
                  <SignupScreen {...props} onAuthenticated={() => setIsAuthenticated(true)} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Biometric">
                {props => (
                  <BiometricScreen {...props} onAuthenticated={() => setIsAuthenticated(true)} />
                )}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="FileList" component={FileListScreen} />
              <Stack.Screen name="FilePreview" component={FilePreviewScreen} />
              <Stack.Screen name="PasswordVault" component={PasswordVaultScreen} />
              <Stack.Screen name="AddPassword" component={AddPasswordScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="Biometric" component={SettingsScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </FileProvider>
  )
}

