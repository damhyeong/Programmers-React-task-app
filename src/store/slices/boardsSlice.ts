import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBoard, IList, ITask} from "../../types";

type TBoardsState = {
    modalActive : boolean;
    boardArray : IBoard[];
}

type TAddBoardAction = {
    board: IBoard;
}

type TDeleteListAction = {
    boardId: string;
    listId: string;
}

type TAddListAction = {
    boardId : string;
    list : IList;
}

type TAddTaskAction = {
    boardId : string;
    listId : string;
    task : ITask;
}

type TDeleteTaskAction = {
    boardId : string;
    listId : string;
    task : ITask;
}

type TDeleteBoardAction = {
    boardId : string;
}

type TSortAction = {
    boardIndex : number;
    droppableIdStart: string;
    droppableIdEnd: string;
    droppableIndexStart: number;
    droppableIndexEnd: number;
    draggableId: string;
}


const initialState : TBoardsState = {
    modalActive : false,
    boardArray : [
        {
            boardId : "board-0",
            boardName : "첫 번째 게시물",
            lists : [
                {
                    listId : "list-0",
                    listName : "List 1",
                    tasks : [
                        {
                            taskId : "task-0",
                            taskName : "Task 1",
                            taskDescription: "Description",
                            taskOwner: "Jason"
                        },
                        {
                            taskId : "task-1",
                            taskName : "Task 2",
                            taskDescription: "Description",
                            taskOwner: "Jason"
                        }
                    ]
                },
                {
                    listId : "list-1",
                    listName : "List 2",
                    tasks : [
                        {
                            taskId : "task-3",
                            taskName : "Task 3",
                            taskDescription: "Description",
                            taskOwner: "Jason"
                        }
                    ]
                }
            ]
        }
    ]
}

const boardsSlice = createSlice({
    name : "boards",
    initialState,
    reducers : {
        addBoard: (state, {payload}: PayloadAction<TAddBoardAction>) => {
            // 내부에서 immer 라이브러리를 사용하고 있어 불변성을 신경쓰지 않아도 된다 하신다.
            state.boardArray.push(payload.board);
        },
        addList: (state, {payload} : PayloadAction<TAddListAction>) => {
            state.boardArray.map(board =>
                board.boardId === payload.boardId
                ? {...board, lists: board.lists.push(payload.list)}
                    : board
            )
        },
        addTask: (state, {payload} : PayloadAction<TAddTaskAction>) => {
            state.boardArray.map(board => {
                return board.boardId === payload.boardId ?
                    {
                        ...board,
                        lists: board.lists.map(list =>
                            list.listId === payload.listId ?
                                {
                                    ...list,
                                    tasks : list.tasks.push(payload.task)
                                }
                                : list
                        )
                    }
                    : board
            });
        },
        updateTask : (state, {payload} : PayloadAction<TAddTaskAction>) => {
            state.boardArray.map(board => {
                return board.boardId === payload.boardId ?
                    {
                        ...board,
                        lists: board.lists.map(list =>
                            list.listId === payload.listId ?
                                {
                                    ...list,
                                    tasks : list.tasks.map((task) => {
                                        return task.taskId === payload.task.taskId ?
                                            payload.task : task
                                    })
                                }
                                : list
                        )
                    }
                    : board
            })
        },
        deleteBoard : (state, {payload} : PayloadAction<TDeleteBoardAction>) => {
            state.boardArray = state.boardArray.filter(
                board => board.boardId !== payload.boardId
            )
        },
        deleteList: (state, {payload} : PayloadAction<TDeleteListAction>) => {
            state.boardArray = state.boardArray.map(
                (board) => {
                    return board.boardId === payload.boardId ?
                        {
                            ...board,
                            lists: board.lists.filter(
                                list => list.listId !== payload.listId
                            )
                        } :
                        board
                })
        },
        deleteTask: (state, {payload} : PayloadAction<TDeleteTaskAction>) => {
            state.boardArray = state.boardArray.map(
                (board) => {
                    return board.boardId === payload.boardId ?
                        {
                            ...board,
                            lists: board.lists.map((list) => {
                                return list.listId === payload.listId ?
                                    {
                                        ...list,
                                        tasks: list.tasks.filter(
                                            task => task.taskId !== payload.task.taskId
                                        )
                                    } :
                                    list
                            })
                        } :
                        board
            })
        },

        setModalActive: (state, {payload}: PayloadAction<boolean>) => {
            state.modalActive = payload
        },
        sort : (state, {payload}: PayloadAction<TSortAction>) => {
            // Same List
            if (payload.droppableIdStart === payload.droppableIdEnd){
                const list = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdStart
                );

                // 변경시킬 아이템을 배열에서 삭제한다.
                // return 값으로 지원진 아이템을 잡는다.
                const card = list?.tasks.splice(payload.droppableIndexStart, 1);
                list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
            }

            // Other List
            if(payload.droppableIdStart){
                const listStart = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdStart
                );

                const card = listStart!.tasks.splice(payload.droppableIndexStart, 1);
                const listEnd = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdEnd
                );
                listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card);
            }
        }
    }
});


export const {addBoard, addTask, addList, deleteList, setModalActive, updateTask, deleteTask, deleteBoard, sort} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
