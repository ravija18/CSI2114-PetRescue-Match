import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import pets from '../data/pets';

// HomeScreen shows the full list of adoptable pets and lets the user
// filter by species. This screen holds Hook 1: selectedSpecies.

export default function HomeScreen({ navigation }) {
  // Hook 1: tracks which species filter is active ("All", "Dog", "Cat", "Other")
  const [selectedSpecies, setSelectedSpecies] = useState('All');

  // Derive the filtered list from state — no need for a second array in state,
  // we just compute this on every render based on selectedSpecies.
  const filteredPets =
    selectedSpecies === 'All'
      ? pets
      : pets.filter((pet) => pet.species === selectedSpecies);

  const renderPet = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { pet: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.tag}>{item.species} • {item.age} yrs • {item.breed}</Text>
        <Text style={styles.shelter}>{item.shelter}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.header}>PetRescue Match</Text>
          <Text style={styles.subheader}>Overlooked pets, ready for a home</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Filter buttons — each button updates Hook 1's state */}
      <View style={styles.filterRow}>
        {['All', 'Dog', 'Cat', 'Other'].map((species) => (
          <TouchableOpacity
            key={species}
            style={[
              styles.filterButton,
              selectedSpecies === species && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedSpecies(species)}
          >
            <Text
              style={[
                styles.filterText,
                selectedSpecies === species && styles.filterTextActive,
              ]}
            >
              {species}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FlatList requirement: renders 10+ items from pets.js */}
      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id}
        renderItem={renderPet}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', paddingTop: 50, paddingHorizontal: 16 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  settingsIcon: { fontSize: 24, marginTop: 4 },
  header: { fontSize: 26, fontWeight: '700', color: '#2D2A26' },
  subheader: { fontSize: 14, color: '#7A756E', marginBottom: 16 },
  filterRow: { flexDirection: 'row', marginBottom: 16 },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D8D3CB',
    marginRight: 8,
  },
  filterButtonActive: { backgroundColor: '#B8654B', borderColor: '#B8654B' },
  filterText: { color: '#7A756E', fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#FFFFFF' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  image: { width: 90, height: 90 },
  cardText: { flex: 1, padding: 10, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '700', color: '#2D2A26' },
  tag: { fontSize: 12, color: '#7A756E', marginTop: 2 },
  shelter: { fontSize: 12, color: '#B8654B', marginTop: 4, fontWeight: '600' },
});
