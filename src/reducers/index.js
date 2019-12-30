import * as redux from 'redux';
import {rentalReducer} from './rental-reducer';
import {authReducer} from './auth-reducer';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

export const init = () => {

    const rootReducer = redux.combineReducers({
        data: rentalReducer,
        form: formReducer,
        auth: authReducer
    });

    const store = redux.createStore(rootReducer, redux.compose(redux.applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

    return store;
}