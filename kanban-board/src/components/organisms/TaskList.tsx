import React, { Fragment } from 'react';

import Task from './Task';
import { TaskInterface } from '../../mock-data.types';

type Props = {
  tasks: TaskInterface[];
  index: number;
  columnId: string;
  onDeleteTask: (columnId: string, taskId: string) => void;
};

const TaskList: React.FC<Props> = (props): JSX.Element => {
  return (
    <Fragment>
      {props.tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          columnId={props.columnId}
          onDeleteTask={props.onDeleteTask}
        />
      ))}
    </Fragment>
  );
};

export default React.memo(TaskList);
