import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Customer {
  _id: string;
  name: string;
  phoneNumber: string;
  quantity: number;
}

const HomeScreen = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError("Token nije pronađen.");
          return;
        }
        const response = await axios.get('http://10.0.2.2:5000/api/customers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomers(response.data.data); // Pretpostavljamo da API vraća niz objekata
      } catch (error) {
        setError("Greška pri dohvaćanju podataka.");
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  const renderCustomer = ({ item }: { item: Customer }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.phoneNumber}</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista Kupaca</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Ime</Text>
        <Text style={styles.headerCell}>Telefon</Text>
        <Text style={styles.headerCell}>Količina</Text>
      </View>

      <FlatList
        data={customers}
        keyExtractor={(item) => item._id}
        renderItem={renderCustomer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16},
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 8 },
  headerCell: { flex: 1, fontWeight: 'bold', textAlign: 'center' },
  row: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  cell: { flex: 1, textAlign: 'center' },
  error: { color: 'red', marginVertical: 8, textAlign: 'center' },
});

export default HomeScreen;
