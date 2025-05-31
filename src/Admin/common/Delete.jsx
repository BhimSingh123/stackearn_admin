import React, { useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import DeleteImg from "../../assert/delete.webp"

export default function Delete({ step, Id, fetchMarketLists, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setIsOpen(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleinstrorDelete = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const res = await main.InstrutorDelete({ Id });
      if (res?.data?.status) {
        toast.success(res.data.message);
        fetchMarketLists();
        toggleModal();
      } else {
        toast.error(res.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Error deleting package.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserDelete = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const res = await main.DeleteUsers({ Id });
      if (res?.data?.status) {
        toast.success(res.data.message);
        toggleModal();
        fetchMarketLists();
      } else {
        toast.error(res.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Error deleting user.");
    } finally {
      setLoading(false);
    }
  };

  const handleCourseDelete = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const res = await main.courseDelete({ Id });
      if (res?.data?.status) {
        toast.success(res.data.message);
        toggleModal();
        fetchMarketLists();
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogDelete = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const res = await main.BlogDelete({ Id });
      if (res?.data?.status) {
        toast.success(res.data.message);
        toggleModal();
        fetchMarketLists();
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const HandleOnlineCourse = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const res = await main.OnlineDelete({ Id });
      if (res?.data?.status) {
        toast.success(res.data.message);
        toggleModal();
        fetchMarketLists();
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const HandleGallery = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const res = await main.galleryDelete({ Id });
      if (res?.data?.status) {
        toast.success(res.data.message);
        toggleModal();
        fetchMarketLists();
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const HandleWebniar = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const res = await main.Webniardelete({ Id });
      if (res?.data?.status) {
        toast.success(res.data.message);
        toggleModal();
        fetchMarketLists();
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };


  const HandleVideo = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const res = await main.Videodelete({ Id });
      if (res?.data?.status) {
        toast.success(res.data.message);
        toggleModal();
        fetchMarketLists();
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };



  const handleClick = (e) => {
    e.preventDefault();
    if (step === 1) handleUserDelete();
    else if (step === 2) handleinstrorDelete();
    else if (step === 3) handleCourseDelete();
    else if (step === 4) handleBlogDelete();
    else if (step === 5) HandleOnlineCourse();
    else if (step === 6) HandleGallery();
    else if (step === 7) HandleWebniar();
    else if (step === 8) HandleVideo();

    else console.warn("Invalid step");
  };

  return (
    <div>
      {/* Delete Button */}
      <div
        onClick={toggleModal}
        style={{ cursor: "pointer" }}
        className="d-flex cancelled-status px-2 py-1 rounded align-items-center justify-content-center"
      >
        <MdDelete size={20} />
        <span style={{ marginLeft: "2px" }}>Delete</span>
      </div>

      {/* Bootstrap Modal */}
      {isOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            zIndex: 1050,
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
          }}
          role="dialog"
        >

          <div
            className="modal-dialog modal-dialog-centered modal-lg custom-modal-dialog" // Added custom-modal-dialog class for larger size
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title">Delete Confirmation</h5>
                <button type="button" className="text-gray-600 hover:text-gray-900" onClick={toggleModal} aria-label="Close">
                  <MdClose size={24} />
                </button>
              </div>
              <div className="modal-body">
                <img src={DeleteImg} alt="" className="img-fluid modal-image" />

                <p className="text-danger fw-bold">
                  ⚠️ Are you sure? This action <u>cannot be undone!</u>
                </p>
              </div>

              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClick}
                >
                  {loading ? "Loading..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Delete.propTypes = {
  step: PropTypes.number.isRequired,
  Id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  fetchMarketLists: PropTypes.func.isRequired,
};
