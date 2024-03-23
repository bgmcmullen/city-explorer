import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css'
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const [displayName, setDisplayName] = useState('');

  const [latitude, setLatitude] = useState('');

  const [longitude, setLongitude] = useState('');



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
      
      axios.get(`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=51.50344025&,-0.12770820958562096&zoom=10`)
      .then(response => {
        console.log('Map SUCCESS: ', response.data);
      }).catch(error => {
        console.log('Map UGH OOOOH:', error);
      });
  }


  return (
    <>
    <h1>City Explorer</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control placeholder="Enter location" onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleClick}>
          Explore!
        </Button>
      </Form>
      <h3>
      {displayName}
      </h3>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Latitude: </Accordion.Header>
          <Accordion.Body>
            {latitude}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Longitude: </Accordion.Header>
          <Accordion.Body>
            {longitude}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <img src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=10`}/>
    </>
  )
}

export default App
