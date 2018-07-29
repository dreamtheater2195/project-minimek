export function createReducer(initialState, handlers) {
    return (state = initialState, { type, payload }) => {
        const handler = handlers[type];
        return handler ? handler(state, payload) : state;
    };
}

export function reduceReducers(...reducers) {
    return (previous, current) => {
        reducers.reduce(
            (p, reducer) => reducer(p, current),
            previous
        );
    };
}