import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';


const initialData = [
  { id: '1', type: 'Gelir', title: 'Satış Geliri', amount: 15200 },
  { id: '2', type: 'Gider', title: 'Malzeme Gideri', amount: 7400 },
  { id: '3', type: 'Gider', title: 'Elektrik Gideri', amount: 1200 },
  { id: '4', type: 'Gelir', title: 'Ek Gelir', amount: 500 },
];

export default function GelirGider() {
  const [data, setData] = useState(initialData);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.title}>Gelir / Gider</Text>

      {data.map(item => (
        <LinearGradient
          key={item.id}
          colors={item.type === 'Gelir' ? ['#2ecc71', '#27ae60'] : ['#e74c3c', '#c0392b']}
          style={styles.card}
        >
          <MaterialIcons
            name={item.type === 'Gelir' ? 'attach-money' : 'money-off'}
            size={28}
            color="#fff"
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardAmount}>{item.amount}₺</Text>
          </View>
          <TouchableOpacity onPress={() => alert(`${item.title} düzenlenecek.`)}>
            <MaterialIcons name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => alert("Yeni gelir/gider ekleme ekranı açılacak.")}
      >
        <LinearGradient colors={['#f39c12', '#e67e22']} style={styles.addButtonGradient}>
          <MaterialIcons name="add" size={28} color="#fff" />
          <Text style={styles.addButtonText}>Yeni Gelir/Gider Ekle</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f3f5", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#e74c3c", marginBottom: 20, textAlign: "center" },
  card: {
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width:0, height:3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  cardAmount: { color: "#fff", fontSize: 16, marginTop: 4 },
  addButton: { marginTop: 10, alignItems: "center" },
  addButtonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 14, borderRadius: 12 },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
});
