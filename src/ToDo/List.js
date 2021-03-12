import { useState, useReducer } from "react";
import reducer from "./reducer";

// initial state
// put in some dummy content to start with
const initialState = {
  items: [{
    task: "Do First Thing",
    completed: false,
  }, {
    task: "Do Second Thing",
    completed: true,
  }],
};

// component
const List = () => {
  // setup reducer
  // get items from state
  const [{ items }, dispatch] = useReducer(reducer, initialState);

  // controlled component stuff
  // keep track of input value
  // easier to keep out of reducer
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false)

  // update input state
  const handleInput = (e) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
        e.preventDefault();
        setInput("");
        return dispatch({type:'NEW_ITEM', value: input})
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true)


        // return dispatch({ type: "CHANGE_ITEM", index: index, value: input })
    }

  return (
    <div className="card">
      <form className="card-header" onSubmit={handleSubmit}>
        { /* add task input */ }
        <input
          className="form-control"
          onChange={ handleInput }
          value={ input }
          
        />
      </form>

      <div className="card-body">
        { /* show items if there are any */ }
        { items.length === 0 ? <p className="card-text">No list items</p> : (
          <ul className="list-group list-group-flush">
            { items.map((item, index) => (
              <li
                key={ index }
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                { /* strike-through for completed items */ }
                { !edit ? <span
                  className="flex-grow-1"
                  onClick = {() => dispatch({type:'MARK_COMPLETED', index: index})}
                  style={ {
                    cursor: "pointer",
                    textDecoration: item.completed ? "line-through" : ""
                  } }
                >{ item.task }</span>
                : <input value={input}></input> }

                { /* edit button */ }
                <button class="btn btn-sm btn-primary mr-1" onClick={ handleEdit }>Edit</button>

                { /* remove button */ }
                <button class="btn btn-sm btn-danger" onClick={ () => dispatch({ type: 'REMOVE_ITEM', index:index })}>&times;</button>
              </li>
            )) }
          </ul>
        )}
      </div>
    </div>
  );
};

export default List;