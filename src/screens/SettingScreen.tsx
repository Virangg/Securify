import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch, Alert } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types/navigation'
import DocumentPicker from '@react-native-documents/picker'

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>

export default function SettingsScreen(props: Props) {
  const { navigation } = props;
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false)

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: () => {} },
    ])
  }

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This will permanently delete all your files and passwords. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", style: "destructive", onPress: () => {} },
      ],
    )
  }

  const handleImportBackup = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      Alert.alert('File Selected', res[0]?.name || 'No file name');
    } catch (err) {
      // @react-native-documents/picker does not have isCancel, so just ignore if user cancels
      if (err instanceof Error && err.message && err.message.toLowerCase().includes('cancel')) {
        // User cancelled the picker
      } else {
        Alert.alert('Error', 'Unknown error: ' + JSON.stringify(err));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="fingerprint" size={20} color="#3B82F6" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Biometric Login</Text>
                <Text style={styles.settingSubtitle}>Use Face ID or Touch ID</Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: "#E5E7EB", true: "#DBEAFE" }}
              thumbColor={biometricEnabled ? "#3B82F6" : "#9CA3AF"}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="vpn-key" size={20} color="#10B981" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Change Master Password</Text>
                <Text style={styles.settingSubtitle}>Update your account password</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Backup & Sync</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="file-download" size={20} color="#8B5CF6" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Export Backup</Text>
                <Text style={styles.settingSubtitle}>Download encrypted backup file</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleImportBackup}>
            <View style={styles.settingInfo}>
              <Icon name="file-upload" size={20} color="#F59E0B" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Import Backup</Text>
                <Text style={styles.settingSubtitle}>Restore from backup file</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="cloud" size={20} color="#06B6D4" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Cloud Sync</Text>
                <Text style={styles.settingSubtitle}>Sync across devices</Text>
              </View>
            </View>
            <Switch
              value={cloudSyncEnabled}
              onValueChange={setCloudSyncEnabled}
              trackColor={{ false: "#E5E7EB", true: "#CFFAFE" }}
              thumbColor={cloudSyncEnabled ? "#06B6D4" : "#9CA3AF"}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
            <View style={styles.settingInfo}>
              <Icon name="logout" size={20} color="#6B7280" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Sign Out</Text>
                <Text style={styles.settingSubtitle}>Sign out of your account</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Update Email</Text>
                <Text style={styles.settingSubtitle}>Change your account email</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleClearData}>
            <View style={styles.settingInfo}>
              <Icon name="delete-forever" size={20} color="#EF4444" />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: "#EF4444" }]}>Clear All Data</Text>
                <Text style={styles.settingSubtitle}>Delete all files and passwords</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>SecureVault v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 SecureVault. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 32,
  },
  appVersion: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: "#9CA3AF",
  },
})
