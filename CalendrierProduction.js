import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Rect, Text,Line,G } from 'react-native-svg';
import * as d3 from 'd3';


const CalendrierProduction = () => {
  const tasks = [
    { name: '1', start: new Date(2024, 4, 1), end: new Date(2024, 4, 30) },
    { name: '2', start: new Date(2024, 4, 1), end: new Date(2024, 4, 30) },
    { name: '3', start: new Date(2024, 6, 1), end: new Date(2024, 6, 30) },
    { name: '1', start: new Date(2024, 6, 1), end: new Date(2024, 8, 30) },
    { name: '4', start: new Date(2024, 3, 1), end: new Date(2024, 6, 30) },
    { name: '5', start: new Date(2024, 6, 1), end: new Date(2024, 6, 30) },
    { name: '5', start: new Date(2024, 1, 1), end: new Date(2024, 3, 30) },
    // Ajoutez d'autres tâches ici
  ];

  // Créer un objet de groupes de tâches
  const groupedTasks = {};
  tasks.forEach(task => {
    if (!groupedTasks[task.name]) {
      groupedTasks[task.name] = [];
    }
    groupedTasks[task.name].push(task);
  });

  const xScale = d3.scaleTime()
    .domain([new Date(2024, 0, 1), new Date(2024, 11, 31)])
    .range([0, 800]);

  const monthNames = d3.timeFormat("%B");
  const monthNamesFr = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  const monthsEnd = Array.from({length: 12}, (_, i) =>
    new Date(new Date(2024, i, 1).setMonth(i + 1))
  );
  let maxY = 0;
  tasks.forEach(task => {
    const taskHeight = Math.max(xScale(task.end) - xScale(task.start), 0); // Assurez-vous que la hauteur est positive
    maxY += taskHeight;
  });

  return (
    <View style={styles.container}>
      <Svg width={800} height={maxY+200}>
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
              {/* Ajout de la ligne verticale après chaque groupe de tâches */}
             
            </React.Fragment>
          );
        })}

        {/* Afficher les groupes de tâches */}
        {Object.entries(groupedTasks).map(([name, tasksGroup], index) => (
          <React.Fragment key={index}>
            {tasksGroup.map((task, taskIndex) => (
              <React.Fragment key={taskIndex}>
                <Rect
                  x={xScale(task.start)}
                  y={40 + index * 60}
                  width={xScale(task.end) - xScale(task.start)}
                  height={20}
                  fill={taskIndex === 1? 'red' : 'blue'}
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
            ))}
          </React.Fragment>
        ))}
             {/* Dessiner une ligne pour chaque tâche jusqu'à la dernière */}
             {monthsEnd.map((monthEnd, index) => (
          <Line
            key={index}
            x1={xScale(monthEnd)}
            y1={20}
            x2={xScale(monthEnd)}
            y2={maxY} // Hauteur jusqu'à laquelle la ligne doit aller
            stroke="gray"
            strokeWidth={1}
          />
        ))}

        {/* Légende */}
        <G>
        <Rect x={0} y={maxY - 40} width={800} height={200} fill="lightgrey" />
            <Text x={10} y={maxY} fontSize={12} fill="black">Légende:</Text>
            <Rect x={130} y={maxY - 20} width={20} height={20} fill="blue" rx={5} ry={5} />
            <Text x={160} y={maxY} fontSize={12} fill="black">Nambolena/Niopiana</Text>
            <Rect x={300} y={maxY - 20} width={20} height={20} fill="red" rx={5} ry={5} />
            <Text x={330} y={maxY} fontSize={12} fill="black">Niakarana</Text>
            <Text x={40} y={maxY+25} fontSize={12} fill="black">1 Vary antanim-bary</Text>
            <Text x={40} y={maxY+45} fontSize={12} fill="black">2 Vary antanety</Text>
            <Text x={40} y={maxY+65} fontSize={12} fill="black">3 Petis poids</Text>
            <Text x={40} y={maxY+85} fontSize={12} fill="black">4 Kisoa</Text>
            <Text x={40} y={maxY+105} fontSize={12} fill="black">5 Voanjobory</Text>
          </G>
       
      </Svg>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  }
   
});

export default CalendrierProduction;