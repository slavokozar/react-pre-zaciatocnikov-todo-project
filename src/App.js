import './style.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import FilterItem from './FilterItem';

export default function App() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([])

    async function getTasks() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}tasks?api_token=${process.env.REACT_APP_API_TOKEN}`);
        setTasks(response.data);
    }

    useEffect(() => {
        getTasks();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await axios.post(`${process.env.REACT_APP_API_URL}tasks?api_token=${process.env.REACT_APP_API_TOKEN}`, {
            text: input
        });

        setTasks(tasks.concat(
            response.data
        ))
        setInput('');
    }

    async function handleActiveChange(task, active) {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}tasks/${task.id}?api_token=${process.env.REACT_APP_API_TOKEN}`, {
            active: active
        });

        setTasks(
            tasks.map((t) => {
                if (task.id === t.id) {
                    return response.data;
                }

                return t;
            })
        )
    }

    async function handleDelete(task) {
        await axios.delete(`${process.env.REACT_APP_API_URL}tasks/${task.id}?api_token=${process.env.REACT_APP_API_TOKEN}`);

        setTasks(
            tasks.filter((t) => (
                task.id !== t.id
            ))
        )
    }

    const [filter, setFilter] = useState('all');

    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-header px-4">
                    <h1 className="card-title text-center mb-5">Awesome Todo list</h1>
                    <form onSubmit={handleSubmit} className="add-items d-flex mb-3">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="What do you need to do today?"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="add btn btn-primary font-weight-bold todo-list-add-btn">Add
                        </button>
                    </form>
                </div>
                <div className="card-body px-4">
                    <ul className="nav nav-pills mb-4">
                        {
                            ["all", "active", "completed"].map((value) => (
                                <FilterItem value={value}
                                            filter={filter}
                                            setFilter={setFilter}
                                />
                            ))
                        }

                        <FilterItem value="all"
                                    filter={filter}
                                    setFilter={setFilter}
                        />
                        <FilterItem value="active"
                                    filter={filter}
                                    setFilter={setFilter}
                        />
                        <FilterItem value="completed"
                                    filter={filter}
                                    setFilter={setFilter}
                        />
                    </ul>
                    <div className="list-wrapper">
                        <ul>
                            <li className="py-2 d-flex justify-content-between completed">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox"/>
                                        Completed Task
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-link text-danger"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                        <path fillRule="evenodd"
                                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                    </svg>
                                </button>
                            </li>
                            <li className="py-2 d-flex justify-content-between">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox"/>
                                        Todo Task
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-link text-danger"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                        <path fillRule="evenodd"
                                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                    </svg>
                                </button>
                            </li>

                            {
                                tasks.map((task, index) => (
                                    <li
                                        key={index}
                                        // className={ "py-2 d-flex justify-content-between " + (task.active ? 'completed' : '') }
                                        className={`py-2 d-flex justify-content-between ${task.active ? '' : 'completed'}`}
                                    >
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input
                                                    className="form-check-input" type="checkbox"
                                                    checked={!task.active}
                                                    onChange={(e) => {
                                                        handleActiveChange(task, !e.target.checked);
                                                    }}
                                                />
                                                {task.text}
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-link text-danger"
                                            onClick={() => {
                                                handleDelete(task);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                                <path fillRule="evenodd"
                                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                            </svg>
                                        </button>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                    {/*<p className="">No Tasks for today :) </p>*/}
                </div>

                <div class="card-footer text-center">
                    &copy; 2022
                </div>
            </div>
        </div>
    )
}