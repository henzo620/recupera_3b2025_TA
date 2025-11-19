import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    // Simple demo flow: navigate to Home with a friendly name
    const name = email ? email.split('@')[0] : 'Jogador';
    navigation.replace('Home', { userName: name });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=0c0b5d1a7a5f9b7a7b6a1e6b2f0c1a2b' }}
              style={styles.logo}
              resizeMode="cover"
            />
            <Text style={styles.title}>DreamCourt</Text>
            <Text style={styles.subtitle}>União, Empoderamento e Evolução pelo Basquete</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              placeholder="seu@exemplo.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity style={styles.primaryButton} onPress={onLogin}>
              <Text style={styles.primaryButtonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ghostButton}
              onPress={() => navigation.replace('Home', { userName: 'Convidado' })}
            >
              <Text style={styles.ghostButtonText}>Entrar como Convidado</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Representatividade • Comunidade • Crescimento</Text>
          </View>
        </ScrollView>
        <StatusBar style="light" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation, route }) {
  const { userName } = route.params || { userName: 'Jogador' };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, styles.homeContainer]}>
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1518013137128-9b6d32e3b0c6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d7f5f9f0b3b3cca3a2c1f9d5f0a2e1b' }}
            style={styles.heroImage}
            blurRadius={1}
          />
          <View style={styles.heroOverlay} />
          <Text style={styles.welcome}>Bem-vindo, {userName} 👟</Text>
          <Text style={styles.motto}>Juntos pelo esporte e transformação social</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>União Social</Text>
            <Text style={styles.infoText}>Projetos que conectam comunidades através do basquete e ações reais.</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Empoderamento</Text>
            <Text style={styles.infoText}>Treinamento, mentoria e oportunidades para crescer dentro e fora da quadra.</Text>
          </View>

          <Text style={styles.sectionHeader}>O que você quer fazer?</Text>

          <View style={styles.grid}>
            <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('Project')}>
              <Text style={styles.featureTitle}>Sobre o Projeto</Text>
              <Text style={styles.featureText}>Nossa missão, visão e objetivos.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('Opportunities')}>
              <Text style={styles.featureTitle}>Oportunidades</Text>
              <Text style={styles.featureText}>Torneios, bolsas e programas.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('Assistance')}>
              <Text style={styles.featureTitle}>Assistência</Text>
              <Text style={styles.featureText}>Converse com quem já superou desafios.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('About')}>
              <Text style={styles.featureTitle}>Sobre Henzo</Text>
              <Text style={styles.featureText}>Página em branco — adicionar depois.</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.actionButton, { flex: 1 }]} onPress={() => navigation.replace('Login')}>
              <Text style={[styles.actionText]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

function ProjectScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, styles.pageContainer]}>
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>◀ Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Sobre o Projeto</Text>
        </View>

        <ScrollView contentContainerStyle={styles.pageContent}>
          <Text style={styles.pageParagraph}>
            DreamCourt une paixão pelo basquete com impacto social. Nosso objetivo é criar espaços seguros
            para o desenvolvimento pessoal e comunitário através de programas de treinamento, eventos e
            parcerias locais. Promovemos representatividade, oportunidades e evolução contínua.
          </Text>

          <Text style={styles.pageSubTitle}>Objetivos</Text>
          <Text style={styles.pageParagraph}>• Conectar comunidades através de torneios e encontros.</Text>
          <Text style={styles.pageParagraph}>• Fornecer mentoria, bolsas e suporte educacional.</Text>
          <Text style={styles.pageParagraph}>• Inspirar novas gerações com histórias de superação.</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function OpportunitiesScreen({ navigation }) {
  const sample = [
    { id: 1, title: 'Torneio Comunitário', desc: 'Inscrições abertas para todas as idades.' },
    { id: 2, title: 'Bolsa de Treinamento', desc: 'Programa de 6 meses com mentoria especializada.' },
    { id: 3, title: 'Clinics e Oficinas', desc: 'Sessões gratuitas em parceria com ONGs locais.' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, styles.pageContainer]}>
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>◀ Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Oportunidades</Text>
        </View>

        <ScrollView contentContainerStyle={styles.pageContent}>
          {sample.map(item => (
            <View key={item.id} style={styles.opCard}>
              <Text style={styles.opTitle}>{item.title}</Text>
              <Text style={styles.opDesc}>{item.desc}</Text>
              <TouchableOpacity style={styles.connectButton} onPress={() => alert('Mais detalhes: ' + item.title)}>
                <Text style={styles.connectText}>Saiba mais</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function AssistanceScreen({ navigation }) {
  const stories = [
    { id: 1, name: 'Mariana', note: 'Superou lesão e voltou a competir.' },
    { id: 2, name: 'Rafael', note: 'Encontrou bolsa para estudos através do basquete.' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, styles.pageContainer]}>
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>◀ Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Assistência & Histórias</Text>
        </View>

        <ScrollView contentContainerStyle={styles.pageContent}>
          <Text style={styles.pageParagraph}>
            Conecte-se com pessoas que passaram por desafios semelhantes. Compartilhamos histórias reais para
            inspirar e oferecer caminhos práticos para sua jornada.
          </Text>

          {stories.map(s => (
            <View key={s.id} style={styles.storyCard}>
              <Text style={styles.storyName}>{s.name}</Text>
              <Text style={styles.storyNote}>{s.note}</Text>
              <TouchableOpacity style={styles.connectButton} onPress={() => alert('Conectando com ' + s.name)}>
                <Text style={styles.connectText}>Conectar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function AboutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, styles.pageContainer]}>
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>◀ Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Sobre Henzo</Text>
        </View>

        <View style={styles.pageContent}>
          <Text style={styles.pageParagraph}>Página em branco — informações do Henzo serão adicionadas depois.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b2545' },
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  title: { fontSize: 28, color: '#fff', fontWeight: '700' },
  subtitle: { color: '#cfe8ff', marginTop: 6, textAlign: 'center' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  label: { color: '#334155', marginTop: 10, marginBottom: 6, fontWeight: '600' },
  input: {
    height: 46,
    borderColor: '#e6eef8',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fbfdff',
  },

  primaryButton: {
    marginTop: 18,
    backgroundColor: '#ff8a00',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700' },

  ghostButton: { marginTop: 12, alignItems: 'center' },
  ghostButtonText: { color: '#0b2545', fontWeight: '600' },

  footer: { alignItems: 'center', marginTop: 18 },
  footerText: { color: '#9fb8d9', fontSize: 12 },

  /* Home styles */
  homeContainer: { backgroundColor: '#071833' },
  hero: { height: 220, justifyContent: 'flex-end', padding: 20 },
  heroImage: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(6,18,38,0.45)' },
  welcome: { color: '#fff', fontSize: 24, fontWeight: '800', zIndex: 2 },
  motto: { color: '#cfe8ff', marginTop: 4, zIndex: 2 },

  content: { padding: 20 },
  infoCard: { backgroundColor: '#0f2a4a', padding: 14, borderRadius: 12, marginBottom: 12 },
  infoTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  infoText: { color: '#cfe8ff', marginTop: 6 },

  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  actionButton: { flex: 1, backgroundColor: '#ff8a00', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 8 },
  actionAlt: { backgroundColor: '#0b2545', borderWidth: 1, borderColor: '#2b5b9a', marginRight: 0, marginLeft: 8 },
  actionText: { color: '#fff', fontWeight: '700' },
  actionAltText: { color: '#fff' },
});
