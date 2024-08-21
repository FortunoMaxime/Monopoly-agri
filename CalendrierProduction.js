import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Svg, Rect, Text, Line, G } from 'react-native-svg';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getLastId } from './database';
import * as SQLite from 'expo-sqlite';
import * as d3 from 'd3';

const CalendrierProduction = () => {

  const route = useRoute();
  const { itemId } = route.params;
  console.log('ito le last',itemId);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const svgWidth = screenWidth - 40; // Par exemple, en laissant une marge de 20 de chaque côté
  const svgHeight = screenHeight - 100; // Par exemple, en laissant une marge en haut et en bas
  const [resultfamokarana, setResultfamokarana] = useState([]);



  useEffect(() => {
      recupereFamokarana(itemId);
  }, [itemId]);

  const recupereFamokarana = async (lastId) => {
    const db = await SQLite.openDatabaseAsync('monopoly.db');
     
    try {
      const result = await db.getAllAsync(`SELECT Sehapihariana,VolanaNambolena,VolanaNamokarana FROM Famokarana WHERE MpamokatraId=${itemId}`);
      setResultfamokarana(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  console.log(resultfamokarana);
  const sehapiharianaValues = resultfamokarana.map(task => task.Sehapihariana);

  console.log(sehapiharianaValues);

  const transformedTasks = [];

  for (let i = 0; i < resultfamokarana.length; i++) {
    const task = resultfamokarana[i];
    const taskNumber = i + 1;
    transformedTasks.push(taskNumber, task.VolanaNambolena, task.VolanaNamokarana);
  }
  console.log('transform', transformedTasks);
  const taskNambolena = transformTasks(transformedTasks);
  const tasksNiakarana = transformNiakarana(transformedTasks);
const tasks = [...taskNambolena, ...tasksNiakarana];
console.log('mitambatra',tasks);
  //console.log(tasks);

  function transformTasks(tasksArray) {
    const monthIndices = {
      Janvier: 0, Février: 1, Mars: 2, Avril: 3, Mai: 4, Juin: 5,
      Juillet: 6, Août: 7, Septembre: 8, Octobre: 9, Novembre: 10, Décembre: 11
    };

    const transformedTasks = [];

    for (let i = 0; i < tasksArray.length; i += 3) {
      const taskName = tasksArray[i];
      const volanaNambolena = tasksArray[i + 1];
      const endMonth = tasksArray[i + 2];

      if (!taskName || !volanaNambolena || !endMonth) {
        console.error("Les données sont incomplètes");
        continue;
      }

      let startMonthIndex, endMonthIndex;

      if (volanaNambolena.includes(',') || volanaNambolena.includes(' ')) {
        // Utilisation d'une expression régulière pour diviser par ',' ou ' '
        const [firstMonth, secondMonth] = volanaNambolena.split(/[, ]+/).map(m => m.trim());
        startMonthIndex = monthIndices[firstMonth];
        endMonthIndex = monthIndices[secondMonth];
      }
       else {
        // Cas où VolanaNambolena est un seul mois
        startMonthIndex = monthIndices[volanaNambolena];
        endMonthIndex = monthIndices[volanaNambolena];
      }

      if (startMonthIndex === undefined || endMonthIndex === undefined) {
        console.error(`Mois invalide trouvé: ${volanaNambolena}, ${endMonth}`);
        continue;
      }

      // Création de l'objet de tâche avec les dates de début et de fin
      const task = {
        name: taskName,
        start: new Date(2024, startMonthIndex, 1),
        end: new Date(2024, endMonthIndex + 1, 0)
      };
      console.log('task', task);
      transformedTasks.push(task);
    }

    return transformedTasks;
  }
  function transformNiakarana(tasksArray) {
    const monthIndices = {
      Janvier: 0, Février: 1, Mars: 2, Avril: 3, Mai: 4, Juin: 5,
      Juillet: 6, Août: 7, Septembre: 8, Octobre: 9, Novembre: 10, Décembre: 11
    };

    const transformedTasks = [];

    for (let i = 0; i < tasksArray.length; i += 3) {
      const taskName = tasksArray[i];
      const volanaNambolena = tasksArray[i + 1];
      const endMonth = tasksArray[i + 2];

      if (!taskName || !volanaNambolena || !endMonth) {
        console.error("Les données sont incomplètes");
        continue;
      }

      let startMonthIndex, endMonthIndex;

      if (endMonth.includes(',')) {
        // Cas où VolanaNambolena est sous la forme "Juin,Octobre"
        const [firstMonth, secondMonth] = endMonth.split(',').map(m => m.trim());
        startMonthIndex = monthIndices[firstMonth];
        endMonthIndex = monthIndices[secondMonth];
      } else {
        // Cas où VolanaNambolena est un seul mois
        startMonthIndex = monthIndices[endMonth];
        endMonthIndex = monthIndices[endMonth];
      }

      if (startMonthIndex === undefined || endMonthIndex === undefined) {
        console.error(`Mois invalide trouvé: ${volanaNambolena}, ${endMonth}`);
        continue;
      }

      // Création de l'objet de tâche avec les dates de début et de fin
      const task = {
        name: taskName,
        start: new Date(2024, startMonthIndex, 1),
        end: new Date(2024, endMonthIndex + 1, 0)
      };
      console.log('task', task);
      transformedTasks.push(task);
    }

    return transformedTasks;
  }

  const groupedTasks = {};
  tasks.forEach(task => {
    if (!groupedTasks[task.name]) {
      groupedTasks[task.name] = [];
    }
    groupedTasks[task.name].push(task);
  });

  const xScale = d3.scaleTime()
    .domain([new Date(2024, 0, 1), new Date(2024, 11, 31)])
    .range([0, svgWidth]);

  const monthNamesFr = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  const monthsEnd = Array.from({ length: 12 }, (_, i) =>
    new Date(new Date(2024, i, 1).setMonth(i + 1))
  );
  let maxY = 0;
  tasks.forEach(task => {
    const taskHeight = Math.max(xScale(task.end) - xScale(task.start), 0); // Assurez-vous que la hauteur est positive
    maxY += taskHeight;
  });

  return (
    <View style={styles.container}>
      <Svg width={svgWidth} height={maxY + 500}>
        {Array.from({ length: 12 }).map((_, index) => {
          const monthStart = new Date(2024, index, 1);
          const monthEnd = new Date(2024, index + 1, 0);
          const x = xScale(monthStart);
          const width = xScale(monthEnd) - x;

          return (
            <React.Fragment key={index}>
              <Rect
                x={x}
                y={20}
                width={width}
                height={20}
                fill="#f2f2f2"
              />
              <Text
                x={x + width / 2}
                y={35}
                fontSize={12}
                fill="black"
                textAnchor="middle"
              >
                {monthNamesFr[index]}
              </Text>
              {index < 11 && (
                <Line
                  x1={x + width}
                  y1={20}
                  x2={x + width}
                  y2={maxY + 20}
                  stroke="black"
                  strokeWidth={1}
                />
              )}
            </React.Fragment>
          );
        })}

        {Object.entries(groupedTasks).map(([name, tasksGroup], index) => (
          <React.Fragment key={index}>
            {tasksGroup.map((task, taskIndex) => {
              const rectWidth = xScale(task.end) - xScale(task.start);
              if (isNaN(rectWidth)) {
                console.warn(`Erreur de calcul de largeur pour la tâche ${task.name}: ${rectWidth}`);
                return null; // Ne dessinez pas le rectangle si la largeur est NaN
              }
              return (
                <React.Fragment key={taskIndex}>
                  <Rect
                    x={xScale(task.start)}
                    y={40 + index * 60}
                    width={rectWidth}
                    height={20}
                    fill={taskIndex === 1 ? 'red' : 'blue'}
                    rx={5}
                    ry={5}
                  />
                  <Text
                    x={xScale(task.start) + 5}
                    y={55 + index * 60}
                    fontSize={12}
                    fill="white"
                  >
                    {task.name}
                  </Text>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        ))}

        <G>
          <Rect x={0} y={maxY + 100} width={svgWidth} height={200} fill="lightgrey" />
          <Text x={10} y={maxY + 120} fontSize={12} fill="black">Légende:</Text>
          <Rect x={130} y={maxY + 100} width={20} height={20} fill="blue" rx={5} ry={5} />
          <Text x={160} y={maxY + 120} fontSize={12} fill="black">Nambolena/Niopiana</Text>
          <Rect x={300} y={maxY + 100} width={20} height={20} fill="red" rx={5} ry={5} />
          <Text x={330} y={maxY + 120} fontSize={12} fill="black">Niakarana</Text>
          {sehapiharianaValues.map((item, index) => (
            <React.Fragment key={index}>
              <Text x={40} y={maxY + 150 + index * 20} fontSize={12} fill="black">{`${index + 1} ${item}`}</Text>
            </React.Fragment>
          ))}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default CalendrierProduction;
