import Routes from './Routes';
import './App.css';
import { AppProvider } from './context/AppContext';
function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes />
      </div>
    </AppProvider>
  );
}

export default App;
