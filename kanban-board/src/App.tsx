import React, { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import Column from './components/organisms/Column';
import { initialData } from './mock-data';

function App() {
  const [state, setState] = useState(initialData);

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };

      setState(newState);
      return;
    }

    const start = state.columns[source.droppableId];
    console.log('State Columns', state.columns);
    const finish = state.columns[destination.droppableId];

    /*
     * Card target destination is card orgin colum
     */
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setState((prevState) => {
        return {
          ...prevState,
          columns: {
            ...prevState.columns,
            [newColumn.id]: newColumn,
          },
        };
      });
      return;
    }

    /*
     * Card target destination is not the column it originated from
     */
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setState((prevState) => {
      return {
        ...prevState,
        columns: {
          ...prevState.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
    });
  };

  const onAddColumn = () => {
    const mockNewColumn = {
      id: uuidv4(),
      title: 'finished',
      taskIds: [],
    };
    setState((prevState) => {
      return {
        ...prevState,
        columns: {
          ...prevState.columns,
          [mockNewColumn.id]: mockNewColumn,
        },
        columnOrder: [...prevState.columnOrder, mockNewColumn.id],
      };
    });
  };

  const onDeleteColumn = (columnId: string) => {
    const updatedColumnOrder = state.columnOrder.filter(
      (itemId) => itemId !== columnId,
    );
    const updatedColumns = state.columns;
    delete updatedColumns[columnId];

    setState((prevState) => {
      return {
        ...prevState,
        columns: {
          ...updatedColumns,
        },
        columnOrder: [...updatedColumnOrder],
      };
    });
  };

  const onAddTask = (columnId: string) => {
    const mockNewTask = {
      id: uuidv4(),
      name: 'task-5',
      description: 'NEW TASK NEA TASK',
      created: new Date().toLocaleDateString('en-US'),
      status: 0,
    };

    const targetColumn = state.columns[columnId];
    const newTaskIds = Array.from(targetColumn.taskIds);
    newTaskIds.push(mockNewTask.id);
    const newColumn = {
      ...targetColumn,
      taskIds: newTaskIds,
    };

    setState((prevState) => {
      return {
        ...prevState,
        columns: {
          ...prevState.columns,
          [newColumn.id]: newColumn,
        },
        tasks: {
          ...prevState.tasks,
          [mockNewTask.id]: mockNewTask,
        },
      };
    });
  };

  const onDeleteTask = (columnId: string, taskId: string) => {
    const targetColumn = state.columns[columnId];
    const newTaskIds = Array.from(
      targetColumn.taskIds.filter((itemId) => itemId !== taskId),
    );
    const updatedColumn = {
      ...targetColumn,
      taskIds: newTaskIds,
    };
    const updatedTasks = state.tasks;
    delete updatedTasks[taskId];

    setState((prevState) => {
      return {
        ...prevState,
        tasks: { ...updatedTasks },
        columns: {
          ...prevState.columns,
          [updatedColumn.id]: updatedColumn,
        },
      };
    });
  };

  return (
    <div className="">
      <button onClick={onAddColumn}>Add Column</button>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              className="container mx-auto flex space-x-4"
              {...provided.droppableProps}
            >
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId],
                );
                return (
                  <Column
                    key={column.id}
                    index={index}
                    column={column}
                    tasks={tasks}
                    onAddTask={onAddTask}
                    onDeleteTask={onDeleteTask}
                    onDeleteColumn={onDeleteColumn}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
