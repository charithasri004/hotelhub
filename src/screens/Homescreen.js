import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromdate, setFromDate] = useState(); // corrected typo in state variable name
  const [todate, setToDate] = useState(); // corrected typo in state variable name
  const[duplicaterooms , setduplicaterooms] = useState([]);

  const[searchkey , setsearchkey] = useState('');
  const [type, settype] = useState('all');



  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/rooms/getallrooms', {
        timeout: 5000,
      });
      const data = response.data;
      setRooms(data);
      setduplicaterooms(data)
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error('Error fetching data:', error);
      console.log('Error details:', error.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  function filterByDate(dates) {
    const fromDateString = dates[0]?.format('DD-MM-YYYY');
    const toDateString = dates[1]?.format('DD-MM-YYYY');
  
    if (!fromDateString || !toDateString) {
      // If no dates are selected, show all rooms
      setFromDate(null);
      setToDate(null);
      setRooms(duplicaterooms);
      return;
    }
  
    setFromDate(fromDateString);
    setToDate(toDateString);
  
    const tempRooms = duplicaterooms.filter((room) => {
      // Check if the room has current bookings for the selected dates
      const hasBookings = room.currentbookings.some((booking) => {
        const bookingStartDate = moment(booking.fromdate, 'DD-MM-YYYY');
        const bookingEndDate = moment(booking.todate, 'DD-MM-YYYY');
        const selectedStartDate = moment(fromDateString, 'DD-MM-YYYY');
        const selectedEndDate = moment(toDateString, 'DD-MM-YYYY');
  
        // Check if the selected dates overlap with any booking
        return (
          selectedStartDate.isSameOrBefore(bookingEndDate) &&
          selectedEndDate.isSameOrAfter(bookingStartDate)
        );
      });
  
      // The room is available if it has no bookings for the selected dates
      return !hasBookings;
    });
  
    setRooms(tempRooms);
  }
  
  function filterBySearch(){
    const tempRooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))

    setRooms(tempRooms);
    
  }

  
  
  function filterByType(e) {

    settype(e)
    if(e !== 'all'){
      const tempRooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setRooms(tempRooms);
    }
    else{
      setRooms(duplicaterooms)
    }
  }
 
  
  
  

  return (
    <div className='container'>
      <div className='row mt-5 bs'>
        <div className='col-md-3'>
          <div style={{ float: 'left' }}>
            <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
          </div>
        </div>


        <div className="col-md-5">
          <input type="text" className='form-control' placeholder='search Rooms'
          value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
          />
         

        </div>
        <div className='col-md-3'>
        {/* <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="all">All</option>
          <option value="deluxe">Deluxe</option>
          <option value="non-deluxe">Non-Deluxe</option>
        </select> */}
        <select className='form-control' value={type} onChange={(e) => { filterByType(e.target.value) }}>
  <option value="all">All</option>
  <option value="deluxe">Deluxe</option>
  <option value="non-deluxe">Non-Deluxe</option>
</select>


        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => (
            <div className="col-md-9 mt-2" key={room._id}>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;