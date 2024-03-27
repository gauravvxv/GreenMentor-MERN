import { USERLOGIN,USERLOGOUT,USERSIGNUP } from "../actionTypes";

const initialState = {
	user: null,
	registerState: false,
	loginState: false,
	token: "",
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USERSIGNUP:
			return {
				...state,
				registerState: true,
			};
		case USERLOGIN:
			return {
				...state,
				registerState: false,
				user: action.payload.user,
				token: action.payload.token,
			};

		default:
			return state;
	}
};

export default authReducer;