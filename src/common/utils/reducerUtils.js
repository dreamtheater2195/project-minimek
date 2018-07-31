export function createReducer(initialState, handlers) {
    return (state = initialState, { type, payload }) => {
        const handler = handlers[type];
        return handler ? handler(state, payload) : state;
    };
}

export const reduceReducers = (...reducers) => (state, action) =>
    reducers.reduce(
        (prevState, reducer) => reducer(prevState, action),
        state
    );

export function createConditionalSliceReducer(sliceName, handlers) {
    // Create a reducer that knows how to handle one slice of state, with these action types
    const sliceReducer = createReducer({}, handlers);
    // Create a new wrapping reducer
    return (state, action) => {
        // Check to see if this slice reducer knows how to handle this action
        if (handlers[action.type]) {
            // If it does, pass the slice to the slice reducer, and update the slice
            return {
                ...state,
                [sliceName]: sliceReducer(state[sliceName], action),
            };
        }
        // Otherwise, return the existing state unchanged
        return state;
    }
}
