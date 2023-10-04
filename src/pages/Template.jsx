import { useState, useCallback } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdDelete, MdNumbers } from "react-icons/md";
import cn from "classnames";

//기본 템플릿
const TodoTemplate = ({ children }) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title"><h1>할일 목록</h1></div>
            <div className="content">{children}</div>
        </div>
    );
}

export default TodoTemplate;


//할일 추가
const TodoAdd = ({ addTodo }) => {
    const [value, setValue] = useState("");
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    const onSubmit = useCallback((e) => {
        addTodo(value);
        setValue("");

        e.preventDefault();
    }, [addTodo, value]);

    return (
        <form className="TodoAdd" onSubmit={onSubmit}>
            <input placeholder="할 일을 입력하세요" value={value} onChange={onChange} />
            <button type="submit">등록하기</button>
        </form>
    )
}

export {TodoAdd};


//할일 목록
const TodoList = ({ todos, deleteTodo, checkTodo }) => {
    return (
        <div className="TodoList">
            {todos.map((todo) => (
                <TodoListItem todo = {todo} key={todo.id} deleteTodo={deleteTodo} checkTodo={checkTodo} />
            ))}
        </div>
    )
};

export {TodoList};



//할일 목록(개별)
const TodoListItem = ({ todo, deleteTodo, checkTodo }) => {
    const { id, title, checked } = todo;
    return (
        <div className="TodoList-Table">
            <thead>
                <tr>
                    <th className="todoId"><MdNumbers />{id}</th>
                    <th className="title">{title}</th>
                    <th className={cn("checkbox", { checked })} onClick={() => checkTodo(id)}>{checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</th>
                    <th className="delete" onClick={() => deleteTodo(id)}><MdDelete /> </th>
                </tr>
            </thead>
        </div>
    );
}

export {TodoListItem};