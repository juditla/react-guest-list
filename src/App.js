import './App.css';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isAttending, setIsAttending] = useState(false);

  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    fetchGuests();
  }, []);

  function showGuests(guestsinDb) {
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {guestsinDb.map((guest) => {
            return (
              <li key={`guest-${guest.id}`}>
                <input
                  type="checkbox"
                  checked={guest.attending}
                  onChange={() => {
                    const attendingStatus = !guest.attending;
                    upDateGuest(attendingStatus, guest.id);
                    // fetchGuests();
                  }}
                  aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                />
                {guest.firstName} {guest.lastName}
                <button
                  aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                  onClick={() => {
                    deleteGuest(guest);
                    // fetchGuests();
                  }}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      );
    }
  }

  function upDateGuest(boolean, id) {
    fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: boolean }),
    })
      .then((response) => response.json)
      .then((data) => {
        console.log(data);
        fetchGuests();
      })
      .catch((error) => console.error(error));
  }

  function deleteGuest(guest) {
    fetch(`${baseUrl}/guests/${guest.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json)
      .then((data) => {
        console.log(data);
        fetchGuests();
      })
      .catch((error) => console.error(error));
  }

  function addGuest() {
    fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('add guest:' + data);
        fetchGuests();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function fetchGuests() {
    fetch(`${baseUrl}/guests`)
      .then((response) => response.json())
      .then((data) => {
        setGuests(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      <h1>Guestlist for xyz</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <fieldset>
          <legend>Add a new guest</legend>
          <label htmlFor="First name">First Name:</label>
          <input
            id="First name"
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
          <label htmlFor="Last name">Last Name:</label>
          <input
            id="Last name"
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                addGuest();
                // .then(fetchGuests())
                // .catch((error) => console.error(error));

                // .catch()
                // .error((error) => error);
                setFirstName('');
                setLastName('');
              }
            }}
          />
        </fieldset>
      </form>
      <h2>Guestlist:</h2>
      <div>
        {console.log(guests)}
        {showGuests(guests)}
        {/* fetch from API to get all guests, depending on how the return looks (object/array/...) -> create a list element with checkbox, Full Name and remove button */}
      </div>
    </>
  );
}
