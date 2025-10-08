import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';


const initialStok = [
  { id: '1', name: 'Lahmacun', quantity: 50, unit: 'adet', price: 12 },
  { id: '2', name: 'Kebap', quantity: 30, unit: 'adet', price: 45 },
  { id: '3', name: 'Ayran', quantity: 100, unit: 'şişe', price: 5 },
];

export default function Stok() {
  const [stok, setStok] = useState(initialStok);

  const renderItem = ({ item }: any) => (
    <LinearGradient colors={['#f5f6fa', '#dcdde1']} style={styles.card}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>Miktar: {item.quantity} {item.unit}</Text>
        <Text style={styles.itemDetails}>Birim Fiyat: {item.price}₺</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => Alert.alert('Düzenle', `Ürün: ${item.name}`)}>
          <MaterialIcons name="edit" size={24} color="#2980b9" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 10 }}>
          <MaterialIcons name="delete" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      "Onay",
      "Bu ürünü silmek istiyor musunuz?",
      [
        { text: "İptal", style: "cancel" },
        { text: "Sil", style: "destructive", onPress: () => setStok(prev => prev.filter(item => item.id !== id)) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stok Listesi</Text>

      <FlatList
        data={stok}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Yeni Ürün', 'Burada yeni ürün eklemesi yapılacak.')}>
        <LinearGradient colors={['#f39c12', '#e67e22']} style={styles.addButtonGradient}>
          <MaterialIcons name="add" size={28} color="#fff" />
          <Text style={styles.addButtonText}>Yeni Ürün Ekle</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f3f5", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#e74c3c", marginBottom: 15, textAlign: "center" },
  card: { 
    padding: 15, 
    borderRadius: 15, 
    backgroundColor: "#fff", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width:0, height:3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  itemName: { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  itemDetails: { fontSize: 14, color: "#7f8c8d" },
  actions: { flexDirection: "row" },
  addButton: { marginTop: 10, alignItems: "center" },
  addButtonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 14, borderRadius: 12 },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
});
