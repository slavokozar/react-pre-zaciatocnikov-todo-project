import {useContext} from "react";
import {FilterContext} from "./App";

function FilterItem(props){
    const [filter, setFilter] = useContext(FilterContext);

    return (
        <li className="nav-item">
            <button
                className={`nav-link ${filter === props.value ? 'active' : ''}`}
                onClick={() => setFilter(props.value)}
            >{props.value}</button>
        </li>
    )
}

export default FilterItem;