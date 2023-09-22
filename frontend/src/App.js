import './App.css';
import Header from "./components/Header.js"
import UpperDisplay from "./components/UpperDisplay.js"
import Dashboard from "./components/Dashboard.js"
import Footer from "./components/Footer.js"

function App() {
  return (
    <div className="App">
      <Header />
      <UpperDisplay />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
