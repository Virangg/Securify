import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions, ActivityIndicator } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types/navigation'
import { useEffect, useState } from 'react'
import Pdf from 'react-native-pdf'
import RNFS from 'react-native-fs'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'

const windowWidth = Dimensions.get('window').width

function renderTable(data: string[][]) {
  return (
    <ScrollView horizontal style={{ marginVertical: 10 }}>
      <View>
        {data.map((row, i) => (
          <View key={i} style={{ flexDirection: 'row' }}>
            {row.map((cell, j) => (
              <View key={j} style={{ borderWidth: 1, borderColor: '#E5E7EB', padding: 6, minWidth: 80 }}>
                <Text style={{ fontSize: 12 }}>{cell}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

type Props = NativeStackScreenProps<RootStackParamList, 'FilePreview'>

export default function FilePreviewScreen(props: Props) {
  const { navigation, route } = props;
  const { file } = route.params
  const [textContent, setTextContent] = useState<string | null>(null)
  const [csvData, setCsvData] = useState<string[][] | null>(null)
  const [excelData, setExcelData] = useState<string[][] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadFile = async () => {
      if (!file.uri) return;
      setLoading(true)
      try {
        if (file.type && file.type.startsWith('text')) {
          const content = await RNFS.readFile(file.uri, 'utf8')
          setTextContent(content)
        } else if (file.type && (file.type.includes('csv') || file.name.endsWith('.csv'))) {
          const content = await RNFS.readFile(file.uri, 'utf8')
          const parsed = Papa.parse(content)
          setCsvData(parsed.data as string[][])
        } else if (file.type && (file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
          const b64 = await RNFS.readFile(file.uri, 'base64')
          const wb = XLSX.read(b64, { type: 'base64' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][]
          setExcelData(data)
        }
      } catch (e) {
        setTextContent('Error loading file')
      } finally {
        setLoading(false)
      }
    }
    loadFile()
  }, [file])

  let previewContent = null
  if (loading) {
    previewContent = <ActivityIndicator size="large" color="#3B82F6" style={{ margin: 32 }} />
  } else if (file.type && file.type.startsWith('image') && file.uri) {
    previewContent = <Image source={{ uri: file.uri }} style={{ width: 200, height: 200, borderRadius: 12 }} resizeMode="contain" />
  } else if (file.type && file.type.includes('pdf') && file.uri) {
    previewContent = (
      <Pdf
        source={{ uri: file.uri }}
        style={{ width: windowWidth - 48, height: 400, borderRadius: 12 }}
        trustAllCerts={true}
        renderActivityIndicator={() => <ActivityIndicator size="large" color="#3B82F6" />}
      />
    )
  } else if (file.type && file.type.startsWith('text') && textContent) {
    previewContent = (
      <ScrollView style={{ maxHeight: 300, backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12 }}>
        <Text style={{ fontSize: 14 }}>{textContent}</Text>
      </ScrollView>
    )
  } else if ((file.type && file.type.includes('csv')) && csvData) {
    previewContent = renderTable(csvData)
  } else if ((file.type && (file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) && excelData) {
    previewContent = renderTable(excelData)
  } else {
    previewContent = <Text style={styles.previewText}>No preview available</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.fileName} numberOfLines={1}>
          {file.name}
        </Text>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-vert" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.previewContainer}>
          <View style={styles.documentPreview}>
            {previewContent}
          </View>
        </View>

        <View style={styles.fileDetails}>
          <Text style={styles.detailsTitle}>File Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Size:</Text>
            <Text style={styles.detailValue}>{file.size ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Unknown'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Modified:</Text>
            <Text style={styles.detailValue}>{file.modified || file.date || 'Unknown'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailValue}>{file.type || 'Unknown'}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="file-download" size={20} color="#3B82F6" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={20} color="#10B981" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="delete" size={20} color="#EF4444" />
          <Text style={[styles.actionText, { color: "#EF4444" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  fileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  previewContainer: {
    margin: 24,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
  },
  documentPreview: {
    alignItems: "center",
  },
  previewText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  previewSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
  fileDetails: {
    margin: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
  },
  actionButton: {
    alignItems: "center",
    padding: 12,
  },
  actionText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    fontWeight: "500",
  },
})
