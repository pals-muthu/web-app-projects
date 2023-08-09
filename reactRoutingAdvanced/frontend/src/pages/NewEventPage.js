import React from 'react';
import classes from './NewEventPage.module.css';
import EventForm from './../components/EventForm';

function NewEventPage() {
  return (
    <EventForm method='POST'></EventForm>
  );
}

export default NewEventPage;
