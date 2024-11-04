import {loggerReducer} from "../slices/loggerSlice.ts";
import {boardsReducer} from "../slices/boardsSlice.ts";
import {modalReducer} from "../slices/modalSlice.ts";


const reducer = {
    logger: loggerReducer,
    boards : boardsReducer,
    modal : modalReducer,
}

export default reducer;