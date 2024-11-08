import React from 'react';
import {IList, ITask} from "../../types";
import {GrSubtract} from "react-icons/gr";
import Task from "../Task/Task.tsx";
import ActionButton from "../ActionButton/ActionButton.tsx";
import {useTypedDispatch} from "../../hooks/redux.ts";
import {deleteList, setModalActive} from "../../store/slices/boardsSlice.ts";
import {addLog} from "../../store/slices/loggerSlice.ts";
import {v4} from "uuid";
import {setModalData} from "../../store/slices/modalSlice.ts";
import {deleteButton, header, listWrapper, name} from "./List.css.ts";

type TListProps = {
    list : IList;
    boardId : string;
}

const List : React.FC<TListProps> = ({
    list,
    boardId
}) => {
    const dispatch = useTypedDispatch();

    const handleListDelete = (listId : string) => {
        // redux 전역 데이터에 "deleteList" dispatch 지시 - boardsSlice
        dispatch(deleteList({boardId, listId}));
        // redux 전역 데이터에 "addLog" dispatch 지시 - loggerSlice
        dispatch(
            addLog({
                logId: v4(),
                logMessage: `리스트 삭제하기 : ${list.listName}`,
                logAuthor: "User",
                logTimestamp: String(Date.now())
            })
        )
    }

    const handleTaskChange = (
        boardId : string,
        listId : string,
        taskId : string,
        task : ITask
    ) => {
        dispatch(setModalData({boardId, listId, task}));
        dispatch(setModalActive(true));
    }

    return (
        <div className={listWrapper}>
            <div className={header}>
                <div
                    className={name}
                >{list.listName}</div>
                <GrSubtract
                    className={deleteButton}
                    onClick={() => handleListDelete(list.listId)}
                />
            </div>
            {
                list.tasks.map((task, index) => (
                    <div
                        key={task.taskId}
                        onClick={() => handleTaskChange(boardId, list.listId, task.taskId, task)}
                    >
                        <Task
                            taskName={task.taskName}
                            taskDescription={task.taskDescription}
                            boardId={boardId}
                            id={task.taskId}
                            index={index}
                        />
                    </div>
                ))
            }
            <ActionButton boardId={boardId} listId={list.listId}/>
        </div>
    );
};

export default List;