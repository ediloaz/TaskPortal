import Column from './Column/Column'

const COLUMNS = [
  'To do',
  'In progress',
  'Done'
]

const TaskBoard = () => {
  console.log(111)
  return (
    <div className="container-task-board">
      {COLUMNS.map((title) => <Column title={title} />)}
    </div>
  )
}
export default TaskBoard