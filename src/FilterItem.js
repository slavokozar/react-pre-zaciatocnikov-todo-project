// if(filter == "all") "nav-link active" else "nav-link

// className={ `nav-link ${filter == "all" ? " active" : ""}` }


function FilterItem(prop){
    return (
        <li className="nav-item">
            <button
                onClick={() => prop.setFilter(prop.value)}
                className={"nav-link" + (prop.filter == prop.value ? " active" : "")}
            >
                {prop.value}
            </button>
        </li>
    )
}
export default FilterItem;