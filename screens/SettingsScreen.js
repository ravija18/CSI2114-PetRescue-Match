import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

// SettingsScreen is intentionally simple for Sprint 1.
// The notification switch is local UI state only for now — it doesn't
// connect to a real notification system yet. That's planned for Sprint 2/3
// once we have a backend to trigger real notifications from.

export default function SettingsScreen() {
  const [notificationsOn, setNotificationsOn] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>New listing alerts</Text>
          <Text style={styles.sublabel}>Get notified when new pets are added</Text>
        </View>
        <Switch value={notificationsOn} onValueChange={setNotificationsOn} />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Distance-based filtering and real push notifications will be added
          once the app is connected to a live shelter database (Sprint 2).
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', paddingTop: 50, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: '700', color: '#2D2A26', marginBottom: 24 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E1D8',
  },
  label: { fontSize: 15, fontWeight: '600', color: '#2D2A26' },
  sublabel: { fontSize: 12, color: '#7A756E', marginTop: 2 },
  infoBox: { marginTop: 24, backgroundColor: '#F0E4DC', padding: 14, borderRadius: 8 },
  infoText: { fontSize: 13, color: '#7A756E', lineHeight: 18 },
});
