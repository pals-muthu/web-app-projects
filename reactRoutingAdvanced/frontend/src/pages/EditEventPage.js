import React from 'react';
import classes from './EditEventPage.module.css';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import EventForm from './../components/EventForm';

function EditEventPage() {
  const params = useParams();
  const data = useRouteLoaderData('event-detail');
  const event = data.event;
  return (
    <div>
      <p>EditEventPage for {params.id}</p>
      <EventForm event={event} method='PATCH'></EventForm>
    </div>
    
  );
}

export default EditEventPage;
