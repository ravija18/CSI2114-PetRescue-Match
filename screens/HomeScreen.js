import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import pets from '../data/pets';
import { ThemeContext } from '../theme';

const filterOptions = ['All', 'Dog', 'Cat', 'Other'];
const chipPalette = ['#D9F1E5', '#E6F0FF', '#EDE1FF'];

export default function HomeScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedSpecies, setSelectedSpecies] = useState('All');

  const colors = isDarkMode
    ? {
        page: '#171717',
        card: '#252525',
        textPrimary: '#F2F2F2',
        textSecondary: '#CACACA',
        controlBg: '#2D2D2D',
        controlBorder: '#3A3A3A',
      }
    : {
        page: '#F2EEE7',
        card: '#F8F5F1',
        textPrimary: '#2A2A2A',
        textSecondary: '#5D524E',
        controlBg: '#F5F1ED',
        controlBorder: '#E2DAD0',
      };

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
        style={[styles.card, { backgroundColor: colors.card }]}
        onPress={() => navigation.navigate('Detail', { pet: item })}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.cardText}>
          <Text style={[styles.name, { color: colors.textPrimary }]}>{item.name}</Text>
          <Text style={[styles.meta, { color: colors.textSecondary }]}>{getMeta(item)}</Text>

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

          <Text style={[styles.location, { color: colors.textSecondary }]}>{item.shelter}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.page }]}>
      <View style={styles.headerWrap}>
        <Text style={[styles.header, { color: colors.textPrimary }]}>PetRescue Match</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={[styles.settingsButton, { backgroundColor: colors.controlBg }]}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.subheader, { color: colors.textSecondary }]}>Rescue animals ready for adoption near you</Text>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={styles.statNumber}>{availableCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Available</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={styles.statNumber}>{dogsCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Dogs</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Saved</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {filterOptions.map((species) => (
          <TouchableOpacity
            key={species}
            onPress={() => setSelectedSpecies(species)}
            style={[
              styles.filterButton,
              {
                backgroundColor: colors.controlBg,
                borderColor: colors.controlBorder,
              },
              selectedSpecies === species && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                { color: colors.textSecondary },
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
    letterSpacing: -0.5,
  },
  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 22,
  },
  subheader: {
    fontSize: 16,
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
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
    borderWidth: 1,
  },
  filterButtonActive: {
    backgroundColor: '#D77A4A',
    borderColor: '#D77A4A',
  },
  filterText: {
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
    marginBottom: 4,
  },
  meta: {
    fontSize: 16,
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
    marginTop: 2,
  },
});
