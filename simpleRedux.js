function createStore(reducer, enhancer) {
	if (enhancer) {
		return enhancer(createStore)(reducer);
	}

	let state = reducer(undefined, { type: "@@INIT" });
	const listeners = [];

	return {
		dispatch: (action) => {
			state = reducer(state, action);
			for (const listener of listeners) {
				listener();
			}
		},
		subscribe: (listener) => {
			listeners.push(listener);
		},
		getState: () => state,
	};
}

function applyMiddleware(...middlewares) {
	return (createStore) => (reducer) => {
		const store = createStore(reducer);
		const middlewareApi = {
			getState: store.getState,
			dispatch: (action, ...args) => dispatch(action, ...args),
		};
		const dispatchChain = middlewares.map((middleware) =>
			middleware(middlewareApi),
		);
		const composedMiddleware = compose(...dispatchChain);
		const dispatch = composedMiddleware(store.dispatch);

		return {
			...store,
			dispatch,
		};
	};
}

function compose(...functions) {
	if (functions.length === 0) {
		return (arg) => arg;
	}

	return functions.reduce((a, b) => (arg) => a(b(arg)));
}

const SimpleRedux = {
	createStore,
	applyMiddleware,
	compose,
};
