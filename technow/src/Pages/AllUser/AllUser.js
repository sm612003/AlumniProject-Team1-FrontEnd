// import AllBooksStyle from "../AllUser/AllUser.module.css";
// import axios from "axios";
// import { useState,useEffect } from "react";
// function TemAuthorCard(props) {
//   //   const { authorName, image, rating } = props;
//   // console.log(authorId)
//     const [isLoading, setIsLoading] = useState(true);

//     const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/user/view-all`)
//       .then((res) => {
//         setUsers(res.data);
//         setIsLoading(false);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   return (
//     <figure className={AllBooksStyle.figure}>
//       <img
//         src={`${process.env.REACT_APP_PATH}/images/${image}`}
//         alt="Book cover"
//         className={AllBooksStyle.image}
//       />

//       <figcaption className={AllBooksStyle.figcaption}>
//         <p> {authorName}</p>
//         <div>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               className={`${rating >= star ? AllBooksStyle.filled : ""}`}
//             >
//               &#9733;
//             </span>
//           ))}
//         </div>
//       </figcaption>
//     </figure>
//   );
// }
// export default TemAuthorCard;
