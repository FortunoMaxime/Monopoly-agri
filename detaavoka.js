import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchDataFromTable } from './database';

const DataDisplay = ({ tableName }) => {
 const [data, setData] = useState([]);

 useEffect(() => {
    fetchDataFromTable(tableName, (rows) => {
      console.log(`Données récupérées de la table ${tableName}:`, rows); // Ajout du console.log ici
      setData(rows);
    });0
 }, [tableName]);

 const renderItem = ({ item }) => (
    <View>
      {Object.keys(item).map((key) => (
        <Text key={key}>{`${key}: ${item[key]}`}</Text>
      ))}
    </View>
 );

 return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
 );
};

export default DataDisplay;
