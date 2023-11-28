function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer);
    }


    let state = reducer(undefined, { type: "@@INIT" });
    const listeners = [];

    return {
        dispatch: (action) => {
            state = reducer(state, action);
            listeners.forEach(listener => listener());
        },
        subscribe: (listener) => {
            listeners.push(listener);
        },
        getState: () => state
    };
}

function applyMiddleware(middleware) {
    return (createStore) => (reducer) => {
        const store = createStore(reducer);

        return {
            ...store,
            dispatch: middleware({
                getState: store.getState,
                dispatch: store.dispatch
            })
        };
    }
}

const SimpleRedux = {
    createStore,
    applyMiddleware   
};