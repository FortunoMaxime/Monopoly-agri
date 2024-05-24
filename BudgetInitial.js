import React from 'react';
import CalendrierProduction from './CalendrierProduction';
import { View, Text } from 'react-native';

export default function BudgetInitial() {
  return (
    <View style={{ flex: 1 }}>
      <CalendrierProduction />
    </View>
  );
}

