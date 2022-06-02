import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { loginReducer} from "./loginReducer";
import { registrationReducer } from "./registrationReducer";
import { profileReducer } from "./profileReducer";
import { forgotReducer } from "./forgotReducer";
import { error404Reducer } from "./error404Reducer";
import {appReducer} from "./appReducer";
import {packsReducer} from "./packsReducer";
import {cardsReducer} from "./cardsReducer";



const rootReducer = combineReducers({
    login: loginReducer,
    register: registrationReducer,
    forgotPassword: forgotReducer,
    profile: profileReducer,
    // newPassword: newPasswordReducer,
    packs: packsReducer,
    cards: cardsReducer,
    app: appReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootStateType = ReturnType<typeof rootReducer>;