import './style.css';
import {useState} from "react";

export default function App() {
    const [input, setInput] = useState('');

    const [tasks, setTasks] = useState([
        {
            "text": "Nainštaluj si Node.js",
            "active": true
        },
        {
            "text": "Naštuduj prezentácie z Kurz pre začiaťočníkov",
            "active": true
        },
        {
            "text": "Priebežne pracuj na zadaniach",
            "active": true
        },
        {
            "text": "Staň sa react developerom",
            "active": true
        }
    ])

    console.log(tasks);

    function handleSubmit(e) {
        e.preventDefault();

        setTasks(tasks.concat(
            {
                text: input,
                active: true
            }
        ))
        setInput('');
    }

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
                                        className={ `py-2 d-flex justify-content-between ${ task.active ? '' : 'completed' }` }
                                    >
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="checkbox"
                                                       checked={!task.active}
                                                       onChange={(e) => {
                                                           // ulozit do state
                                                           console.log(e.target.checked)
                                                           setTasks(
                                                               tasks.map((t, i) => {
                                                                   if (index === i) {
                                                                       // zmena
                                                                       t.active = !e.target.checked;
                                                                   }

                                                                   return t;
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
                                                console.log('delete', index);
                                                setTasks(
                                                    tasks.filter((t, i) => (
                                                        i !== index
                                                    ))
                                                )
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