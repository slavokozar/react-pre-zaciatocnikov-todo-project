import './style.css';
import {useState, useEffect} from "react";
import FilterItem from "./FilterItem";
import axios from "axios";

export default function App() {

    const initTasks = [
        {
            text: "Completed Task 12312312",
            completed: true,
        },
        {
            text: "Todo Task",
            completed: false
        }
    ];

    const [tasks, setTasks] = useState(initTasks);
    const [input, setInput] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        // const newTask = {
        //     text: input,
        //     completed: false
        // }
        //
        // const newTasksValue = tasks.concat(newTask);
        //
        // setTasks(newTasksValue);

        setTasks(
            tasks.concat(
                {
                    text: input,
                    completed: false
                }
            )
        )
    }

    useEffect(() => {
        console.log('Log pri inite appky');

        fetchTasks();

    }, []);

    useEffect(async () => {
        // const response = await fetch("google.com");
        //
        // console.log(response);
    }, [])


    async function fetchTasks() {
        // const response =  await fetch('https://todo.eragon.digital/api/tasks?api_token=react-pro-zacatecniky');
        // const tasks =               await response.json();

        const response = await axios.get('https://todo.eragon.digital/api/tasks?api_token=react-pro-zacatecniky');

        setTasks(response.data);
    }

    console.log("logujem nieco v appke");

    const [filter, setFilter] = useState('active');
    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-header px-4">
                    <h1 className="card-title text-center mb-5">Awesome Todo list</h1>
                    <form onSubmit={handleSubmit} className="add-items d-flex mb-3">
                        <input
                            value={input}
                            onChange={(event) => {
                                setInput(event.target.value)
                            }}
                            type="text"
                            className="form-control me-2"
                            placeholder="What do you need to do today?"
                        />
                        <button type="submit" className="add btn btn-primary font-weight-bold todo-list-add-btn">Add
                        </button>
                    </form>
                </div>

                <div className="card-body px-4">
                    <ul className="nav nav-pills mb-4">
                        <FilterItem value="all" filterValue={filter} setFilterValue={setFilter}/>
                        <FilterItem value="active" filterValue={filter} setFilterValue={setFilter}/>
                        <FilterItem value="completed" filterValue={filter} setFilterValue={setFilter}/>
                    </ul>

                    <div className="list-wrapper">
                        {/* unordered list */}
                        <ul>
                            {/* list item */}

                            {
                                tasks.map((task, index) => {
                                    console.log(task, index);

                                    return (
                                        <li key={index} className="py-2 d-flex justify-content-between completed">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        onChange={(event) => {
                                                            // je checkbox `checked` ?
                                                            console.log('check', event.target.checked);
                                                            // tasks[index].completed = true / false

                                                            setTasks(
                                                                tasks.map((t, i) => {
                                                                    if (i === index) {
                                                                        // zmena
                                                                        return {
                                                                            text: t.text,
                                                                            completed: event.target.checked
                                                                        };
                                                                    } else {
                                                                        // bez zmeny
                                                                        return t;
                                                                    }
                                                                })
                                                            )
                                                        }}
                                                    />
                                                    {task.text}
                                                </label>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-link text-danger"
                                                onClick={() => {
                                                    // vymazat task XYZ

                                                    setTasks(
                                                        tasks.filter((localTask, localIndex) => (
                                                            index !== localIndex
                                                        ))
                                                    )

                                                    console.log("delete task", index);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor"
                                                     className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                                    <path fillRule="evenodd"
                                                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                                </svg>
                                            </button>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    {/*<p className="">No Tasks for today :) </p>*/}
                </div>

                <div className="card-footer text-center">
                    &copy; 2022
                </div>
            </div>
        </div>
    )
}