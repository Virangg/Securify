"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types/navigation'
import { useFileContext } from '../components/FileContext'

// Define the stack param list for navigation typing
type Props = NativeStackScreenProps<RootStackParamList, 'FileList'>

export default function FileListScreen(props: Props) {
  const { navigation, route } = props;
  const [searchQuery, setSearchQuery] = useState("")
  const { category } = route.params
  const { files } = useFileContext();
  const filteredFiles = files.filter(file => file.categoryId === category);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.title}>Documents</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-list" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search files..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sortContainer}>
          <Text style={styles.resultCount}>{filteredFiles.length} files</Text>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>Modified ↓</Text>
          </TouchableOpacity>
        </View>

        {filteredFiles.map((file, idx) => (
          <TouchableOpacity
            key={file.name + idx}
            style={styles.fileCard}
            onPress={() => navigation.navigate("FilePreview", { file })}
          >
            <View style={styles.fileIcon}>
              <Icon name={file.icon} size={24} color={file.color} />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{file.name}</Text>
              <Text style={styles.fileDetails}>
                {file.size ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : ''} {file.modified ? `• ${file.modified}` : ''}
              </Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Icon name="more-vert" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
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
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultCount: {
    fontSize: 14,
    color: "#6B7280",
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  sortText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  fileCard: {
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
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F0F9FF",
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
  fileDetails: {
    fontSize: 14,
    color: "#6B7280",
  },
  moreButton: {
    padding: 8,
  },
})
