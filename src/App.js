import React, { useEffect, useState } from 'react';
import {
  addGuest,
  deleteAllGuests,
  deleteGuest,
  fetchGuests,
  updateGuest,
} from './api';
import styles from './App.module.scss';
import IndividualGuest from './IndividualGuest';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isEditing, setIsEditing] = useState(false);
  // const [editGuest, setEditGuest] = useState({});
  const [filter, setFilter] = useState('all');

  // fetch guests from database on first render
  useEffect(() => {
    fetchGuests(setGuests, setIsLoading);
  }, []);

  function showGuests(guestsInDb) {
    // show loading while fetching data
    if (isLoading) {
      return <div className={styles.loading}>Loading...</div>;
    } else {
      // create a list element for every guest in the database - including checkbox for attending and remove button
      return (
        <div>
          <ul>
            {guestsInDb.map((guest) => {
              if (filter === String(guest.attending) || filter === 'all') {
                return (
                  <li key={`guest-${guest.id}`}>
                    <IndividualGuest
                      onChange={() => {
                        updateGuest(
                          !guest.attending,
                          guest.id,
                          setGuests,
                          setIsLoading,
                        );
                      }}
                      onClick={() => {
                        deleteGuest(guest, setGuests, setIsLoading);
                      }}
                      guest={guest}
                    />
                  </li>
                );
              } else {
                return undefined;
              }
            })}
          </ul>
          {/* if there are guests: create button to delete all guests, otherwise state that there are no guests*/}
          {guestsInDb.length > 0 ? (
            <button
              className={styles.deleteAll}
              aria-label="Remove all guests"
              onClick={() => {
                deleteAllGuests(guestsInDb, setGuests, setIsLoading);
              }}
            >
              Remove all
            </button>
          ) : (
            'No guests in guestlist'
          )}
        </div>
      );
    }
  }

  return (
    <div className={styles.content}>
      <h1>&lt;event-name&gt;</h1>
      <p>
        Date & Time:{' '}
        <span className={styles.eventDetails}>dd.mm.yyyy - hh:mm</span>
      </p>
      <p>
        Location: <span className={styles.eventDetails}>TBD</span>
      </p>
      <div>
        {/* input form */}
        <form onSubmit={(event) => event.preventDefault()}>
          <div className={styles.inputFields}>
            <p>Add a new guest</p>
            <div>
              <label htmlFor="First name">First name</label>
              <input
                className={styles.textInput}
                id="First name"
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="Last name">Last name</label>
              <input
                className={styles.textInput}
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
            </div>
          </div>
        </form>
        <div className={styles.guestlistHeader}>
          <h2>&lt;guestlist&gt;</h2>
          <select
            name="Filter"
            id="Filter"
            onChange={(event) => setFilter(event.currentTarget.value)}
          >
            <option value="all">Show All</option>
            <option value="true">Attending</option>
            <option value="false">Not Attending</option>
          </select>
        </div>
        <div>{showGuests(guests)}</div>
      </div>
    </div>
  );
}
