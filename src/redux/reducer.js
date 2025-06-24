import { combineReducers } from "redux";
import { LOGIN_TYPE, LOGOUT_TYPE } from "./accountConstant";

const initState = {
	account: window.localStorage.getItem("admin") ? JSON.parse(window.localStorage.getItem("admin")) : null,
};

function accountReducer(state = initState, action) {
	switch (action.type) {
		case LOGIN_TYPE:
			return {
				...state,
				account: action.payload,
			};
		case LOGOUT_TYPE:
			localStorage.removeItem("admin"); // Xóa localStorage khi logout
			return {
				...state,
				account: null,
			};

		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	account: accountReducer,
});
