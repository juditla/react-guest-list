const baseUrl = 'http://localhost:4000';

export function fetchGuests(setGuests, setIsLoading) {
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

// for all coming functions that interact with the backend:
// fetch with either POST, PUT, DELTE, then fetch with GET to get updated guests in database

export function addGuest(firstName, lastName, setGuests, setIsLoading) {
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
      fetchGuests(setGuests, setIsLoading);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export function updateGuest(boolean, id, setGuests, setIsLoading) {
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
      fetchGuests(setGuests, setIsLoading);
    })
    .catch((error) => console.error(error));
}

export function deleteGuest(guest, setGuests, setIsLoading) {
  fetch(`${baseUrl}/guests/${guest.id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json)
    .then((data) => {
      console.log(data);
      fetchGuests(setGuests, setIsLoading);
    })
    .catch((error) => console.error(error));
}

// go over the array of guests and send a DELETE request for every guest

export function deleteAllGuests(allGuests, setGuests, setIsLoading) {
  allGuests.forEach((guest) => {
    fetch(`${baseUrl}/guests/${guest.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json)
      .then((data) => {
        console.log(data);
        fetchGuests(setGuests, setIsLoading);
      })
      .catch((error) => console.error(error));
  });
}
