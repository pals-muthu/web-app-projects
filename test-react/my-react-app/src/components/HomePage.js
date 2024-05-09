import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const HomePage = (props) => {

  const counter = useSelector(state => state.counter.counter);
  console.log('hello!!!');
  return <div><p>Hello World</p><p>counter val: {counter}</p><Outlet /></div>
}

export default HomePage;