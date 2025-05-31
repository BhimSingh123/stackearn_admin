import NoDataPageImage from "../../assert/NoDat.png";

const NoDataPage = () => {

  return (
    <>
      <div className="error-box mb-5">
        <div className="error-box-img">
          <img src={NoDataPageImage} alt="No Data Found" className="img-fluid" />
        </div>
        <h3 className="h2 mb-3">No Data Found</h3>
        <p className="h4 font-weight-normal">
          Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
        </p>
      </div>
    </>
  );
};


export default NoDataPage;
