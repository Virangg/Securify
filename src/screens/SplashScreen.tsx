import { View, Text, StyleSheet, Dimensions } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/MaterialIcons"

const { width, height } = Dimensions.get("window")

export default function SplashScreen() {
  return (
    <LinearGradient colors={["#F8FAFC", "#E2E8F0"]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Icon name="security" size={80} color="#3B82F6" />
        </View>
        <Text style={styles.appName}>SecureVault</Text>
        <Text style={styles.tagline}>Your Personal Data Manager</Text>

        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <View style={styles.loadingProgress} />
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 60,
    textAlign: "center",
  },
  loadingContainer: {
    width: 200,
    alignItems: "center",
  },
  loadingBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  loadingProgress: {
    width: "60%",
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 2,
  },
})
