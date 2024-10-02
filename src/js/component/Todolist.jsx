import React, { useState, useEffect } from "react";

const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const createUser = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/AGNDev", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
            const data = await response.json()
            console.log(data);
            return true;
        } catch (error) {
            console.log("Error: ", error)
            return false;
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/AGNDev", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            // console.log(response);
            if (response.status == 404) {
                createUser();
            }
            const data = await response.json()
            setTodos(data.todos);
            return true;
        } catch (error) {
            console.log("Error: ", error)
            return false;
        }
    }

    const createTodo = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/AGNDev", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "label": inputValue,
                    "is_done": false
                })
            })

            const data = await response.json()
            // console.log(data);
            getTodos();
            setInputValue("");
            return true;
        } catch (error) {
            console.log("Error: ", error)
            return false;
        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/" + id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            const data = await response.json()
            console.log(data);
            getTodos();
            return true;
        } catch (error) {
            console.log("Error: ", error)
            return false;
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (

        <div className="card text-center mt-5" style={{ width: "40rem" }}>
            <span className="title">todos</span>
            <ul className="list-group list-group-flush ms-5 me-5 mb-5 border border-start border-end">
                <li className=" box list-group-item border border-top">
                    <input className="d-flex ms-4 border-0"
                        type="text"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && inputValue.trim()) {
                                // setTodos(todos.concat(inputValue)); 
                                // setInputValue("");
                                createTodo();
                            }
                        }}
                        placeholder="What needs to be done?"></input>
                </li>
                {todos.length === 0 ? (
                    <li className="list-group-item tasks d-flex ps-5 text-secondary"> No hay tareas, añadir tareas</li>
                ) : (
                    todos.map((item) => (
                        <li key={item.id} className="list-group-item todo-item d-flex ps-5 text-secondary">
                            {item.label}
                            <button
                                className="remove text-success"
                                // onClick={() => setTodos(todos.filter((_, currentIndex) => index !== currentIndex))}
                                onClick={() => deleteTodo(item.id)}
                            >
                                X
                            </button>
                        </li>
                    )))}
                <li className="itemcounter list-group-item d-flex ms-0 text-secondary"> {todos.length} item left</li>
            </ul>
        </div>
    );
};

export default TodoList;

