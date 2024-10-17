import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Queue from './Queue'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Queue />} /> 
        <Route path="/queue" element={<Queue />} />
      </Routes>
    </Router>
  );
}

export default App;
