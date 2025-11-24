import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Animated, 
  Easing,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

// Custom Animated Components
const AnimatedView = Animatable.createAnimatableComponent(View);
const AnimatedText = Animatable.createAnimatableComponent(Text);

// Custom Button Component
const PrimaryButton = ({ title, onPress, icon, style, textStyle, isLoading = false }) => (
  <TouchableOpacity 
    style={[styles.primaryButton, style]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    {isLoading ? (
      <ActivityIndicator color="#fff" size="small" />
    ) : (
      <>
        {icon && <View style={styles.buttonIcon}>{icon}</View>}
        <Text style={[styles.primaryButtonText, textStyle]}>{title}</Text>
      </>
    )}
  </TouchableOpacity>
);

// Custom Input Component
const InputField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false, 
  keyboardType = 'default',
  icon,
  containerStyle,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const borderColor = animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2d3748', '#ff8a00']
  });

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View 
        style={[
          styles.inputWrapper, 
          { 
            borderColor,
            backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'
          }
        ]}
      >
        {icon && (
          <View style={styles.inputIcon}>
            {icon}
          </View>
        )}
        <TextInput
          style={[styles.input, { paddingLeft: icon ? 45 : 15 }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#718096"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          {...props}
        />
      </Animated.View>
    </View>
  );
};

// Social Login Button Component
const SocialButton = ({ onPress, icon, title, color, textColor = '#fff' }) => (
  <TouchableOpacity 
    style={[styles.socialButton, { backgroundColor: color }]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.socialIconContainer}>
      {icon}
    </View>
    <Text style={[styles.socialButtonText, { color: textColor }]}>{title}</Text>
  </TouchableOpacity>
);

// Login Screen
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideUp, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const onLogin = () => {
    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      const name = email ? email.split('@')[0] : 'Jogador';
      navigation.replace('Home', { userName: name });
      setIsLoading(false);
    }, 1500);
  };

  const onGuestLogin = () => {
    Haptics.selectionAsync();
    navigation.replace('Home', { userName: 'Convidado' });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.safe}>
        <StatusBar style="light" />
        <LinearGradient
          colors={['#0b2545', '#1a365d']}
          style={styles.backgroundGradient}
        >
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView 
              contentContainerStyle={styles.scroll} 
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Animated.View 
                style={[
                  styles.header,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideUp }]
                  }
                ]}
              >
                <Animatable.View 
                  animation="pulse" 
                  iterationCount="infinite"
                  duration={3000}
                  style={styles.logoContainer}
                >
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=0c0b5d1a7a5f9b7a7b6a1e6b2f0c1a2b' }}
                    style={styles.logo}
                    resizeMode="cover"
                  />
                </Animatable.View>
                
                <AnimatedText 
                  animation="fadeIn" 
                  duration={1000}
                  style={styles.title}
                >
                  DreamCourt
                </AnimatedText>
                <AnimatedText 
                  animation="fadeIn" 
                  duration={1000}
                  delay={200}
                  style={styles.subtitle}
                >
                  União, Empoderamento e Evolução pelo Basquete
                </AnimatedText>
              </Animated.View>

              <Animated.View 
                style={[
                  styles.card,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideUp }]
                  }
                ]}
              >
                <InputField
                  label="E-mail"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="seu@exemplo.com"
                  keyboardType="email-address"
                  icon={<MaterialIcons name="email" size={20} color="#a0aec0" />}
                />

                <InputField
                  label="Senha"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  icon={<MaterialIcons name="lock" size={20} color="#a0aec0" />}
                  containerStyle={{ marginTop: 20 }}
                />

                <TouchableOpacity 
                  style={styles.forgotPassword}
                  onPress={() => Haptics.selectionAsync()}
                >
                  <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <PrimaryButton
                  title="Entrar"
                  onPress={onLogin}
                  isLoading={isLoading}
                  style={styles.loginButton}
                  icon={<MaterialIcons name="login" size={20} color="#fff" style={{ marginRight: 10 }} />}
                />

                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>ou entre com</Text>
                  <View style={styles.divider} />
                </View>

                <View style={styles.socialButtonsContainer}>
                  <SocialButton
                    title="Google"
                    icon={<FontAwesome5 name="google" size={18} color="#fff" />}
                    color="#DB4437"
                    onPress={() => Haptics.selectionAsync()}
                  />
                  <SocialButton
                    title="Facebook"
                    icon={<FontAwesome5 name="facebook" size={18} color="#fff" />}
                    color="#4267B2"
                    onPress={() => Haptics.selectionAsync()}
                  />
                </View>

                <TouchableOpacity
                  style={styles.guestButton}
                  onPress={onGuestLogin}
                  activeOpacity={0.7}
                >
                  <Text style={styles.guestButtonText}>
                    <Ionicons name="person-outline" size={16} /> Entrar como Convidado
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View 
                style={[
                  styles.footer,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideUp }]
                  }
                ]}
              >
                <Text style={styles.footerText}>Representatividade • Comunidade • Crescimento</Text>
                <Text style={styles.versionText}>Versão 2.0.0</Text>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
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

// Navigation theme
const MyTheme = {
  dark: true,
  colors: {
    primary: '#ff8a00',
    background: '#0a192f',
    card: '#0f2a4a',
    text: '#fff',
    border: 'rgba(255, 255, 255, 0.1)',
    notification: '#ff8a00',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#0a192f" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          cardStyle: { backgroundColor: '#0a192f' },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Project" 
          component={ProjectScreen} 
          options={{
            headerShown: true,
            headerTitle: 'Sobre o Projeto',
            headerTintColor: '#ff8a00',
            headerStyle: {
              backgroundColor: '#0a192f',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255, 255, 255, 0.05)',
            },
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen 
          name="Opportunities" 
          component={OpportunitiesScreen} 
          options={{
            headerShown: true,
            headerTitle: 'Oportunidades',
            headerTintColor: '#ff8a00',
            headerStyle: {
              backgroundColor: '#0a192f',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255, 255, 255, 0.05)',
            },
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen 
          name="Assistance" 
          component={AssistanceScreen} 
          options={{
            headerShown: true,
            headerTitle: 'Assistência & Histórias',
            headerTintColor: '#ff8a00',
            headerStyle: {
              backgroundColor: '#0a192f',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255, 255, 255, 0.05)',
            },
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
          options={{
            headerShown: true,
            headerTitle: 'Sobre Henzo',
            headerTintColor: '#ff8a00',
            headerStyle: {
              backgroundColor: '#0a192f',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255, 255, 255, 0.05)',
            },
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Base styles
  safe: { 
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  container: { 
    flex: 1,
  },
  scroll: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 20,
    paddingBottom: 40,
  },
  
  // Header styles
  header: { 
    alignItems: 'center', 
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 138, 0, 0.3)',
    shadowColor: '#ff8a00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  logo: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
  },
  title: { 
    fontSize: 32, 
    color: '#fff', 
    fontWeight: '800',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  subtitle: { 
    color: '#cfe8ff', 
    marginTop: 6, 
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
  
  // Card styles
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  
  // Input styles
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderRadius: 14,
    borderWidth: 1.5,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#fff',
    fontSize: 15,
    paddingRight: 15,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  // Button styles
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 14,
    backgroundColor: '#ff8a00',
    shadowColor: '#ff8a00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginRight: 10,
  },
  loginButton: {
    marginTop: 25,
    marginBottom: 15,
  },
  ghostButton: { 
    marginTop: 15, 
    alignItems: 'center',
    padding: 12,
  },
  ghostButtonText: { 
    color: '#a0aec0', 
    fontWeight: '600',
    fontSize: 14,
  },
  
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: '#a0aec0',
    fontSize: 12,
    marginHorizontal: 10,
    fontWeight: '600',
  },
  
  // Social buttons
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 12,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  socialIconContainer: {
    marginRight: 8,
  },
  socialButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  
  // Guest button
  guestButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestButtonText: {
    color: '#a0aec0',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Forgot password
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#ff8a00',
    fontSize: 13,
    fontWeight: '600',
  },
  
  // Footer
  footer: { 
    alignItems: 'center', 
    marginTop: 30,
  },
  footerText: { 
    color: 'rgba(160, 174, 192, 0.7)', 
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  versionText: {
    color: 'rgba(160, 174, 192, 0.5)',
    fontSize: 11,
    marginTop: 5,
  },
  
  // Home screen styles
  homeContainer: { 
    backgroundColor: '#0a192f',
  },
  hero: { 
    height: 250, 
    justifyContent: 'flex-end', 
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  heroImage: { 
    ...StyleSheet.absoluteFillObject, 
    width: undefined, 
    height: undefined,
  },
  heroOverlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(10, 25, 47, 0.85)',
  },
  welcome: { 
    color: '#fff', 
    fontSize: 28, 
    fontWeight: '800', 
    zIndex: 2,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)', 
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  motto: { 
    color: 'rgba(255, 255, 255, 0.9)', 
    fontSize: 15,
    lineHeight: 22,
    zIndex: 2,
    maxWidth: '90%',
  },
  
  // Content styles
  content: { 
    padding: 20,
    paddingBottom: 30,
  },
  infoCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  infoTitle: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 17,
    marginBottom: 8,
  },
  infoText: { 
    color: 'rgba(255, 255, 255, 0.7)', 
    fontSize: 14,
    lineHeight: 21,
  },
  
  // Section header
  sectionHeader: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '800', 
    marginTop: 25,
    marginBottom: 15,
  },
  
  // Grid layout
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginHorizontal: -5,
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  featureTitle: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 15,
    marginBottom: 6,
  },
  featureText: { 
    color: 'rgba(255, 255, 255, 0.6)', 
    fontSize: 13, 
    lineHeight: 18,
  },
  
  // Action buttons
  actionsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 25,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ff8a00',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff8a00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  actionText: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 15,
  },
  
  // Page styles
  pageContainer: { 
    backgroundColor: '#0a192f',
    flex: 1,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(10, 25, 47, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButton: { 
    marginRight: 15,
    padding: 5,
  },
  backText: { 
    color: '#ff8a00', 
    fontSize: 15,
    fontWeight: '600',
  },
  pageTitle: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '800',
    marginLeft: 5,
  },
  pageContent: { 
    flex: 1,
    padding: 20,
  },
  pageParagraph: { 
    color: 'rgba(255, 255, 255, 0.8)', 
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 15,
  },
  pageSubTitle: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '800', 
    marginTop: 25, 
    marginBottom: 15,
  },
  
  // Opportunity card
  opCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  opTitle: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16, 
    marginBottom: 8,
  },
  opDesc: { 
    color: 'rgba(255, 255, 255, 0.6)', 
    fontSize: 14, 
    lineHeight: 21,
    marginBottom: 15,
  },
  
  // Connect button
  connectButton: {
    backgroundColor: 'rgba(255, 138, 0, 0.15)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 138, 0, 0.2)',
  },
  connectText: { 
    color: '#ff8a00', 
    fontWeight: '700',
    fontSize: 14,
  },
  
  // Story card
  storyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  storyName: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16, 
    marginBottom: 5,
  },
  storyNote: { 
    color: 'rgba(255, 255, 255, 0.7)', 
    fontSize: 14, 
    lineHeight: 21,
    marginBottom: 15,
  },
});

