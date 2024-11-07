import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBoard} from "../../types";

type TBoardsState = {
    modalActive : boolean;
    boardArray : IBoard[];
}

type TAddBoardAction = {
    board: IBoard;
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
        }
    }
});


export const {addBoard} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
