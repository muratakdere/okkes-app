import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { MaterialIcons } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Alert.alert("Başarılı", "Çıkış yapıldı");
    } catch (error) {
      Alert.alert("Hata", "Çıkış yapılamadı");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.infoCard}>
        <MaterialIcons name="person" size={28} color="#e74c3c" />
        <Text style={styles.infoText}>Email: {user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#fff" />
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f3f5" },
  title: { fontSize: 26, fontWeight: "bold", color: "#e74c3c", marginBottom: 20, textAlign: "center" },
  infoCard: { flexDirection: "row", alignItems: "center", padding: 15, borderRadius: 15, backgroundColor: "#fff", marginBottom: 20, shadowColor: "#000", shadowOffset: {width:0, height:3}, shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 },
  infoText: { marginLeft: 10, fontSize: 16, color: "#2c3e50" },
  logoutButton: { flexDirection: "row", backgroundColor: "#e74c3c", padding: 14, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
});
