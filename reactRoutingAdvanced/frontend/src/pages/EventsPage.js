import React, { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';
import EventsList from './../components/EventsList';


function EventsPage() {
  // data is automatically extracted from the response object.
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p>Loading....</p>}>
      <Await resolve={events}>
        {(loadedEvents) => (<EventsList events={loadedEvents}></EventsList>)}
      </Await>
    </Suspense>
  )
}

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // throw new Error('Could not fetch Events');
    throw new Response(JSON.stringify({ message: 'Could not fetch Events' }), { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

export function loader() {
  return defer({
    events: loadEvents()
  })
}
