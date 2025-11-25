import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { useThemeColor } from "@/hooks/use-theme-color"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, TouchableOpacity, View } from "react-native"

type StockHeaderProps = {
  onAddPress: () => void
}

export function StockHeader({ onAddPress }: StockHeaderProps) {
  const iconColor = useThemeColor({}, "icon")
  const tintColor = useThemeColor({}, "tint")

  return (
    <ThemedView style={styles.header}>
      <View style={styles.headerContent}>
        <View>
          <ThemedText type="title" style={styles.title}>
            Stok Yönetimi
          </ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Kebapçı Envanter Sistemi
          </ThemedText>
        </View>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: tintColor }]} onPress={onAddPress}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
})
