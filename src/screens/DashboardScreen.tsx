import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Modal} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types/navigation'
import { useState } from "react"

const categories = [
  { id: "documents", title: "Documents", icon: "description", count: 12, color: "#3B82F6" },
  { id: "spreadsheets", title: "Spreadsheets", icon: "table-chart", count: 5, color: "#10B981" },
  { id: "images", title: "Images", icon: "image", count: 28, color: "#F59E0B" },
  { id: "text", title: "Text Files", icon: "text-snippet", count: 8, color: "#8B5CF6" },
  { id: "passwords", title: "Password Vault", icon: "lock", count: 15, color: "#EF4444" },
]
const [modalvisible, SetModalVisible ] = useState(false)

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>

export default function DashboardScreen(props: Props) {
  const { navigation } = props;

  const handleAdd = () =>{
    SetModalVisible(true)
  }

  const handleClose = () =>{
    SetModalVisible(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Your Secure Vault</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Settings")}>
          <Icon name="person" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.searchBar}>
        <Icon name="search" size={20} color="#9CA3AF" />
        <Text style={styles.searchPlaceholder}>Search your files...</Text>
      </TouchableOpacity>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Categories</Text>

        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() =>
                category.id === "passwords"
                  ? navigation.navigate("PasswordVault")
                  : navigation.navigate("FileList", { category: category.id })
              }
            >
              <View style={[styles.iconContainer, { backgroundColor: `${category.color}15` }]}>
                <Icon name={category.icon} size={28} color={category.color} />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryCount}>{category.count} items</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Files</Text>

          <View style={styles.recentFile}>
            <View style={styles.fileIcon}>
              <Icon name="description" size={20} color="#3B82F6" />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>Project Proposal.pdf</Text>
              <Text style={styles.fileDate}>Modified 2 hours ago</Text>
            </View>
          </View>

          <View style={styles.recentFile}>
            <View style={styles.fileIcon}>
              <Icon name="table-chart" size={20} color="#10B981" />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>Budget 2024.xlsx</Text>
              <Text style={styles.fileDate}>Modified yesterday</Text>
            </View>
          </View>

          <View style={styles.recentFile}>
            <View style={styles.fileIcon}>
              <Icon name="image" size={20} color="#F59E0B" />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>ID_Scan.jpg</Text>
              <Text style={styles.fileDate}>Modified 3 days ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleAdd}>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: "#9CA3AF",
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  categoryCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: "#6B7280",
  },
  recentSection: {
    marginBottom: 100,
  },
  recentFile: {
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
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 4,
  },
  fileDate: {
    fontSize: 14,
    color: "#6B7280",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
})
