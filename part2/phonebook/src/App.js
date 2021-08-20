import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import AddContacts from "./components/AddContacts";
import Phonebook from "./components/Phonebook";
import Notification from "./components/Notification";
import services from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [currentId, setCurrentId] = useState(0);
  const [notification, setNotification] = useState(null);
  const [notificationClass, setNotificationClass] = useState(null);

  const fetchDB = () => {
    services.getAll().then((response) => {
      console.log("this is the get all response", response);
      setPersons(persons.concat(response));
    });
  };

  useEffect(fetchDB, []);

  const filterPersons = () => {
    return persons.filter((person) => {
      return person.name.toLowerCase().includes(newSearch.toLowerCase());
    });
  };

  const personToShow = newSearch === "" ? persons : filterPersons();

  const handlePhone = (event) => {
    setNewPhone(event.target.value);
  };

  // Compare the value as lowercase, to avoid having duplicated names with different cases.
  const isRepeated = (name) => {
    console.log(name);

    const lowerCasePersons = persons.map((person) => {
      console.log(person);
      return person.name.toLowerCase();
    });
    console.log(lowerCasePersons);
    const result = lowerCasePersons.includes(newName.toLowerCase());
    console.log(result);
    return result;
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };
  const handleDeleteOf = ({ id, name }) => {
    const result = window.confirm(`Do you want to delete ${name}`);
    if (result) {
      services.deleteContact(id).catch((err) => {
        setNotification(`The contact ${name} didn't exist in database`);
        setNotificationClass("error");
        setTimeout(() => {
          setNotificationClass(null);
          setNotification(null);
        }, 5000);
      });
      setPersons(
        persons.filter((person) => {
          return person.id !== id;
        })
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isRepeated(newName)) {
      const id = currentId + 1;
      const newContact = { id, name: newName, number: newPhone };
      services
        .create(newContact)
        .then(() => {
          setPersons(persons.concat(newContact));
          setNewName("");
          setNewPhone("");
          setCurrentId(id);
          setNotification(
            `The new contact ${newContact.name} was added successfully`
          );
          setNotificationClass("success");
          setTimeout(() => {
            setNotificationClass(null);
            setNotification(null);
          }, 5000);
        })
        .catch((err) => {
          setNotification(`There was an error, sorry about that`);
          setNotificationClass("error");
          setTimeout(() => {
            setNotificationClass(null);
            setNotification(null);
          }, 5000);
        });
    } else {
      const toUpdate = window.confirm(
        `${newName} is already added, do you want to update de phone instead?`
      );
      if (toUpdate) {
        const contact = persons.find((person) => person.name === newName);

        const newContact = { ...contact, number: newPhone };
        console.log("this old", contact);
        console.log("this new", newContact);
        console.log("this persons", persons);
        services.update(newContact).then((response) => {
          console.log(response);
          const newPersons = persons.map((person) =>
            person.name !== newName ? person : response
          );

          console.log("this what UPDATE", newPersons);
          setPersons(newPersons);
          console.log("this persons2", persons);
          setNotification(
            `The contact ${newContact.name} was updated successfully`
          );
          setNotificationClass("success");
          setTimeout(() => {
            setNotificationClass(null);
            setNotification(null);
          }, 5000);
        }).catch(err => {
          setNotification(`There was an error ${err.message}`)
      setNotificationClass('error')
      setTimeout(()=>{
        setNotificationClass(null);
        setNotification(null)
      }, 5000)
        })
      }
    }
  };
  return (
    <div>
      <Search onChange={handleSearch} value={newSearch} />
      {newSearch !== "" && (
        <Phonebook
          personToShow={personToShow}
          text="search result"
          handleDelete={handleDeleteOf}
        />
      )}
      <Notification message={notification} notificationOf={notificationClass} />
      <AddContacts
        text="Add Contacts"
        newName={newName}
        handleName={handleName}
        newPhone={newPhone}
        handlePhone={handlePhone}
        handleSubmit={handleSubmit}
      />
      <Phonebook
        personToShow={persons}
        text="Phonebook"
        handleDelete={handleDeleteOf}
      />
    </div>
  );
};

export default App;
