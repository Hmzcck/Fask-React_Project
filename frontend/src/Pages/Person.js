import React, { useRef } from "react";
import axios from 'axios';
import './ContactForm.css';

function Person({ contact, selectContact, onAddEdit, isNewUser }) {
  const name = useRef();
  const phoneNumber = useRef();

  const handleSave = (event) => {
    event.preventDefault();
    const newName = name.current.value;
    const newPhoneNumber = phoneNumber.current.value;
    onAddEdit({ name: newName, phoneNumber: newPhoneNumber });
  };
  
  const imageNames = [
    'image1.jpg',
    'image2.png',
    'image3.png',
	'image3.png',
	'image3.png'
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageNames.length);
    const imageName = imageNames[randomIndex];
    return imageName
  };
  const handleNewUser = (event) => {
    event.preventDefault();
    const newName = name.current.value;
    const newPhoneNumber = phoneNumber.current.value;
	axios.post('/users', {
		name: newName,
		password: "1",
		phoneNumber: newPhoneNumber,
		image: getRandomImage()
	}).then((response) => {
		if(response.data.success === true)
		{
			console.log("success");
			selectContact(null);
		}
	}
	).catch((error) => {
		console.log(error);
	}
	);
	
  };

  return isNewUser ? (
    <div className="form-container">
      <label className="form-label">
        Name:
        <input type="text" ref={name} className="form-input"/>
      </label>
      <label className="form-label">
        Phone Number:
        <input type="text" ref={phoneNumber} className="form-input"/>
      </label>
      <button onClick={handleNewUser} className="form-button">Add</button>
    </div>
  ) : (
    <div className="form-container">
      <label className="form-label">
        Name:
        <input type="text" defaultValue={contact.name} ref={name} className="form-input"/>
      </label>
      <label className="form-label">
        Phone Number:
        <input type="text" defaultValue={contact.phoneNumber} ref={phoneNumber} className="form-input"/>
      </label>
      <button onClick={handleSave} className="form-button">Save</button>
    </div>
  );
}

export default Person;
