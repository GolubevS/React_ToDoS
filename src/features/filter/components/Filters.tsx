import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectFilter, setFilter } from "../filterSlice";
import { ToDoFilters } from "../typesFilter";

const Filters = () => {
    const current = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();

    return (
        <div>
            <span>Set filter:</span>
            {
                Object.values(ToDoFilters)
                    .map(filter => 
                        <button
                            key={filter}
                            className="filter-button"
                            disabled={filter === current}
                            onClick={() => dispatch(setFilter(filter))}
                        >
                            {filter}
                        </button>
                    )
            }
        </div>
    );
}

export default Filters;