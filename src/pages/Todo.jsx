import React, { useCallback, useRef, useState } from 'react';
import TodoTemplate, { TodoList, TodoListItem } from "./Template";
import { TodoAdd } from './Template';

const Todo = (props) => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: 'React 연습하기',
            checked: true,
        },
        {
            id: 2,
            title: '오류 수정하기',
            checked: true,
        },
        {
            id: 3,
            title: '리액트 마스터하기',
            checked: false,
        },
    ]);
    
    const setTodoId = useRef(null);

    const addTodo = useCallback(
        (title) => {
            if (title === "") {
                alert("할 일을 입력해주세요");
            } 
            if ((title !== "") && (todos.length === 0)) {
                const todo = {
                    id: Number(0) + 1,
                    title,
                    checked: false,
                };
                setTodos(todos.concat(todo));
                setTodoId.current += 1;
                alert("등록 완료");
            }
            if ((title !== "") && (todos.length > 0)){
                const lastTodo = todos[todos.length - 1];
                const todo = {
                    id: Number(lastTodo.id) + 1,
                    title,
                    checked: false,
                };
                setTodos(todos.concat(todo));
                setTodoId.current += 1;
                alert("등록 완료");
            }
        },
        [todos, setTodoId]
    );



    const deleteTodo = useCallback(
        (id) => {
           setTodos(todos.filter((todo) => Number(todo.id) !== id).map((value,index)=>{
                return {...value, id:(index+1)}
            }));
         },
        [todos]
    );


    
    const checkTodo = useCallback(
        (id) => {
            setTodos(todos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)))
          },
          [todos]
        );

    return (
        <TodoTemplate>
            <TodoAdd addTodo={addTodo} />
            <TodoList todos={todos} deleteTodo={deleteTodo} checkTodo={checkTodo} />
        </TodoTemplate>
    );
}

export default Todo;