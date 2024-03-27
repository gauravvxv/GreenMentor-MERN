import { USERLOGIN,USERSIGNUP } from "../actionTypes";

const initialState = {
	user: null,
	registerState: false,
	loginState: false,
	token: "",
	userID: "",
	profile: null,
	loadingProfile: false
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
				userID: action.payload.userID
			};
		

		default:
			return state;
	}
};

export default authReducer;