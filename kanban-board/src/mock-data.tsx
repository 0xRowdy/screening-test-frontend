import { Tasks, Columns } from './mock-data.types';

const tasks: Tasks = {
  'task-1': {
    id: 'task-1',
    name: 'task-1',
    description: 'Blah blah blah',
    created: new Date(2 / 21 / 21).toLocaleDateString('en-US'),
    status: 0,
  },
  'task-2': {
    id: 'task-2',
    name: 'task-2',
    description: 'MEMEME blah',
    created: new Date(2 / 10 / 2022).toLocaleDateString('en-US'),
    status: 0,
  },
  'task-3': {
    id: 'task-3',
    name: 'task-3',
    description: 'WAH WAH WAH blah',
    created: new Date(1 / 13 / 2022).toLocaleDateString('en-US'),
    status: 1,
  },
  'task-4': {
    id: 'task-4',
    name: 'task-4',
    description: 'CHA CAH CAH blah blah',
    created: new Date(3 / 23 / 2021).toLocaleDateString('en-US'),
    status: 1,
  },
};

const columns: Columns = {
  'column-1': {
    id: 'column-1',
    title: 'To do',
    taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
  },
  'column-2': {
    id: 'column-2',
    title: 'In Progress',
    taskIds: [],
  },
};

const columnOrder: string[] = ['column-1', 'column-2'];

export const initialData = {
  tasks: tasks,
  columns: columns,
  columnOrder: columnOrder,
};
