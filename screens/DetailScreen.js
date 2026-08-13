import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// DetailScreen shows one pet's full profile. This screen holds Hook 2:
// isFavourited — a simple boolean toggled by tapping the heart button.

export default function DetailScreen({ route }) {
  const { pet } = route.params; // pet data passed from HomeScreen navigation

  // Hook 2: tracks whether the user has marked this pet as a favourite
  const [isFavourited, setIsFavourited] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: pet.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{pet.name}</Text>
          <TouchableOpacity onPress={() => setIsFavourited(!isFavourited)}>
            <Text style={styles.heart}>{isFavourited ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tag}>{pet.species} • {pet.age} years old • {pet.breed}</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Temperament</Text>
          <Text style={styles.value}>{pet.temperament}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Health Notes</Text>
          <Text style={styles.value}>{pet.healthNotes}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Shelter</Text>
          <Text style={styles.value}>{pet.shelter}</Text>
          <Text style={styles.value}>{pet.shelterContact}</Text>
        </View>

        {isFavourited && (
          <View style={styles.savedBanner}>
            <Text style={styles.savedText}>Saved to your favourites</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  image: { width: '100%', height: 280 },
  content: { padding: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 26, fontWeight: '700', color: '#2D2A26' },
  heart: { fontSize: 30, color: '#B8654B' },
  tag: { fontSize: 14, color: '#7A756E', marginTop: 4, marginBottom: 16 },
  section: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '700', color: '#B8654B', textTransform: 'uppercase', marginBottom: 4 },
  value: { fontSize: 15, color: '#2D2A26', lineHeight: 20 },
  savedBanner: { backgroundColor: '#F0E4DC', padding: 12, borderRadius: 8, marginTop: 8 },
  savedText: { color: '#B8654B', fontWeight: '600', textAlign: 'center' },
});
