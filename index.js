const initialState = {
    value: 0,
  };
  
  function counterReducer(state = initialState, action) {
    switch (action.type) {
      case "counter/incremented":
        return { ...state, value: state.value + 1 };
      case "counter/decremented":
        return { ...state, value: state.value - 1 };
      default:
        return state;
    }
  }

  function logger({getState, dispatch}) {
    return (action) => {
        console.log("Will dispatch -> ", action);

        const returnValue = dispatch(action);

        console.log("State after dispatch", getState());

        return returnValue;
    };
  }
  
//   const store = Redux.createStore(counterReducer);
  const store = SimpleRedux.createStore(counterReducer, SimpleRedux.applyMiddleware(logger));
  
  const valueEl = document.getElementById("value");
  
  function render() {
    const state = store.getState();
    valueEl.innerHTML = state.value.toString();
  }
  
  render();
  store.subscribe(render);
  
  document.getElementById("increment").addEventListener("click", function () {
    store.dispatch({ type: "counter/incremented" });
  });
  
  document.getElementById("decrement").addEventListener("click", function () {
    store.dispatch({ type: "counter/decremented" });
  });
  