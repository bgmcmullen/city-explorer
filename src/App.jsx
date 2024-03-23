import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleClick = (event) => {
    event.preventDefault();
    alert(inputValue);
  }


  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control placeholder="Enter location" onChange={handleChange}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleClick}>
          Explore!
        </Button>
      </Form>
    </>
  )
}

export default App
