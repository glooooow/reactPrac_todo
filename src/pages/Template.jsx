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
                <td style={{"width": "70px", "textAlign":"center"}}><span class="tag is-dark">No.</span></td>
                <td style={{"width": "400px", "textAlign":"center"}}><span class="tag is-warning">What's To do?</span></td>
                <td style={{"width": "100px", "textAlign":"center"}}><span class="tag is-link">Select</span></td>
                <td style={{"width": "100px", "textAlign":"center"}}><span class="tag is-danger">Delete</span></td>
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
                    <td style={{"width": "70px", "textAlign":"center"}}><span class="tag is-light">{id}.</span></td>
                    <td className="todoTitle" style={checked? {"textAlign":"center", "textDecoration":"line-through", "fontWeight":"bold"} : {"textAlign":"center"}}>{title}</td>
                    <td style={{"width": "100px", "textAlign":"center"}}><label className="checkbox" />{checked ? <input type="checkbox" onClick={() => checkTodo(id)} checked/> : <input type="checkbox" onClick={() => checkTodo(id)} />}</td>
                    <td style={{"width": "100px", textAlign:"center"}}><button className="delete is-small" onClick={() => deleteTodo(id)}/></td>
                </tr>
            </tbody>
        </div>
    );
}

export {TodoListItem};
