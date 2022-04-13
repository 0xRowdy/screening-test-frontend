import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Card from '../molecules/Card';
import { TaskInterface } from '../../mock-data.types';

type Props = {
  task: TaskInterface;
  index: number;
  columnId: string;
  onDeleteTask: (columnId: string, taskId: string) => void;
};

const Task: React.FC<Props> = (props) => {
  const { task, index } = props;
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="mb-5 mx-3"
        >
          <Card
            className={`flex flex-col w-auto p-4 ${
              snapshot.isDragging ? 'bg-green-200' : 'bg-inherit'
            }`}
          >
            <div className="flex justify-between">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                {task.name}
              </h5>
              <button
                onClick={() => {
                  props.onDeleteTask(props.columnId, task.id);
                }}
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700 text-base mb-4">{task.description}</p>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Button
            </button>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
