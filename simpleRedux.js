function createStore(reducer) {
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

const SimpleRedux = {
    createStore   
};