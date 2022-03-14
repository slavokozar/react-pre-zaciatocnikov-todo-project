import {useState} from 'react';

import './style.css';


const FilterItem = ({value, filter, setFilter}) => (
    <li className="nav-item">
        <button
            className={`nav-link ${ filter === value ? 'active' : ''}`}
            onClick={() => setFilter(value)}
        >
            value
        </button>
    </li>
)

export default function App() {

    const [input, setInput]     = useState('');
    const [filter, setFilter]   = useState('all');
    const [tasks, setTasks]     = useState([
        {
            'text': 'Prvy task',
            'active': true
        }
    ]);

    console.log({tasks});

    return (
        <div className="container py-5">
            <div className="card">
                <div class="card-header px-4">
                    <h1 className="card-title text-center mb-5">Awesome Todo list</h1>

                    <form
                        className="add-items d-flex mb-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setTasks(tasks.concat({
                                'text': input,
                                'active': true
                            }))
                            setInput('');
                            if(filter === 'completed') setFilter('all');
                        }}
                    >
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="What do you need to do today?"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button>
                    </form>
                </div>
                <div className="card-body px-4">
                <ul className="nav nav-pills mb-4">
                        {/* <FilterItem
                            filter={filter}
                            setFilter={setFilter}
                            value="all"
                        />
                        <FilterItem
                            filter={filter}
                            setFilter={setFilter}
                            value="all"
                        />
                        <FilterItem
                            filter={filter}
                            setFilter={setFilter}
                            value="all"
                        /> */}
                        <li className="nav-item">
                            <button
                                className={`nav-link ${ filter === 'all' ? 'active' : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                all
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${ filter === 'active' ? 'active' : ''}`}
                                onClick={() => setFilter('active')}
                            >
                                active
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${ filter === 'completed' ? 'active' : ''}`}
                                onClick={() => setFilter('completed')}
                            >
                                completed
                            </button>
                        </li>
                    </ul>

                    {
                        tasks.length > 0 ? (
                            <div className="list-wrapper">
                                <ul>
                                    {
                                        tasks
                                            .filter((task, i) => {
                                                if(filter === 'active') return task.active === true;
                                                if(filter === 'completed') return task.active === false;
                                                if(filter === 'all') return true;
                                                return false;
                                            })
                                            .map((task, i) => (
                                                <li className={`py-2 d-flex justify-content-between ${task.active ? '' : 'completed'}`} key={i}>
                                                    <div className="form-check">
                                                        <label className="form-check-label">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                onChange={(e) => {
                                                                    setTasks(
                                                                        tasks.map((t, j) => (
                                                                            i === j ? Object.assign(t, {active: !e.target.checked}) : t
                                                                        )
                                                                    ))
                                                                }}
                                                            />
                                                            {task.text}
                                                        </label>
                                                    </div>
                                                
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-link text-danger"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            
                                                            if(!window.confirm(`Do you relly want to delete task '${task.text}' ?`) ) return;

                                                            setTasks(tasks.filter((t, j) => i !== j))
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                                        </svg>
                                                    </button>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </div>
                        ) : (
                            <p className="">No Tasks for today :) </p>
                        )
                    }

                </div>
                
                <div class="card-footer text-center">
                    &copy; 2022
                </div>
            </div>
        </div>    
    )
}