import * as redux from 'redux';
import {rentalReducer} from './rentalReducer';
import thunk from 'redux-thunk';
export const init = () => {

    const rootReducer = redux.combineReducers({
        data: rentalReducer
    });

    const store = redux.createStore(rootReducer, redux.compose(redux.applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

    return store;
}