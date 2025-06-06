import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import LoadingPage from "../components/LoadingPage";
import course02 from "../../assert/course-02.jpg";
import Delete from "../common/Delete";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import { Search } from "react-feather";
import debounce from "lodash.debounce";
import NoDataPage from "../components/NoDataPage";
import Image from "../components/Image";
const GalleryView = () => {
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const fetchMarketLists = async (searchQuery = "", page = 1, limit = 15) => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.GalleryGet(searchQuery, page, limit);
            setListing(response?.data?.data
            );
            setTotalPages(response?.data.totalPages);
            setTotalItems(response.data.totalUsers);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchMarketLists(search, currentPage, 15);
    }, [currentPage]);

    const debouncedFetchMarketLists = useCallback(
        debounce((searchQuery) => fetchMarketLists(searchQuery, 1, 15), 300),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value.length === 0 || value.length >= 3) {
            debouncedFetchMarketLists(value);
        }
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <DashboardLayout>
            <div className="settings-widget card-details">
                <div className="settings-menu p-0">
                    <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">

                        <div className="col-12 col-md-6 col-lg-4">

                            <h3>Gallery History</h3>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">


                            <div className="input-group search-data">
                                <span className="input-group-text bg-white border-end-0">
                                    <Search size={16} className="text-danger" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    placeholder="Search our gallery name"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">

                            <Link
                                className="login-head button "
                                to="/admin/gallery-add"
                            >
                                Add New
                                Gallery

                            </Link>
                        </div>


                    </div>

                    <div className="checkout-form pb-0">
                        <div className="tab-content">
                            <div
                                className="tab-pane fade show active"
                                id="enroll-courses"
                            >
                                <div className="row">
                                    {loading ? (
                                        <LoadingPage />
                                    ) : listing.length > 0 ? (
                                        listing.map((course, index) => (
                                            <div className="col-xl-4 col-md-4 d-flex p-2 rounded" key={index}>
                                                <div className="card flex-fill">
                                                    {/* Image */}
                                                    <Image
                                                        classes="img-fluid"
                                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                                        alt={course.title}
                                                        src={course.Image || course02} // Fallback image
                                                    />
                                                    {/* Card Content */}
                                                    <div className="p-2">
                                                        <h5 className="card-subtitle">
                                                            {course.title || "Course Title"}
                                                        </h5>
                                                        <p className="blog-limits mt-1">
                                                            {course?.short_content || "Short content about the course."}
                                                        </p>
                                                        <hr className="my-3" />

                                                        {/* Edit and Delete Buttons */}
                                                        <div className="d-flex justify-content-between px-2 pb-2">
                                                            <Link
                                                                to={`/admin/gallery-update/${course?._id}`}
                                                                className="upcoming-status rounded px-2 font-normal py-1 text-capitalize "
                                                            >
                                                                <i className="bx bx-edit" />
                                                                <span style={{ marginLeft: '5px' }}>Edit</span>
                                                            </Link>
                                                            <Delete
                                                                step={6}
                                                                Id={course?._id}
                                                                title="Delete Instructor"
                                                                fetchMarketLists={fetchMarketLists}
                                                                className=""
                                                            >
                                                                Delete
                                                            </Delete>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <NoDataPage />
                                    )}
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </DashboardLayout>


    );
};

export default GalleryView;
