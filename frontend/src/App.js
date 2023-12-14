import "./styles.css";
import Login from "./Pages/Login";
import { StrictMode, useState } from "react";
import axios from 'axios';
import Person from "./Pages/Person";
import MainScreen from "./Pages/Main";
export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [selectedContact, setSelectedContact] = useState(null);
	const [newUser, setIsNewUser] = useState(false);

	const handleEdit = (contact) => {
		setSelectedContact(contact);
		setIsNewUser(false);
	};

	const handleAddEdit = (updatedContact) => {
		const currentContactName = selectedContact.name;
		const currentContactPhoneNumber = selectedContact.phoneNumber;
		axios.post('/users/update', {
			name: currentContactName,
			phoneNumber: currentContactPhoneNumber,
			newUsername: updatedContact.name,
			newPhoneNumber: updatedContact.phoneNumber
		}).then((response) => {
			if (response.data.success === true) {
				console.log("success");
			}
		}
		).catch((error) => {
			console.log(error);
		}
		);
		setSelectedContact(null);
	};

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleSearch = (userName) => {
		axios.get('/users/search', {
			params: {
				name: userName
			}
		}).then((response) => {
			if (response.status === 200)
				setSelectedContact(response.data);
		}).catch((error) => {
			console.log(error);
		});

		setIsNewUser(false);
	};


	const handleNewContact = () => {
		setSelectedContact(true);
		setIsNewUser(true);
	};

	return (

		<StrictMode>
			{isLoggedIn ? (
				selectedContact ? (
					<Person
						contact={selectedContact}
						selectContact={setSelectedContact}
						onAddEdit={handleAddEdit}
						isNewUser={newUser}
					/>
				) : (
					<MainScreen
						onEdit={handleEdit}
						onSearch={handleSearch}
						onNewContact={handleNewContact}
					/>
				)
			) : (
				<Login onLogin={handleLogin} />
			)}
		</StrictMode>
	);
}
