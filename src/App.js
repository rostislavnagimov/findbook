import logo from './logo.svg';
import './App.css';
import Search from './Components/Search'
import Books from './Components/Books';
import { Container, Row, Col } from 'react-bootstrap'

function App() {

  return (
    <>
    <Search />
    <Books />

    </>
  );
}

export default App;
