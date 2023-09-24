import './App.css';
import React, { useEffect, useState } from 'react';
import {
  addGuest,
  deleteAllGuests,
  deleteGuest,
  fetchGuests,
  updateGuest,
} from './api';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch guests from database on first render
  useEffect(() => {
    fetchGuests(setGuests, setIsLoading);
  }, []);

  function showGuests(guestsInDb) {
    // show loading while fetching data
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      // create a list element for every guest in the database - including checkbox for attending and remove button
      return (
        <div>
          <ul>
            {guestsInDb.map((guest) => {
              return (
                <li key={`guest-${guest.id}`}>
                  <input
                    type="checkbox"
                    checked={guest.attending}
                    onChange={() => {
                      updateGuest(
                        !guest.attending,
                        guest.id,
                        setGuests,
                        setIsLoading,
                      );
                    }}
                    aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                  />
                  {guest.firstName} {guest.lastName}
                  <button
                    aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                    onClick={() => {
                      deleteGuest(guest, setGuests, setIsLoading);
                    }}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          {/* if there are guests: create button to delete all guests, otherwise state that there are no guests*/}
          {guestsInDb.length > 0 ? (
            <button
              aria-label="Remove all guests"
              onClick={() => {
                deleteAllGuests(guestsInDb, setGuests, setIsLoading);
              }}
            >
              Remove all guests
            </button>
          ) : (
            'No guests in guestlist'
          )}
        </div>
      );
    }
  }

  return (
    <>
      <h1>Event xyz</h1>
      <div data-test-id="guest">
        {/* input form */}
        <form onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend>Add a new guest</legend>
            <label htmlFor="First name">First Name:</label>
            <input
              id="First name"
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
              disabled={isLoading}
            />
            <label htmlFor="Last name">Last Name:</label>
            <input
              id="Last name"
              value={lastName}
              onChange={(event) => setLastName(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  addGuest(firstName, lastName, setGuests, setIsLoading);
                  setFirstName('');
                  setLastName('');
                }
              }}
              disabled={isLoading}
            />
          </fieldset>
        </form>
        <h2>Guestlist:</h2>
        <div>{showGuests(guests)}</div>
      </div>
    </>
  );
}
