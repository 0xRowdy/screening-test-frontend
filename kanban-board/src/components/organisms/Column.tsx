import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import TaskList from './TaskList';
import { TaskInterface, ColumnInterface } from '../../mock-data.types';

type Props = {
  column: ColumnInterface;
  tasks: TaskInterface[];
  index: number;
  onAddTask: (columnId: string) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
  onDeleteColumn: (columnId: string) => void;
};

const Column: React.FC<Props> = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided, snapshot) => (
        // Todo replace with card component. Add Ref to it
        <div
          ref={provided.innerRef}
          className={`rounded-lg shadow-lg flex flex-col w-auto basis-1/4 bg-white
            ${snapshot.isDragging ? 'bg-green-200' : 'bg-inherit'}
          `}
          {...provided.draggableProps}
        >
          <div
            className="flex justify-between my-3 px-6 border-b border-gray-300"
            {...provided.dragHandleProps}
          >
            <h2 className="text-gray-900 text-xl font-medium mb-2">
              {props.column.title}
            </h2>
            <button onClick={() => props.onAddTask(props.column.id)}>
              Add Task
            </button>
            <button onClick={() => props.onDeleteColumn(props.column.id)}>
              Delete
            </button>
          </div>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`min-h-[100px] transition: background-color 0.2s ease
                  ${snapshot.isDraggingOver ? 'bg-blue-200' : 'bg-inherit'}
                `}
                {...provided.droppableProps}
              >
                <TaskList
                  tasks={props.tasks}
                  index={props.index}
                  columnId={props.column.id}
                  onDeleteTask={props.onDeleteTask}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
