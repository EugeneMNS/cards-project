type InitialStateType = typeof initialState;

const initialState = {};

export const createNewPasswordReducer = (
  state = initialState,
  action: any
) : InitialStateType=> {
  switch (action.type) {
    default:
      return state;
  }
};