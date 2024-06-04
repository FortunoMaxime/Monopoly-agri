import React from 'react';
import { View, Dimensions, StyleSheet, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Courbe = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [
          Math.random() * 80000,
          Math.random() * 70000,
          Math.random() * 90000,
          Math.random() * 60000,
          Math.random() * 75000,
          Math.random() * 85000,
          Math.random() * 95000,
          Math.random() * 65000,
          Math.random() * 72000,
          Math.random() * 83000,
          Math.random() * 93000,
          Math.random() * 67000,
        ],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      },
      {
        data: [
          Math.random() * 100000,
          Math.random() * 100000,
          Math.random() * 100000,
          Math.random() * 100000,
          Math.random() * 100000,
          Math.random() * 100000,
          Math.random() * 100000,
          Math.random() * 100000,
          Math.random() * 100000,
          Math.random() * 100000,
          Math.random() * 100000,
          Math.random() * 100000,
        ],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Couleur différente pour la seconde série
      },
    ],
  };
  const calculateDifferences = () => {
    const dataset1 = data.datasets[0].data;
    const dataset2 = data.datasets[1].data;
    const differences = [];
    for (let i = 0; i < dataset1.length; i++) {
      differences.push({ month: data.labels[i], value: dataset1[i] - dataset2[i] });
    }
    return differences;
  };


  const differences = calculateDifferences();

  const chartConfig = {
    backgroundColor: '#f5f5f5',
    backgroundGradientFrom: '#dfe4ea',
    backgroundGradientTo: '#ceebd9',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#333',
    },
    propsForLabels: {
      fontSize: 12,
      fontFamily: 'sans-serif',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    },
    propsForVerticalLabels: {
      angle: -30,
      yOffset: -10,
    },
  };

  return (
   <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Analyse Financière</Text>
        <Text style={styles.subtitle}>Bénéfices et Pertes par Mois</Text>
      </View>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={550}
        yAxisSuffix={' Ar'}
        yAxisInterval={1}
        chartConfig={chartConfig}
        style={{ marginVertical: 8, borderRadius: 16 }}
        withInnerLines={true}
        withOuterLines={true}
        withDots={true}
        withHorizontalLabels={true}
        withVerticalLabels={true}
        withHorizontalGridlines={false}
        withVerticalGridlines={false}
        withChainedModeActive={true}
        withScrollableXAxis={true}
      />
      {/* Afficher les différences */}
      <View style={styles.differenceContainer}>
        {differences.map((difference, index) => (
          <Text key={index} style={styles.differenceText}>
            Différence: {Math.abs(difference).toFixed(2)} Ar
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
  },
  differenceContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  differenceText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Courbe;