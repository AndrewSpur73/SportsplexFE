// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// import { getSingleBooking } from '../../../api/bookingData';

// export default function EditPost() {
//   const [editItem, setEditItem] = useState({});
//   const router = useRouter();
//   const { id } = router.query;

//   // make a call to the API to get the member data
//   useEffect(() => {
//     getSingleBooking(id).then(setEditItem);
//   }, [id]);

//   // pass object to form
//   return (<PostForm obj={editItem} />);
// }
