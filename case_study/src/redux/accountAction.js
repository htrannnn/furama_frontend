export function login(account) {
	return {
		type: "LOGIN",
		payload: account,
	};
}

export function logout() {
	return {
		type: "LOGOUT",
		payload: null,
	};
}
