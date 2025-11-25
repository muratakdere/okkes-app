import { AddProductDialog } from "@/components/stock/add-product-dialog"
import { StockHeader } from "@/components/stock/stock-header"
import { StockStats } from "@/components/stock/stock-stats"
import { StockTable } from "@/components/stock/stock-table"
import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

export type Product = {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  minQuantity: number
  price: number
  lastUpdated: string
}

export default function Stok() {
  const colorScheme = useColorScheme()
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Domates",
      category: "Sebze",
      quantity: 25,
      unit: "kg",
      minQuantity: 10,
      price: 45,
      lastUpdated: "2025-11-20",
    },
    {
      id: "2",
      name: "Soğan",
      category: "Sebze",
      quantity: 18,
      unit: "kg",
      minQuantity: 15,
      price: 30,
      lastUpdated: "2025-11-22",
    },
    {
      id: "3",
      name: "Dana Döner Eti",
      category: "Et",
      quantity: 40,
      unit: "kg",
      minQuantity: 20,
      price: 450,
      lastUpdated: "2025-11-23",
    },
    {
      id: "4",
      name: "Kuzu Şiş Eti",
      category: "Et",
      quantity: 5,
      unit: "kg",
      minQuantity: 10,
      price: 550,
      lastUpdated: "2025-11-24",
    },
    {
      id: "5",
      name: "Tabak",
      category: "Bulaşık",
      quantity: 150,
      unit: "adet",
      minQuantity: 50,
      price: 25,
      lastUpdated: "2025-11-21",
    },
    {
      id: "6",
      name: "Bardak",
      category: "Bulaşık",
      quantity: 80,
      unit: "adet",
      minQuantity: 40,
      price: 15,
      lastUpdated: "2025-11-22",
    },
    {
      id: "7",
      name: "Masa Örtüsü",
      category: "Salon",
      quantity: 12,
      unit: "adet",
      minQuantity: 15,
      price: 75,
      lastUpdated: "2025-11-23",
    },
    {
      id: "8",
      name: "Peçete",
      category: "Salon",
      quantity: 500,
      unit: "paket",
      minQuantity: 100,
      price: 35,
      lastUpdated: "2025-11-20",
    },
    {
      id: "9",
      name: "Nakit (Bozuk Para)",
      category: "Kasa",
      quantity: 200,
      unit: "adet",
      minQuantity: 100,
      price: 1,
      lastUpdated: "2025-11-25",
    },
    {
      id: "10",
      name: "Alüminyum Folyo",
      category: "Paket Ürünleri",
      quantity: 8,
      unit: "rulo",
      minQuantity: 10,
      price: 85,
      lastUpdated: "2025-11-24",
    },
    {
      id: "11",
      name: "Paket Poşet",
      category: "Paket Ürünleri",
      quantity: 120,
      unit: "adet",
      minQuantity: 50,
      price: 3,
      lastUpdated: "2025-11-23",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false)

  const handleAddProduct = (product: Omit<Product, "id" | "lastUpdated">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setProducts([...products, newProduct])
    setIsAddDialogVisible(false)
  }

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity: newQuantity,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : p,
      ),
    )
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  return (
    <ThemedView style={styles.container}>
      <StockHeader onAddPress={() => setIsAddDialogVisible(true)} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <StockStats products={products} />

          <View style={styles.section}>
            <ThemedText type="title" style={styles.sectionTitle}>
              Ürün Envanteri
            </ThemedText>
            <ThemedText type="default" style={styles.sectionSubtitle}>
              Tüm ürünlerinizi takip edin ve yönetin
            </ThemedText>

            <StockTable
              products={filteredProducts}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              categories={categories}
              onUpdateQuantity={handleUpdateQuantity}
              onDeleteProduct={handleDeleteProduct}
            />
          </View>
        </View>
      </ScrollView>

      <AddProductDialog
        visible={isAddDialogVisible}
        onClose={() => setIsAddDialogVisible(false)}
        onAdd={handleAddProduct}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  sectionSubtitle: {
    marginBottom: 16,
    opacity: 0.7,
  },
})
