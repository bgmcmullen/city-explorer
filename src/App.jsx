import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css'
import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  }
  
  const[displayName, setDisplayName] = useState('');

  const[latitude, setLatitude] = useState('');

  const[longitude, setLongitude] = useState('');



  const handleClick = (event) => {
    event.preventDefault();
    axios.get(`https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${inputValue}&format=json`)
      .then(response => {
        console.log('SUCCESS: ', response.data);
        setDisplayName(response.data[0].display_name);
        setLatitude(response.data[0].lat);
        setLongitude(response.data[0].lon);
        console.log(longitude);
      }).catch(error => {
        console.log('UGH OOOOH:', error);
      });  
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
      <h2>
        {displayName}
      </h2>
      <h3>
        Latitude: {latitude}
      </h3>
      <h3>
      Longitude: {longitude}
      </h3>
    </>
  )
}

export default App
