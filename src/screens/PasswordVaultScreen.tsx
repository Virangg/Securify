import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types/navigation'

const mockPasswords = [
  { id: 1, name: "Gmail", username: "john@gmail.com", password: "••••••••", url: "gmail.com", favorite: true },
  { id: 2, name: "GitHub", username: "johndev", password: "••••••••", url: "github.com", favorite: false },
  { id: 3, name: "Netflix", username: "john.doe@email.com", password: "••••••••", url: "netflix.com", favorite: true },
  { id: 4, name: "Bank Account", username: "john_doe", password: "••••••••", url: "mybank.com", favorite: false },
]

type Props = NativeStackScreenProps<RootStackParamList, 'PasswordVault'>

export default function PasswordVaultScreen(props: Props) {
  const { navigation } = props;
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.title}>Password Vault</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search passwords..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultCount}>{mockPasswords.length} passwords</Text>

        {mockPasswords.map((item) => (
          <View key={item.id} style={styles.passwordCard}>
            <View style={styles.passwordIcon}>
              <Icon name="language" size={20} color="#EF4444" />
            </View>
            <View style={styles.passwordInfo}>
              <Text style={styles.passwordName}>{item.name}</Text>
              <Text style={styles.passwordUsername}>{item.username}</Text>
              <Text style={styles.passwordUrl}>{item.url}</Text>
            </View>
            <View style={styles.passwordActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="visibility" size={18} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="content-copy" size={18} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="more-vert" size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddPassword")}>
        <Icon name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  resultCount: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  passwordCard: {
    flexDirection: "row",
    alignItems: "center",
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
  passwordIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  passwordInfo: {
    flex: 1,
  },
  passwordName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  passwordUsername: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  passwordUrl: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  passwordActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
})
