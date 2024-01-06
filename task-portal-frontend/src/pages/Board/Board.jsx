import { useContext } from 'react';

import { AuthContext } from 'context/authContext'

import HeaderBar from "containers/HeaderBar/HeaderBar";
import TaskBoard from "containers/TaskBoard/TaskBoard";
import EmptyBoard from "containers/EmptyBoard/EmptyBoard";
import ServerDownHandler from "containers/ServerDownHandler/ServerDownHandler";


const Board = () => {
  const { isLogged, serverConnection, useOfflineMode, offlineMode } = useContext(AuthContext)

  if (!serverConnection && !offlineMode) return <ServerDownHandler useOfflineMode={useOfflineMode} />
  return (
    <>
      <HeaderBar />
      {isLogged ? <TaskBoard /> : <EmptyBoard />}
    </>
  );
};

export default Board;
