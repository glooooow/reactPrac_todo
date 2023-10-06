import { useState, useCallback } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdDelete, MdNumbers } from "react-icons/md";
import cn from "classnames";
import "bulma/css/bulma.css";
import "components/Todo.scss";

//기본 템플릿
const TodoTemplate = ({ children }) => {
    return (
        <div className="TodoTemplate">
            {/* <div>
                <nav>
                    <ul>
                        <li><button class="button is-light">Main</button></li>
                        <li><button class="button is-light">Contact Us</button></li>
                        <li><button class="button is-light">My Page</button></li>
                        <li><button class="button is-light">More Info</button></li>
                    </ul>
                </nav>
            </div>           */}
            <div class="tags are-large" style={{"margin-top": "20px"}}>
                <div class="tags has-addons">
                    <span class="tag is-dark" style={{"width": "180px", "font-weight": "bold"}}>할일 목록</span>
                    <span class="tag is-info">0.0.1 v</span>
                </div>
            </div>
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
            <input className="input" placeholder="할 일을 입력하세요" value={value} onChange={onChange} />
            <button className="button is-info is-outlined" type="submit" style={{"font-weight": "bold"}}>등록하기</button>
        </form>
    )
}

export {TodoAdd};


//할일 목록
const TodoList = ({ todos, deleteTodo, checkTodo }) => {
    return (
        <div className="TodoList-Table-Head">
            <thead>
                <tr>
                    <th className="todoIds" style={{"width": "100px"}}>No.</th>
                    <th className="titles" style={{"width": "400px", "textAlign": "center"}}>What's To do?</th>
                    <th className="checked" style={{"width": "100px", "textAlign":"center"}}>Select</th>
                    <th className="delete?" style={{"width": "100px", "textAlign":"center"}}>Delete</th>
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
        <div className="TodoList-Table-Body">
            <tbody>
                <tr>
                    <td className="todoId" style={{"width": "100px"}}><MdNumbers />{id}</td>
                    <td className="todoTitle" style={checked? {"width": "400px", "textAlign":"center", "textDecoration":"line-through"} : {"width": "400px", "textAlign":"center"}}>{title}</td>
                    <td className={cn("checkbox", { checked })} onClick={() => checkTodo(id)} style={{"width": "100px", "textAlign":"center"}}>{checked ? <MdCheckBox /> : (<MdCheckBoxOutlineBlank />)}</td>
                    <td className="btn-delete" onClick={() => deleteTodo(id)} style={{"width": "100px", "textAlign":"center"}}><MdDelete /> </td>
                </tr>
            </tbody>
        </div>
    );
}

export {TodoListItem};
