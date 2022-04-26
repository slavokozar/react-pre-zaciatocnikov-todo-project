
function FilterItem(props){
    return (
        <li className="nav-item">
            <button
                className={`nav-link ${props.filter === props.value ? 'active' : ''}`}
                onClick={() => props.setFilter(props.value)}
            >{props.value}</button>
        </li>
    )
}

export default FilterItem;