const initialState = {
	value: 0,
};

function counterReducer(state = initialState, action) {
	switch (action.type) {
		case "counter/increment":
			return { ...state, value: state.value + 1 };
		case "counter/decrement":
			return { ...state, value: state.value - 1 };
		default:
			return state;
	}
}

function loggerInfo({ getState }) {
	return (next) => (action) => {
		console.log("loggerInfo/will dispatch", action);

		const returnValue = next(action);

		console.log("loggerInfo/state after dispatch", getState());

		return returnValue;
	};
}

function loggerWarning({ getState }) {
	return (next) => (action) => {
		console.warn("loggerWarning/will dispatch", action);

		const returnValue = next(action);

		console.warn("loggerWarning/state after dispatch", getState());

		return returnValue;
	};
}

const store = SimpleRedux.createStore(
	counterReducer,
	SimpleRedux.applyMiddleware(loggerInfo, loggerWarning),
);

const valueEl = document.getElementById("value");

function render() {
	const state = store.getState();
	valueEl.innerHTML = state.value.toString();
}

render();
store.subscribe(render);

document.getElementById("increment").addEventListener("click", () => {
	store.dispatch({ type: "counter/increment" });
});

document.getElementById("decrement").addEventListener("click", () => {
	store.dispatch({ type: "counter/decrement" });
});
