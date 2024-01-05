import { useContext } from 'react';

import { AuthContext } from 'context/authContext'

import HeaderBar from "containers/HeaderBar/HeaderBar";
import TaskBoard from "containers/TaskBoard/TaskBoard";
import EmptyBoard from "containers/EmptyBoard/EmptyBoard";


const Board = () => {
  const { isLogged } = useContext(AuthContext)

  return (
    <>
      <HeaderBar />
      {isLogged ? <TaskBoard /> : <EmptyBoard />}
    </>
  );
};

export default Board;
