// @flow
import type { DraggableId, DraggableLocation } from 'react-beautiful-dnd';

export type Id = string;

export type Columns = {
  [id: string]: ColumnInterface;
};

export type ColumnInterface = {
  id: string;
  title: string;
  taskIds: string[];
};

export type Tasks = {
  [id: string]: TaskInterface;
};

export type TaskInterface = {
  id: string;
  name: string;
  description: string;
  created: string;
};
