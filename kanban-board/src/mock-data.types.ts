// @flow
import type { DraggableId, DraggableLocation } from 'react-beautiful-dnd';

export type Id = string;

export type Columns = {
  [id: Id]: ColumnInterface;
};

export type ColumnInterface = {
  id: Id;
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
  status: Status;
};

enum Status {
  Open = 0,
  Closed = 1,
}
