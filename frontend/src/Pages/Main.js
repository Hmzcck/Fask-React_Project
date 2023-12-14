import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import './ContactList.css';
function MainScreen({ onEdit, onSearch, onNewContact }) {
  const searchName = useRef();
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    axios.get('/users')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);


  const handleSearch = () => {
    const sName = searchName.current.value;
    onSearch(sName);
  };

  const handleRemove = (contactToRemove) => {
	axios.post('/users/delete', {
		name: contactToRemove.name,
		phoneNumber: contactToRemove.phoneNumber
	}).then((response) => {
		if(response.status === 200)
		{
			console.log("success");
			setContacts(response.data);
		}
	}
	).catch((error) => {
		console.log(error);
	}
	);
  };

  return (
	<div className="contact-list-container">
	<div className="search-section">
	  <input type="text" ref={searchName} placeholder="Person name" className="search-input" />
	  <button onClick={handleSearch} className="search-btn">Find</button>
	  <button onClick={onNewContact} className="new-contact-btn">New Contact</button>
	</div>
	<div className="contacts-section">
	  {contacts.map((contact, index) => (
		<div key={index} className="contact-card">
		  <img src={'/'+contact.image} alt={contact.name} className="contact-image" />
		  <div className="contact-info">
			<p className="contact-name">Name: {contact.name}</p>
			<p className="contact-phone">Phone Number: {contact.phoneNumber}</p>
		  </div>
		  <div className="contact-actions">
			<button onClick={() => onEdit(contact)} className="edit-btn">Edit</button>
			<button onClick={() => handleRemove(contact)} className="remove-btn">Remove</button>
		  </div>
		</div>
	  ))}
	</div>
  </div>
  );
}

export default MainScreen;
