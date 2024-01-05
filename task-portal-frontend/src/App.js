import './App.css';

import AuthContext from 'context/AuthContext'

import BoardPage from './pages/Board/Board';

function App() {
  return (
    <AuthContext>
      <div className="App">
        <BoardPage />
      </div>
    </AuthContext>
  );
}

export default App;
