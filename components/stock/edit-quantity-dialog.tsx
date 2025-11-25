"use client"

import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { useThemeColor } from "@/hooks/use-theme-color"
import type { Product } from "@/screens/Stok"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

type EditQuantityDialogProps = {
  visible: boolean
  product: Product
  onClose: () => void
  onUpdate: (newQuantity: number) => void
}

export function EditQuantityDialog({ visible, product, onClose, onUpdate }: EditQuantityDialogProps) {
  const tintColor = useThemeColor({}, "tint")
  const textColor = useThemeColor({}, "text")
  const iconColor = useThemeColor({}, "icon")

  const [quantity, setQuantity] = useState(product.quantity.toString())

  const handleUpdate = () => {
    const newQuantity = Number.parseFloat(quantity)
    if (isNaN(newQuantity) || newQuantity < 0) {
      alert("Lütfen geçerli bir miktar girin")
      return
    }
    onUpdate(newQuantity)
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <ThemedView style={styles.dialog}>
          <View style={styles.header}>
            <View>
              <ThemedText type="title">Miktar Güncelle</ThemedText>
              <ThemedText type="default" style={styles.productName}>
                {product.name}
              </ThemedText>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={iconColor} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.currentInfo}>
              <ThemedText type="default" style={styles.infoLabel}>
                Mevcut Miktar:
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.infoValue}>
                {product.quantity} {product.unit}
              </ThemedText>
            </View>

            <View style={styles.field}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Yeni Miktar
              </ThemedText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, { color: textColor }]}
                  placeholder="0"
                  placeholderTextColor={iconColor}
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={setQuantity}
                />
                <ThemedText type="default" style={styles.unit}>
                  {product.unit}
                </ThemedText>
              </View>
            </View>

            <View style={styles.quickButtons}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => setQuantity((Number.parseFloat(quantity) - 10).toString())}
              >
                <ThemedText type="defaultSemiBold">-10</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => setQuantity((Number.parseFloat(quantity) - 1).toString())}
              >
                <ThemedText type="defaultSemiBold">-1</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => setQuantity((Number.parseFloat(quantity) + 1).toString())}
              >
                <ThemedText type="defaultSemiBold">+1</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => setQuantity((Number.parseFloat(quantity) + 10).toString())}
              >
                <ThemedText type="defaultSemiBold">+10</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <ThemedText type="defaultSemiBold" style={styles.cancelText}>
                İptal
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]} onPress={handleUpdate}>
              <ThemedText type="defaultSemiBold" style={styles.updateText}>
                Güncelle
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dialog: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  productName: {
    marginTop: 4,
    opacity: 0.7,
  },
  content: {
    padding: 20,
  },
  currentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  unit: {
    paddingRight: 16,
    fontSize: 14,
    opacity: 0.7,
  },
  quickButtons: {
    flexDirection: "row",
    gap: 8,
  },
  quickButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    alignItems: "center",
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
  updateText: {
    fontSize: 16,
    color: "#fff",
  },
})
