import React, { useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme';

// SettingsScreen is intentionally simple for Sprint 1.
// The notification switch is local UI state only for now — it doesn't
// connect to a real notification system yet. That's planned for Sprint 2/3
// once we have a backend to trigger real notifications from.

export default function SettingsScreen() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [notificationsOn, setNotificationsOn] = useState(true);

  const colors = isDarkMode
    ? {
        background: '#171717',
        panel: '#252525',
        border: '#3A3A3A',
        textPrimary: '#F6F6F6',
        textSecondary: '#CFCFCF',
      }
    : {
        background: '#FAFAFA',
        panel: '#F0E4DC',
        border: '#E5E1D8',
        textPrimary: '#2D2A26',
        textSecondary: '#7A756E',
      };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.textPrimary }]}>Settings</Text>

      <View style={[styles.row, { borderBottomColor: colors.border }]}>
        <View>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Dark mode</Text>
          <Text style={[styles.sublabel, { color: colors.textSecondary }]}>Switch app appearance theme</Text>
        </View>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      <View style={[styles.row, { borderBottomColor: colors.border }]}>
        <View>
          <Text style={[styles.label, { color: colors.textPrimary }]}>New listing alerts</Text>
          <Text style={[styles.sublabel, { color: colors.textSecondary }]}>Get notified when new pets are added</Text>
        </View>
        <Switch value={notificationsOn} onValueChange={setNotificationsOn} />
      </View>

      <View style={[styles.infoBox, { backgroundColor: colors.panel }]}>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}> 
          Distance-based filtering and real push notifications will be added
          once the app is connected to a live shelter database (Sprint 2).
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 24 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E1D8',
  },
  label: { fontSize: 15, fontWeight: '600' },
  sublabel: { fontSize: 12, marginTop: 2 },
  infoBox: { marginTop: 24, backgroundColor: '#F0E4DC', padding: 14, borderRadius: 8 },
  infoText: { fontSize: 13, lineHeight: 18 },
});
