import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { EmployeeCategory, EmployeeContext, EmployeeType } from '../contexts/EmployeeContext';

export default function AddEmployee() {
    const navigation = useNavigation();
    const { addEmployee } = useContext(EmployeeContext);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [category, setCategory] = useState<EmployeeCategory>('Garson');
    const [type, setType] = useState<EmployeeType>('Hourly');
    const [rate, setRate] = useState('');

    const categories: EmployeeCategory[] = ['Garson', 'Usta', 'Kasiyer', 'Bulaşıkçı'];
    const types: EmployeeType[] = ['Hourly', 'Weekly'];

    const handleSave = async () => {
        if (!name || !rate) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
            return;
        }

        const rateValue = parseFloat(rate);
        if (isNaN(rateValue) || rateValue <= 0) {
            Alert.alert('Hata', 'Geçerli bir ücret giriniz.');
            return;
        }

        setLoading(true);
        try {
            await addEmployee({
                name,
                category,
                type,
                rate: rateValue
            });
            Alert.alert('Başarılı', 'Personel eklendi.', [
                { text: 'Tamam', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert('Hata', 'Personel eklenirken bir sorun oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Ad Soyad</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Örn: Ahmet Yılmaz"
                />

                <Text style={styles.label}>Kategori</Text>
                <View style={styles.optionsContainer}>
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.optionButton, category === cat && styles.selectedOption]}
                            onPress={() => setCategory(cat)}
                        >
                            <Text style={[styles.optionText, category === cat && styles.selectedOptionText]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Çalışma Tipi</Text>
                <View style={styles.optionsContainer}>
                    {types.map((t) => (
                        <TouchableOpacity
                            key={t}
                            style={[styles.optionButton, type === t && styles.selectedOption]}
                            onPress={() => setType(t)}
                        >
                            <Text style={[styles.optionText, type === t && styles.selectedOptionText]}>
                                {t === 'Hourly' ? 'Saatlik' : 'Haftalık'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>
                    {type === 'Hourly' ? 'Saatlik Ücret (₺)' : 'Haftalık Maaş (₺)'}
                </Text>
                <TextInput
                    style={styles.input}
                    value={rate}
                    onChangeText={setRate}
                    keyboardType="numeric"
                    placeholder="0.00"
                />

                <TouchableOpacity
                    style={[styles.saveButton, loading && styles.disabledButton]}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Kaydet</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f3f5',
    },
    form: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dfe6e9',
        fontSize: 16,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#dfe6e9',
        marginBottom: 5,
    },
    selectedOption: {
        backgroundColor: '#3498db',
        borderColor: '#3498db',
    },
    optionText: {
        color: '#7f8c8d',
        fontWeight: '500',
    },
    selectedOptionText: {
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#2ecc71',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    disabledButton: {
        opacity: 0.7,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
