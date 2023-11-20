// Room.js
import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("Room ID:", room._id); // Log the room ID to ensure it's available

  return (
    <div className='row bs'>
      <div className='col-md-4'>
        <img
          src={room.imageurls[0]}
          className='img-fluid rounded'
          alt='Room'
        />
      </div>
      <div className='col-md-8'>
        <h1>{room.name}</h1>
        <p>Max Count: {room.maxcount}</p>
        <p>Ph-no: {room.phonenumber}</p>
        <p>Type: {room.type}</p>

        <div style={{ float: 'right' }}>


        {(fromdate && todate && room._id) && (
  <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
    <button className='btn btn-primary m-2'>Book Now</button>
  </Link>
)}

          

          {/* {(fromdate && todate) &&(
             {room._id && (
              <Link to={/book/${room._id}/${fromdate}/${todate}}>
                <button className='btn btn-primary m-2'>Book Now</button>
              </Link>
            )}

          )} */}
         
          <button className='btn btn-primary' onClick={handleShow}>View Details</button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map(url => (
              <Carousel.Item key={url}>
                <img className="d-block w-100 bigimg" src={url} alt={`Slide ${url}`} />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End of Modal */}
    </div>
  );
}

export default Room;

