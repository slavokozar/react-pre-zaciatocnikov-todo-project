// FilterItem.js

function FilterItem( props ){
    return (
        <li className="nav-item">
            <button
                // className={ filter === 'all' ? 'nav-link active' : 'nav-link' }
                className={ "nav-link " + ( props.filterValue === props.value ? 'active' : '' )}
                // className={ `nav-link ${ filter === 'all' ? 'active' : '' }` }
                onClick={() => props.setFilterValue(props.value)}
            >
                {props.value}
            </button>
        </li>
    )
}
export default FilterItem;