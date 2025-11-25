"use client"

import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { useThemeColor } from "@/hooks/use-theme-color"
import type { Product } from "@/screens/Stok"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

type AddProductDialogProps = {
  visible: boolean
  onClose: () => void
  onAdd: (product: Omit<Product, "id" | "lastUpdated">) => void
}

const CATEGORIES = ["Sebze", "Et", "Bulaşık", "Salon", "Kasa", "Paket Ürünleri"]
const UNITS = ["kg", "adet", "litre", "paket", "rulo", "kutu"]

export function AddProductDialog({ visible, onClose, onAdd }: AddProductDialogProps) {
  const tintColor = useThemeColor({}, "tint")
  const textColor = useThemeColor({}, "text")
  const iconColor = useThemeColor({}, "icon")

  const [name, setName] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState(UNITS[0])
  const [minQuantity, setMinQuantity] = useState("")
  const [price, setPrice] = useState("")

  const handleAdd = () => {
    if (!name || !quantity || !minQuantity || !price) {
      alert("Lütfen tüm alanları doldurun")
      return
    }

    onAdd({
      name,
      category,
      quantity: Number.parseFloat(quantity),
      unit,
      minQuantity: Number.parseFloat(minQuantity),
      price: Number.parseFloat(price),
    })

    // Reset form
    setName("")
    setCategory(CATEGORIES[0])
    setQuantity("")
    setUnit(UNITS[0])
    setMinQuantity("")
    setPrice("")
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <ThemedView style={styles.dialog}>
          <View style={styles.header}>
            <ThemedText type="title">Yeni Ürün Ekle</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={iconColor} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.field}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Ürün Adı *
              </ThemedText>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Örn: Domates"
                placeholderTextColor={iconColor}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.field}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Kategori *
              </ThemedText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.optionButton,
                      category === cat && {
                        backgroundColor: tintColor,
                      },
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <ThemedText type="default" style={[styles.optionText, category === cat && styles.optionTextActive]}>
                      {cat}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.row}>
              <View style={[styles.field, styles.fieldHalf]}>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                  Miktar *
                </ThemedText>
                <TextInput
                  style={[styles.input, { color: textColor }]}
                  placeholder="0"
                  placeholderTextColor={iconColor}
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={setQuantity}
                />
              </View>

              <View style={[styles.field, styles.fieldHalf]}>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                  Birim *
                </ThemedText>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
                  {UNITS.map((u) => (
                    <TouchableOpacity
                      key={u}
                      style={[
                        styles.optionButton,
                        unit === u && {
                          backgroundColor: tintColor,
                        },
                      ]}
                      onPress={() => setUnit(u)}
                    >
                      <ThemedText type="default" style={[styles.optionText, unit === u && styles.optionTextActive]}>
                        {u}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.field}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Minimum Miktar *
              </ThemedText>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="0"
                placeholderTextColor={iconColor}
                keyboardType="numeric"
                value={minQuantity}
                onChangeText={setMinQuantity}
              />
            </View>

            <View style={styles.field}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Fiyat (₺) *
              </ThemedText>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="0.00"
                placeholderTextColor={iconColor}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <ThemedText type="defaultSemiBold" style={styles.cancelText}>
                İptal
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]} onPress={handleAdd}>
              <ThemedText type="defaultSemiBold" style={styles.addText}>
                Ekle
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  dialog: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  content: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  fieldHalf: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  optionsScroll: {
    flexGrow: 0,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  optionText: {
    fontSize: 14,
  },
  optionTextActive: {
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  cancelText: {
    fontSize: 16,
  },
  addText: {
    fontSize: 16,
    color: "#fff",
  },
})
