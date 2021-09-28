import './App.css';
import Home from './page/Home'
import AppBar from './component/HeaderBar' 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <AppBar/> */}
        <Home/>
      </header>
    </div>
  );
}

export default App;
