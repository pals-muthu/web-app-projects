import React from 'react';
import EventItem from '../components/EventItem';
import { redirect, useRouteLoaderData } from 'react-router-dom';

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');
  console.log('data: ', data);
  return (
    <EventItem event={data.event}></EventItem>
  );
}

export default EventDetailPage;

export async function loader({request, params}) {
  console.log('calling loader for event detail')
  const response = await fetch(`http://localhost:8080/events/${params.id}`);
  if (!response.ok) {
    // throw new Error('Could not fetch Events');
    throw new Response(JSON.stringify({message: 'Could not fetch event data'}), { status: 500 });
  } else {
    return response;
  }
}

export async function action ({ request, params }) {
  const response = fetch(`http://localhost:8080/events/${params.id}`, {
    method: request.method
  });
  if (!response.ok) {
    // throw new Error('Could not fetch Events');
    throw new Response(JSON.stringify({message: 'Could not delete event data'}), { status: 500 });
  } else {
    return redirect('/events');
  }
}
