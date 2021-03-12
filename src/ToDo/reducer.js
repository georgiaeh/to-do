

export const addItem = (state, { value }) => {
    let newItem = {task: value, completed: false}
    return {
        ...state,
        items: [...state.items, newItem]
    }
};

export const removeItem = (state, { index }) => {
    
    let keptItems = state.items.filter( (item, i) => i !== index )

    return {
        ...state,
        items: [...keptItems]
    }
}

export const updateItem = (state, { index, value }) => {

    let items = [...state.items]

    items[index] = {
        ...state.items[index],
        task: value
    }

    return {
        ...state,
        items: items
    }
}

export const completeItem = ( state, { index }) => {
    
    let items = [...state.items];

    items[index]={
        ...state.items[index],
        completed: true
    }

    return {
        ...state,
        items:items
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch(action.type){
        case 'NEW_ITEM': return addItem(state, action);
        case 'REMOVE_ITEM': return removeItem(state, action);
        case 'CHANGE_ITEM' : return updateItem(state, action);
        case 'MARK_COMPLETED': return completeItem(state, action);
        default: return state;
    }      
};