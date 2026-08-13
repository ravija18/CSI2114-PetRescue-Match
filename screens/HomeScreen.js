import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import pets from '../data/pets';

const filterOptions = ['All', 'Dog', 'Cat', 'Other'];

const chipPalette = ['#D9F1E5', '#E6F0FF', '#EDE1FF'];

export default function HomeScreen({ navigation }) {
  const [selectedSpecies, setSelectedSpecies] = useState('All');

  const filteredPets =
    selectedSpecies === 'All'
      ? pets
      : pets.filter((pet) => pet.species === selectedSpecies);

  const availableCount = pets.length;
  const dogsCount = pets.filter((pet) => pet.species === 'Dog').length;

  const getMeta = (item) => {
    const gender = Number(item.id) % 2 === 0 ? 'Female' : 'Male';
    return `${item.breed} • ${item.age} years • ${gender}`;
  };

  const getChips = (item) => {
    const chipSet = ['Vaccinated', 'Friendly', 'Trained'];
    const index = Number(item.id) % chipSet.length;
    return [chipSet[index], chipSet[(index + 1) % chipSet.length], chipSet[(index + 2) % chipSet.length]];
  };

  const renderPet = ({ item }) => {
    const chips = getChips(item);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { pet: item })}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.cardText}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>{getMeta(item)}</Text>

          <View style={styles.chipRow}>
            {chips.map((chip, index) => (
              <View
                key={`${item.id}-${chip}`}
                style={[
                  styles.chip,
                  { backgroundColor: chipPalette[index % chipPalette.length] },
                ]}
              >
                <Text style={styles.chipText}>{chip}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.location}>{item.shelter}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrap}>
        <Text style={styles.header}>PetRescue Match</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subheader}>Rescue animals ready for adoption near you</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{availableCount}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{dogsCount}</Text>
          <Text style={styles.statLabel}>Dogs</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {filterOptions.map((species) => (
          <TouchableOpacity
            key={species}
            onPress={() => setSelectedSpecies(species)}
            style={[
              styles.filterButton,
              selectedSpecies === species && styles.filterButtonActive,
            ]}
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

      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id}
        renderItem={renderPet}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EEE7',
    paddingTop: 50,
    paddingHorizontal: 18,
  },
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2A2A2A',
    letterSpacing: -0.5,
  },
  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8E0D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 22,
  },
  subheader: {
    fontSize: 16,
    color: '#5D524E',
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8F5F1',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statNumber: {
    fontSize: 30,
    fontWeight: '800',
    color: '#D97A4A',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 15,
    color: '#49433F',
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: '#F5F1ED',
    borderWidth: 1,
    borderColor: '#E2DAD0',
  },
  filterButtonActive: {
    backgroundColor: '#D77A4A',
    borderColor: '#D77A4A',
  },
  filterText: {
    color: '#5E534D',
    fontSize: 15,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#FFF',
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F8F5F1',
    borderRadius: 22,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    margin: 12,
  },
  cardText: {
    flex: 1,
    paddingVertical: 18,
    paddingRight: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2A2A2A',
    marginBottom: 4,
  },
  meta: {
    fontSize: 16,
    color: '#5C514D',
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: '#2E6B52',
    fontSize: 12,
    fontWeight: '700',
  },
  location: {
    fontSize: 15,
    color: '#4C4845',
    marginTop: 2,
  },
});
