import React from "react";
import { Chart } from "react-google-charts";

export default function GanttChart({ tasks, users, conflicts }) {

  if (tasks.length === 0) {
    return (
      <div style={{ marginTop: "2rem" }}>
        <h3>No task</h3>
      </div>
    );
  }

  // Prépare les données pour le diagramme de Gantt
  const data = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "User" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
    ...tasks.map((task) => [
      `Task-${task.id}`, // Task ID
      `Task ${task.id}`, // Task Name
      `User-${task.user_id}`, // User
      new Date(task.start), // Start Date
      new Date(task.end), // End Date
      null, // Duration (calculated automatically)
      conflicts.has(task.id) ? 0 : 100, // Percent Complete
      null, // Dependencies (none in this case)
    ]),
  ];

  // Options pour personnaliser le diagramme
  const options = {
    gantt: {
      criticalPathEnabled: false, // Désactiver le chemin critique
      trackHeight: 30, // Hauteur des lignes
    },
    timeline: {
      groupByRowLabel: true, // Important pour que l'axe soit cohérent
    },
    hAxis: {
      format: 'M/d/yy',
      gridlines: {count: 15}
    },
  };

  const formatters = [
    {
      type: "DateFormat",
      column: 3, // Colonne "Start Date"
      options: {
        pattern: "dd/MM/yyyy",
      },
    },
    {
      type: "DateFormat",
      column: 4, // Colonne "End Date"
      options: {
        pattern: "dd/MM/yyyy",
      },
    },
  ];

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3></h3>
      <Chart
        chartType="Gantt"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
