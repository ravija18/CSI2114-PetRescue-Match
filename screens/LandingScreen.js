import React, { useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme';

export default function LandingScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#171717' : '#C97A5D' }]}>
      <Image
        source={require('../assets/splash-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>PetRescue Match</Text>
      <Text style={styles.subtitle}>Finding forever homes, one paw at a time</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C97A5D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  title: {
    color: '#FFFDF9',
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    color: '#F7EDE4',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.95,
  },
});
