import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Switch } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types/navigation'

type Props = NativeStackScreenProps<RootStackParamList, 'Biometric'>
type BiometricScreenProps = Props & { onAuthenticated: () => void }

export default function BiometricScreen(props: BiometricScreenProps) {
  const { navigation, onAuthenticated } = props;
  const [biometricEnabled, setBiometricEnabled] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="fingerprint" size={60} color="#3B82F6" />
          </View>
          <Text style={styles.title}>Enable Biometric Security</Text>
          <Text style={styles.subtitle}>Use Face ID or Touch ID for quick and secure access to your vault</Text>
        </View>

        <View style={styles.benefits}>
          <View style={styles.benefitItem}>
            <Icon name="security" size={20} color="#10B981" />
            <Text style={styles.benefitText}>Enhanced security for your data</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon name="security" size={20} color="#10B981" />
            <Text style={styles.benefitText}>Quick access without typing passwords</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon name="security" size={20} color="#10B981" />
            <Text style={styles.benefitText}>Your biometric data stays on device</Text>
          </View>
        </View>

        <View style={styles.toggleContainer}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Enable Biometric Login</Text>
              <Text style={styles.toggleSubtitle}>Use Face ID to unlock your vault</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: "#E5E7EB", true: "#DBEAFE" }}
              thumbColor={biometricEnabled ? "#3B82F6" : "#9CA3AF"}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, biometricEnabled && styles.continueButtonActive]}
            onPress={onAuthenticated}
          >
            <Text style={[styles.continueButtonText, biometricEnabled && styles.continueButtonTextActive]}>
              Continue
            </Text>
            <Icon name="arrow-forward" size={20} color={biometricEnabled ? "#FFFFFF" : "#6B7280"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={onAuthenticated}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: "#F0F9FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  benefits: {
    marginBottom: 40,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  benefitText: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 12,
    flex: 1,
  },
  toggleContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  toggleSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  footer: {
    alignItems: "center",
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    width: "100%",
  },
  continueButtonActive: {
    backgroundColor: "#3B82F6",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    marginRight: 8,
  },
  continueButtonTextActive: {
    color: "#FFFFFF",
  },
  skipButton: {
    padding: 12,
  },
  skipButtonText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
})
