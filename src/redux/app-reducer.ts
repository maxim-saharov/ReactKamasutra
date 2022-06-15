//
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


export type InitialStateType = {
    initialized: boolean
}


let initialState: InitialStateType = {
    initialized: false
    // сюда можем записывать глабальныу ошибку
    //globalError: null
}

const appReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case INITIALIZED_SUCCESS:

            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

type InitializedSuccessType = {

    type: typeof INITIALIZED_SUCCESS

}

const initializedSuccess = (): InitializedSuccessType => ({
    type: INITIALIZED_SUCCESS
});


export const initializeApp = () => (dispatch: any) => {

    let promise = dispatch(getAuthUserData());


    Promise.all([promise])
        .then(() => {
                dispatch(initializedSuccess());
            }
        );

}


export default appReducer;



