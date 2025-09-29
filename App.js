import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: '' }}
          style={styles.image}
        />
        <Text style={styles.name}>Henzo Lucas Rizzo de Souza</Text>
        <Text style={styles.info}>Ano De 2025</Text>
        <Text style={styles.info}>3 Bimestre</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
   
    padding: 32,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  name: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
});
