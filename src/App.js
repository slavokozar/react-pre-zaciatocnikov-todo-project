import './style.css';
import {useState} from "react";
import Task from "./Task";

export default function App() {

    const initialTasks = [
        {
            "text": "Nainštaluj si Node.js",
            "active": true
        },
        {
            "text": "Naštuduj prezentácie z Kurz pre začiaťočníkov",
            "active": true
        }
    ]

    const [tasks, setTasks] = useState(initialTasks);
    const [input, setInput] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        if (input.length < 1) return;

        setTasks(
            tasks.concat(
                {
                    "text": input,
                    "active": true
                }
            )
        )

        setInput('');
    }

    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-header px-4">
                    <h1 className="card-title text-center mb-5">Awesome Todo list</h1>
                    <form
                        className="add-items d-flex mb-3"
                        onSubmit={handleSubmit}
                    >
                        <input
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            type="text"
                            className="form-control me-2"
                            placeholder="What do you need to do today?"
                        />
                        <button
                            type="submit"
                            className="add btn btn-primary font-weight-bold todo-list-add-btn"
                        >
                            Add
                        </button>
                    </form>
                </div>
                <div className="card-body px-4">
                    <ul className="nav nav-pills mb-4">
                        <li className="nav-item">
                            <button className="nav-link active">all</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link">active</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link">completed</button>
                        </li>
                    </ul>

                    {
                        tasks.length > 0 ? (
                            <div className="list-wrapper">
                                <ul>
                                    {
                                        tasks.map(
                                            (task, index) => (
                                                <Task
                                                    key={index}
                                                    text={task.text}
                                                />
                                            )
                                        )
                                    }
                                </ul>
                            </div>
                        ) : (
                            <p className="">No Tasks for today :) </p>
                        )
                    }
                </div>

                <div className="card-footer text-center">
                    &copy; 2022
                </div>
            </div>
        </div>
    )
}
