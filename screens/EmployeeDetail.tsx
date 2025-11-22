import { useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { EmployeeContext } from "../contexts/EmployeeContext";

export default function EmployeeDetail() {
    const route = useRoute();
    const { employeeId } = route.params as { employeeId: string };
    const { employees, addLog, getLogsByEmployee } = useContext(EmployeeContext);

    const employee = employees.find(e => e.id === employeeId);
    const logs = getLogsByEmployee(employeeId);

    const [hours, setHours] = useState('');

    if (!employee) return null;

    const handleSave = async () => {
        const today = new Date().toLocaleDateString('tr-TR');
        let pay = 0;
        let workedHours = 0;

        if (employee.type === 'Hourly') {
            workedHours = parseFloat(hours);
            if (isNaN(workedHours) || workedHours <= 0) {
                Alert.alert('Hata', 'Lütfen geçerli bir saat giriniz.');
                return;
            }
            pay = workedHours * employee.rate;
        } else {
            pay = employee.rate; // Weekly fixed pay
        }

        try {
            await addLog({
                employeeId: employee.id,
                date: today,
                hours: workedHours > 0 ? workedHours : undefined,
                calculatedPay: pay
            });
            setHours('');
            Alert.alert('Başarılı', 'Kayıt eklendi.');
        } catch (error) {
            Alert.alert('Hata', 'Kayıt eklenirken bir sorun oluştu.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{employee.name.charAt(0)}</Text>
                </View>
                <Text style={styles.name}>{employee.name}</Text>
                <Text style={styles.role}>{employee.category} - {employee.type === 'Hourly' ? 'Saatlik' : 'Haftalık'}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Bugünkü Giriş</Text>

                {employee.type === 'Hourly' ? (
                    <>
                        <Text style={styles.label}>Çalışılan Saat</Text>
                        <TextInput
                            style={styles.input}
                            value={hours}
                            onChangeText={setHours}
                            keyboardType="numeric"
                            placeholder="Örn: 8"
                        />
                        <Text style={styles.infoText}>Saatlik Ücret: {employee.rate}₺</Text>
                        {hours ? (
                            <Text style={styles.totalText}>
                                Hesaplanan: {(parseFloat(hours) * employee.rate).toFixed(2)}₺
                            </Text>
                        ) : null}
                    </>
                ) : (
                    <View>
                        <Text style={styles.infoText}>Haftalık Sabit Ücret: {employee.rate}₺</Text>
                        <Text style={styles.subInfo}>Bu hafta için ödeme kaydı oluşturabilirsiniz.</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Kaydet</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.historySection}>
                <Text style={styles.historyTitle}>Geçmiş Kayıtlar</Text>
                {logs.map((log) => (
                    <View key={log.id} style={styles.logItem}>
                        <View>
                            <Text style={styles.logDate}>{log.date}</Text>
                            {log.hours && <Text style={styles.logHours}>{log.hours} Saat</Text>}
                        </View>
                        <Text style={styles.logPay}>{log.calculatedPay}₺</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f3f5",
    },
    header: {
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    avatarText: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    role: {
        fontSize: 16,
        color: '#7f8c8d',
        marginTop: 5,
    },
    card: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#2c3e50',
    },
    label: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 5,
    },
    subInfo: {
        fontSize: 12,
        color: '#95a5a6',
        marginBottom: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#27ae60',
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    historySection: {
        padding: 20,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#2c3e50',
    },
    logItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    logDate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#34495e',
    },
    logHours: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    logPay: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#27ae60',
    },
});
