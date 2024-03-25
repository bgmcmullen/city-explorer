import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './App.css'
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Weather from './Weather';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const [displayName, setDisplayName] = useState('');

  const [latitude, setLatitude] = useState('');

  const [longitude, setLongitude] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');

  const [weatherData, setWeatherData] = useState([
  {date: '', description: ''},
  {date: '', description: ''},
  {date: '', description: ''}]);



  const handleClick = (event) => {
    event.preventDefault();
    axios.get(`https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${inputValue}&format=json`)
      .then(response => {
        console.log('SUCCESS: ', response.data);
        setDisplayName(response.data[0].display_name);
        setLatitude(response.data[0].lat);
        setLongitude(response.data[0].lon);
        
      }).catch(error => {
        setErrorMessage(error.message);
        setShowModal(true);
      });
      axios.get(`http://localhost:3000/weather?lat=${latitude}&lon=${longitude}&searchQuery=${inputValue}`).then(response => {
        console.log('SUCCESS2: ', response.data);
        setWeatherData(response.data);
        console.log('weather data', weatherData);
        console.log(`http://localhost:3000/weather?lat=${latitude}&lon=${longitude}&searchQuery=${inputValue}`);
      }).catch(error => {
        setErrorMessage(error.message);
        setShowModal(true);
      });
    };

  const [showModal, setShowModal] = useState(false);

  const handleHide = () => {
    setShowModal(false);
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
      <Weather weatherData={weatherData[0]}/>
      <Weather weatherData={weatherData[1]}/>
      <Weather weatherData={weatherData[2]}/>
      <img src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=10`} style={{display: 'inline'}}/>
      <Modal
        show={showModal}
        onHide={handleHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>{errorMessage}</Modal.Title>
        </Modal.Header>
      </Modal>

    </>
  )
}

export default App
