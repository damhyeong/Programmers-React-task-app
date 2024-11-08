import React from 'react';
import {container, description, title} from "./Task.css.ts";

type TTaskProps = {
    taskName : string;
    taskDescription : string;
    boardId : string;
    id : string;
    index : number;
}

const Task : React.FC<TTaskProps> = ({
    taskName,
    taskDescription,
    boardId,
    id,
    index
}) => {
    return (
        <div className={container}>
            <div className={title}>
                {taskName}
            </div>
            <div className={description}>
                {taskDescription}
            </div>
        </div>
    );
};

export default Task;