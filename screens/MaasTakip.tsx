import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const categories = [
    { id: 'Garson', title: 'Garsonlar', icon: 'restaurant-menu', colors: ['#3498db', '#2980b9'] },
    { id: 'Usta', title: 'Ustalar', icon: 'restaurant', colors: ['#e67e22', '#d35400'] },
    { id: 'Kasiyer', title: 'Kasiyerler', icon: 'point-of-sale', colors: ['#9b59b6', '#8e44ad'] },
    { id: 'Bulaşıkçı', title: 'Bulaşıkçılar', icon: 'cleaning-services', colors: ['#2ecc71', '#27ae60'] },
];

export default function MaasTakip() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.headerTitle}>Personel Kategorileri</Text>
            <View style={styles.grid}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={styles.cardContainer}
                        onPress={() => navigation.navigate('EmployeeList', { category: cat.id })}
                    >
                        <LinearGradient colors={cat.colors} style={styles.card}>
                            <MaterialIcons name={cat.icon as any} size={40} color="#fff" />
                            <Text style={styles.cardTitle}>{cat.title}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddEmployee')}
            >
                <MaterialIcons name="person-add" size={24} color="#fff" />
                <Text style={styles.addButtonText}>Yeni Çalışan Ekle</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f3f5",
    },
    content: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#34495e",
        textAlign: "center",
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardContainer: {
        width: '48%',
        marginBottom: 15,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    card: {
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        height: 150,
    },
    cardTitle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#2ecc71',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
