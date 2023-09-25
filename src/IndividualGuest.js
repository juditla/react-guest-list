import React from 'react';
import styles from './App.module.scss';

export default function IndividualGuest(props) {
  return (
    <div className={styles.individualGuest}>
      <div>
        <input
          type="checkbox"
          checked={props.guest.attending}
          onChange={props.onChange}
          aria-label={`${props.guest.firstName} ${props.guest.lastName} attending status`}
        />
        {props.guest.firstName} {props.guest.lastName}
      </div>
      {props.guest.attending ? (
        <span className={styles.attending}>attending</span>
      ) : (
        <span className={styles.attending}>not attending</span>
      )}

      <button
        aria-label={`Remove ${props.guest.firstName} ${props.guest.lastName}`}
        onClick={props.onClick}
      >
        X
      </button>
    </div>
  );
}
