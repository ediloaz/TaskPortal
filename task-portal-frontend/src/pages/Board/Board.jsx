import TaskBoard from 'containers/TaskBoard/TaskBoard'
import HeaderBar from 'containers/HeaderBar/HeaderBar'
import Authentication from 'containers/Authentication/Authentication'


const Board = () => {
  return (
    <>
      <Authentication />
      <HeaderBar/>
      <TaskBoard />
    </>
  )
}

export default Board