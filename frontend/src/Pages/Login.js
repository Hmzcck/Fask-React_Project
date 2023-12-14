import React, { useRef } from "react";
import axios from 'axios';
import './LoginForm.css';
// Login name: admin sifre: 123
const Login = (props) => {
	const usernameRef = useRef();
	const passwordRef = useRef();

	const handleButton = () => {
		const name = usernameRef.current.value;
		const password = passwordRef.current.value;
		axios.post('/login', {
			name: name,
			password: password
		}).then((response) => {
			if (response.data.success === true) {
				props.onLogin();
			}
		}).catch((error) => {
			console.log(error);
		});
	};

	return (
		<div className="login-container">
			<div className="logo-container">
				<img src="/phone.png" alt="Phone Book" />
			</div>
			<div>
				<label>Username:</label>
				<input type="text" ref={usernameRef} />
			</div>
			<div>
				<label>Password:</label>
				<input type="text" ref={passwordRef} />
			</div>
			<div>
				<button onClick={handleButton}>Login</button>
			</div>
		</div>
	);
};

export default Login;
