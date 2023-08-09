import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = (props) => {
  const error = useRouteError();
  console.log('incoming error: ', error);
  const title = 'An error occurred!!!';
  let message = 'Something went wrong!!!'
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  } else if (error.status === 404) {
    message = 'Not found';
  }
  return (<>
    <h3>{title}</h3>
    <p>{message}</p>
  </>)
}

export default ErrorPage;