import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { useThemeColor } from "@/hooks/use-theme-color"
import type { Product } from "@/screens/Stok"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"

type StockStatsProps = {
  products: Product[]
}

export function StockStats({ products }: StockStatsProps) {
  const tintColor = useThemeColor({}, "tint")
  const backgroundColor = useThemeColor({}, "background")

  const totalProducts = products.length
  const lowStockCount = products.filter((p) => p.quantity <= p.minQuantity).length
  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0)
  const totalValue = products.reduce((sum, p) => sum + p.quantity * p.price, 0)

  const stats = [
    {
      icon: "cube-outline",
      label: "Toplam Ürün",
      value: totalProducts.toString(),
      color: "#3b82f6",
    },
    {
      icon: "warning-outline",
      label: "Düşük Stok",
      value: lowStockCount.toString(),
      color: "#f59e0b",
    },
    {
      icon: "layers-outline",
      label: "Toplam Adet",
      value: totalQuantity.toString(),
      color: "#10b981",
    },
    {
      icon: "cash-outline",
      label: "Toplam Değer",
      value: `₺${totalValue.toLocaleString()}`,
      color: "#8b5cf6",
    },
  ]

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <ThemedView key={index} style={[styles.statCard]}>
          <View style={[styles.iconContainer, { backgroundColor: stat.color }]}>
            <Ionicons name={stat.icon as any} size={24} color="#fff" />
          </View>
          <ThemedText type="default" style={styles.label}>
            {stat.label}
          </ThemedText>
          <ThemedText type="subtitle" style={styles.value}>
            {stat.value}
          </ThemedText>
        </ThemedView>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: "47%",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.7,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
  },
})
