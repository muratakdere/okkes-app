import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EmployeeCategory, EmployeeContext } from "../contexts/EmployeeContext";

export default function EmployeeList() {
    const route = useRoute();
    const navigation = useNavigation();
    const { employees } = useContext(EmployeeContext);
    const { category } = route.params as { category: EmployeeCategory };

    const filteredEmployees = employees.filter(emp => emp.category === category);

    const renderItem = ({ item }: { item: typeof employees[0] }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EmployeeDetail', { employeeId: item.id })}
        >
            <View style={styles.iconContainer}>
                <MaterialIcons name="person" size={24} color="#3498db" />
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.type}>{item.type === 'Hourly' ? 'Saatlik' : 'Haftalık'}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#bdc3c7" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category} Listesi</Text>
            <FlatList
                data={filteredEmployees}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f3f5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#2c3e50",
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#34495e",
    },
    type: {
        fontSize: 14,
        color: "#7f8c8d",
    },
});
