import { applyMiddleware, createStore } from "redux";


const configureStore = (preloadedState={}) => createStore(RootReducer, preloadedState, applyMiddleware(thunk))