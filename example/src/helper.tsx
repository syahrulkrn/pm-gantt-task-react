import { Task } from "../../dist/types/public-types";

export function initTasks() {
  const currentDate = new Date();

  const tasks: Task[] = [
    {
      id: "TML1738728678",
      name: "Task PM 8",
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), // Awal bulan ini
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 3), // Tanggal 3 bulan ini
      type: "project",
      progress: 0,
      isDisabled: false,
      styles: {
        backgroundColor: "#22C55E",
      },
      hideChildren: false,
    },
    {
      id: "TML1738728756",
      name: "Task PM 8 (2)",
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5), // Tanggal 5 bulan ini
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 14), // Tanggal 20 bulan ini
      type: "project",
      progress: 0,
      isDisabled: false,
      styles: {
        backgroundColor: "#22C55E",
      },
      hideChildren: true,
    },
    {
      id: "TML1738812585",
      name: "TEST Parent Week",
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10), // Tanggal 10 bulan ini
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15), // Tanggal 15 bulan ini
      type: "task",
      progress: 0,
      isDisabled: false,
      styles: {
        backgroundColor: "#22C55E",
      },
      hideChildren: false,
    },
  ];

  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
