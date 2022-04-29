type InitStateType = typeof initState;

const initState = {};

export const error404Reducer = (
    state = initState,
    action: any
): InitStateType => {
    switch (action.type) {
        default:
            return state;
    }
};