import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

function RequestedProperties() {
  const {
    isLoading,
    data: offers,
    error,
    refetch,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/offers`);
      // console.log(res);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });
  if (isLoading) {
    return "loading......";
  }
  if (error) {
    return `Error: ${error.message}`;
  }
  // console.log(offers);

  const handleAcceptOffer = async(id) => {
    // console.log(id)
    axios.patch(`${import.meta.env.VITE_API_URL}/offers-accepted/${id}`)
      .then(res => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Offer successfully accepted!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.error('Error to accept offer:', error);
      });
  }
  const handleRejectOffer = async(id) => {
    // console.log(id)
    axios.patch(`${import.meta.env.VITE_API_URL}/offers-rejected/${id}`)
      .then(res => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Offer successfully rejected!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.error('Error to accept offer:', error);
      });
  }

  return (
    <>
      <div>
        Manage Offer requested:{offers.length}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>Title</th>
                <th>Location</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Offered Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {offers.map((offer, index) => (
                <tr key={offer._id}>
                  <th>{index + 1}</th>
                  <th>{offer.propertyTitle}</th>
                  <td>{offer.propertyLocation}</td>
                  <td>{offer.buyer.name}</td>
                  <td>{offer.buyer.email}</td>
                  <td>{offer.offerAmount}</td>
                  <td className="flex">
                    <button
                      onClick={() => handleAcceptOffer(offer._id)}
                      className={`btn bg-green-500 text-white ${offer.status === 'rejected' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={offer.status === 'accepted'}
                    >
                      {
                        offer.status !== 'accepted' ? "Accept" : "Accepted"
                      }
                    </button>{" "}
                    <button
                      onClick={() => handleRejectOffer(offer._id)}
                      className={`btn bg-red-500 text-white ${offer.status === 'accepted' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={offer.status === 'rejected'}
                      
                    >
                      {
                        offer.status !== 'rejected' ? "Reject" : "Rejected"
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RequestedProperties;
