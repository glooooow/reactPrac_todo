import { useState, useCallback } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdDelete, MdNumbers } from "react-icons/md";
import cn from "classnames";
import "../components/Todo.scss";

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
            <thead>
                <tr>
                    <th className="todoIds" style={{"width": "50px"}}>No.</th>
                    <th className="titles" style={{"width": "300px", "textAlign": "center"}}>What's To do?</th>
                    <th className="checked" style={{"width": "100px", "textAlign":"center"}}>Select</th>
                    <th className="delete" style={{"width": "100px", "textAlign":"center"}}>Delete</th>
                </tr>
            </thead>
            {todos.map((todo) => (
                <TodoListItem todo={todo} key={todo.id} deleteTodo={deleteTodo} checkTodo={checkTodo} />
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
            <tbody>
                <tr>
                    <td className="todoId" style={{"width": "50px"}}><MdNumbers />{id}</td>
                    <td className="title" style={{"width": "300px", "textAlign":"center"}}>{title}</td>
                    <td className={cn("checkbox", { checked })} onClick={() => checkTodo(id)} style={{"width": "100px", "textAlign":"center"}}>{checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</td>
                    <td className="delete" onClick={() => deleteTodo(id)} style={{"width": "100px", "textAlign":"center"}}><MdDelete /> </td>
                </tr>
            </tbody>
        </div>
    );
}

export {TodoListItem};