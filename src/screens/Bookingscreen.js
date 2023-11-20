import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import Swal from 'sweetalert2';

function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState({});
  const { roomid, fromdate, todate } = useParams();

  useEffect(() => {
    const fetchRoomById = async () => {
      if (!localStorage.getItem('currentuser')) {
        window.location.reload = '/login';
      }

      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomid, fromdate, todate });
        const data = response.data;
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchRoomById();
  }, [roomid, fromdate, todate]);

  const fromDateObj = moment(fromdate, 'DD-MM-YYYY');
  const toDateObj = moment(todate, 'DD-MM-YYYY');
  const totaldays = toDateObj.diff(fromDateObj, 'days') + 1;
  const totalamount = totaldays * room.rentperday;

  const currentUser = JSON.parse(localStorage.getItem('currentuser'));
  const userid = currentUser ? currentUser._id : '';

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays
    };

    try {
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);

      // Check if the payment was successful
      if (result.data === 'Room booked successfully') {
        // Display a success message using SweetAlert2
        Swal.fire('Payment successful!', 'Room booked successfully.', 'success').then(() => {
          // Perform any additional actions if needed
        });
      } else {
        // Handle other scenarios if needed
        Swal.fire('Payment failed.', 'Please try again.', 'error');
      }
    } catch (error) {
      // Handle errors
      Swal.fire('Error processing payment.', 'Please try again.', 'error');
    }
  }

  return (
    <div className='m-5'>
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className='bigimg' alt='Room' />
            </div>
            <div className="col-md-5">
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Booking Details</h1>
                  <hr />
                  <p><b>Name : {currentUser.name}</b></p>
                  <p><b>From Date : {fromdate}</b></p>
                  <p><b>To Date : {todate}</b></p>
                  <p><b>Max Count :</b> {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p><b>Total Days : {totaldays}</b></p>
                  <p><b>Rent per Day :</b> {room.rentperday}</p>
                  <p><b>Total Amount : {totalamount}</b></p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { json, useParams } from 'react-router-dom';
// import Loader from '../components/Loader';
// import Error from '../components/Error';
// import moment from 'moment';

// function Bookingscreen() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [room, setRoom] = useState({});
//   const { roomid, fromdate, todate } = useParams();

//   useEffect(() => {
//     const fetchRoomById = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.post("/api/rooms/getroombyid", { roomid, fromdate, todate });
//         const data = response.data;
//         setRoom(data);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         setError(true);
//       }
//     };
//     fetchRoomById();
//   }, [roomid, fromdate, todate]);

//   // Calculate the total days difference
//   const fromDateObj = moment(fromdate, 'DD-MM-YYYY');
//   const toDateObj = moment(todate, 'DD-MM-YYYY');
//   const totaldays = toDateObj.diff(fromDateObj, 'days') + 1; // Adding 1 day to include the end date
//   const totalamount = totaldays * room.rentperday; // Accessing rentperday from the room object

//   // Corrected 'localStorage' usage
//   const currentUser = JSON.parse(localStorage.getItem('currentuser'));
//   const userid = currentUser ? currentUser._id : '';

//   async function bookRoom() {
//     const bookingDetails = {
//       room,
//       userid,
//       fromdate,
//       todate,
//       totalamount,
//       totaldays
//     };
//     try {
//       const result = await axios.post("/api/bookings/bookroom", bookingDetails);
//       // Handle the result if needed
//     } catch (error) {
//       // Handle errors
//     }
//   }

//   return (
//     <div className='m-5'>
//       {loading ? (
//         <Loader />
//       ) : room ? (
//         <div>
//           <div className="row justify-content-center mt-5 bs">
//             <div className="col-md-5">
//               <h1>{room.name}</h1>
//               <img src={room.imageurls[0]} className='bigimg' alt='Room' />
//             </div>
//             <div className="col-md-5">
//               <div style={{ textAlign: 'right' }}>
//                 <b>
//                   <h1>Booking Details</h1>
//                   <hr />
//                   {/* <p><b>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</b> </p> */}
                 
//                   <p><b>Name : {currentUser.name}</b></p>

//                   <p><b>From Date : {fromdate}</b></p>
//                   <p><b>To Date : {todate}</b></p>
//                   <p><b>Max Count :</b> {room.maxcount}</p>
//                 </b>
//               </div>
//               <div style={{ textAlign: 'right' }}>
//                 <b>
//                   <h1>Amount</h1>
//                   <hr />
//                   <p><b>Total Days : {totaldays}</b></p>
//                   <p><b>Rent per Day :</b> {room.rentperday}</p>
//                   <p><b>Total Amount : {totalamount}</b></p>
//                 </b>
//               </div>
//               <div style={{ float: 'right' }}>
//                 <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Error />
//       )}
//     </div>
//   );
// }

// export default Bookingscreen;

