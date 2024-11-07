import React, {useState} from 'react';
import {FiCheck} from "react-icons/fi";
import {sideForm, input, icon} from "./SideForm.css.ts";
import {useTypedDispatch} from "../../../hooks/redux.ts";
import {addBoard} from "../../../store/slices/boardsSlice.ts";
import { v4 as uuidv4 } from "uuid"
import {addLog} from "../../../store/slices/loggerSlice.ts";

type TSideFormProps = {
    inputRef : React.RefObject<HTMLInputElement>
    setIsFormOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

const SideForm : React.FC<TSideFormProps> = ({
    inputRef,
    setIsFormOpen
}) => {
    const [inputText, setInputText] = useState<string>('');
    const dispatch = useTypedDispatch();

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    const handleOnBlur = () => {
        setIsFormOpen(false);
    }
    const handleClick = () => {
        if(inputText){
            dispatch(
                addBoard({
                    board: {
                        boardId: uuidv4(),
                        boardName: inputText,
                        lists: []
                    }
                })
            );

            dispatch(
                addLog({
                    logId: uuidv4(),
                    logMessage: `게시판 등록: ${inputText}`,
                    logAuthor: "User",
                    logTimestamp: String(Date.now()),

                })
            );
        }
    }

    return (
        <div className={sideForm}>
            <input
                autoFocus
                className={input}
                ref={inputRef}
                type={"text"}
                placeholder={"새로운 게시판 등록하기!"}
                value={inputText}
                onChange={handleChange}
                onBlur={handleOnBlur}
            />
            <FiCheck className={icon} onMouseDown={handleClick}/>
        </div>
    );
};

export default SideForm;