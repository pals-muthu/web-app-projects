import React from "react"
import { useDispatch } from "react-redux";
import { counterActions } from "../store";


const InnerPage = (props) => {
  const dispatch = useDispatch();
  const onClickListener = () => {
    dispatch(counterActions.increment());
  }
  return <><p>Inner page</p><input type="button" onClick={onClickListener} value="ClickMe"/></>
}

export default InnerPage;