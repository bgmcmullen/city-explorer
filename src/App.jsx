import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './App.css'
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Weather from './Weather';
import Movies from './Movies';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const [displayName, setDisplayName] = useState('');

  const [latitude, setLatitude] = useState('47.6038321&l');

  const [longitude, setLongitude] = useState('122.330062');
  
  const [errorMessage, setErrorMessage] = useState('');

  const [weatherData, setWeatherData] = useState( {date: '', temperature: '', description: ''});

  const [movieData, setMovieData] = useState( [{
    title: '',
    overview: '',
    average_votes: '',
    total_votes: '',
    image_url: '',
    popularity: '',
    released_on: ''}]);



  const handleClick = (event) => {
    event.preventDefault();
    axios.get(`https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${inputValue}&format=json`)
      .then(response => {
        setDisplayName(response.data[0].display_name);
        setLatitude(response.data[0].lat);
        setLongitude(response.data[0].lon);
        
      }).catch(error => {
        setErrorMessage(error.message);
        setShowModal(true);
      });
      axios.get(`http://localhost:3000/weather?lat=${latitude}&lon=${longitude}&searchQuery=${inputValue}`).then(response => {

        setWeatherData(response.data.weather);
      
      }).catch(error => {
        setErrorMessage(error.message);
        setShowModal(true);
      });
      axios.get(`http://localhost:3000/movies?lat=${latitude}&lon=${longitude}&searchQuery=${inputValue}`).then(response => {

    
      setMovieData(response.data.movies);
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
      <Weather weatherData={weatherData}/>

      <img src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=10`} style={{display: 'inline'}}/>

      <Movies movieData={movieData}/>
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
