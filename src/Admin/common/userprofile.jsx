function UserProfile() {
    return (
        <>
            <div className="d-flex align-items-center">
                <h2 className="table-avatar d-flex align-items-center">
                    <Link to={`/admin/user-profile-Id/${item?._id}`} className="avatar">
                        {item?.ProfileDetails?.profileImage ? (
                            <Image
                                classes="avatar-img"
                                src={item?.ProfileDetails?.profileImage || User2}
                                alt="User Image"
                                style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <div
                                className="flex items-center justify-center avatar-img"
                                style={{
                                    backgroundColor: "#002058",
                                    borderRadius: "50%",
                                    color: "#ffffff",
                                    fontWeight: "normal",
                                    fontSize: "1em",
                                    width: '40px',
                                    height: '40px',
                                    display: "flex",
                                    padding: "10px"
                                }}
                            >
                                {getInitials(item?.name)}
                            </div>
                        )}
                    </Link>
                    <div className="">
                        <Link to={`/admin/user-profile-Id/${item?._id}`} className="d-block text-capitalize">
                            {item?.name}
                        </Link>
                        <span className="d-flex text-muted">{item?.email}</span>
                    </div>
                </h2>
            </div>
        </>
    );
}

export default UserProfile;