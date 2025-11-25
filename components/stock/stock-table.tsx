"use client"

import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { useThemeColor } from "@/hooks/use-theme-color"
import type { Product } from "@/screens/Stok"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { EditQuantityDialog } from "./edit-quantity-dialog"
    
type StockTableProps = {
  products: Product[]
  searchQuery: string
  onSearchChange: (query: string) => void
  categoryFilter: string
  onCategoryChange: (category: string) => void
  categories: string[]
  onUpdateQuantity: (id: string, newQuantity: number) => void
  onDeleteProduct: (id: string) => void
}

export function StockTable({
  products,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
  onUpdateQuantity,
  onDeleteProduct,
}: StockTableProps) {
  const iconColor = useThemeColor({}, "icon")
  const tintColor = useThemeColor({}, "tint")
  const textColor = useThemeColor({}, "text")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const getStatusColor = (product: Product) => {
    if (product.quantity <= product.minQuantity) return "#f59e0b"
    if (product.quantity <= product.minQuantity * 1.5) return "#eab308"
    return "#10b981"
  }

  const getStatusText = (product: Product) => {
    if (product.quantity <= product.minQuantity) return "Düşük"
    if (product.quantity <= product.minQuantity * 1.5) return "Orta"
    return "İyi"
  }

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={iconColor} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Ürün ara..."
            placeholderTextColor={iconColor}
            value={searchQuery}
            onChangeText={onSearchChange}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                categoryFilter === category && {
                  backgroundColor: tintColor,
                },
              ]}
              onPress={() => onCategoryChange(category)}
            >
              <ThemedText
                type="defaultSemiBold"
                style={[styles.categoryText, categoryFilter === category && styles.categoryTextActive]}
              >
                {category === "all" ? "Tümü" : category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.table}>
        {products.map((product) => (
          <ThemedView key={product.id} style={styles.productCard}>
            <View style={styles.productHeader}>
              <View style={styles.productInfo}>
                <ThemedText type="defaultSemiBold" style={styles.productName}>
                  {product.name}
                </ThemedText>
                <ThemedText type="default" style={styles.productCategory}>
                  {product.category}
                </ThemedText>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(product) }]}>
                <ThemedText type="default" style={styles.statusText}>
                  {getStatusText(product)}
                </ThemedText>
              </View>
            </View>

            <View style={styles.productDetails}>
              <View style={styles.detailRow}>
                <ThemedText type="default" style={styles.detailLabel}>
                  Miktar:
                </ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.detailValue}>
                  {product.quantity} {product.unit}
                </ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText type="default" style={styles.detailLabel}>
                  Min. Miktar:
                </ThemedText>
                <ThemedText type="default" style={styles.detailValue}>
                  {product.minQuantity} {product.unit}
                </ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText type="default" style={styles.detailLabel}>
                  Fiyat:
                </ThemedText>
                <ThemedText type="default" style={styles.detailValue}>
                  ₺{product.price}
                </ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText type="default" style={styles.detailLabel}>
                  Son Güncelleme:
                </ThemedText>
                <ThemedText type="default" style={styles.detailValue}>
                  {product.lastUpdated}
                </ThemedText>
              </View>
            </View>

            <View style={styles.productActions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: tintColor }]}
                onPress={() => setEditingProduct(product)}
              >
                <Ionicons name="create-outline" size={20} color="#fff" />
                <ThemedText type="default" style={styles.actionButtonText}>
                  Düzenle
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => onDeleteProduct(product.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#fff" />
                <ThemedText type="default" style={styles.actionButtonText}>
                  Sil
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        ))}
      </View>

      {editingProduct && (
        <EditQuantityDialog
          visible={true}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={(newQuantity) => {
            onUpdateQuantity(editingProduct.id, newQuantity)
            setEditingProduct(null)
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  filters: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  categoryText: {
    fontSize: 14,
  },
  categoryTextActive: {
    color: "#fff",
  },
  table: {
    gap: 12,
  },
  productCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  productDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  detailValue: {
    fontSize: 14,
  },
  productActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
})
