import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';

export default function Dashboard({ navigation }: any) {
  
  const stokCount = 120;
  const gelir = 15200;
  const gider = 7400;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Stok Kartı */}
      <TouchableOpacity onPress={() => navigation.navigate("Stok")}>
        <LinearGradient colors={['#3498db', '#2980b9']} style={styles.card}>
          <MaterialIcons name="inventory" size={28} color="#fff" />
          <Text style={styles.cardTitle}>Toplam Stok</Text>
          <Text style={styles.cardValue}>{stokCount}</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Gelir Kartı */}
      <TouchableOpacity onPress={() => navigation.navigate("GelirGider")}>
        <LinearGradient colors={['#2ecc71', '#27ae60']} style={styles.card}>
          <MaterialIcons name="attach-money" size={28} color="#fff" />
          <Text style={styles.cardTitle}>Toplam Gelir</Text>
          <Text style={styles.cardValue}>{gelir}₺</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Gider Kartı */}
      <TouchableOpacity onPress={() => navigation.navigate("GelirGider")}>
        <LinearGradient colors={['#e74c3c', '#c0392b']} style={styles.card}>
          <MaterialIcons name="money-off" size={28} color="#fff" />
          <Text style={styles.cardTitle}>Toplam Gider</Text>
          <Text style={styles.cardValue}>{gider}₺</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f3f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#e74c3c", textAlign: "center" },
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width:0, height:3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  cardValue: { color: "#fff", fontSize: 22, fontWeight: "bold" },
});
