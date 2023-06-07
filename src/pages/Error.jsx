import React from 'react'


const Error = props => {
    return (
      <div
        className="container border border-dark"
        style={{ marginTop: "20%" }}
      >
        <div className="row mt-5">
          <div className="col-md-8 offset-md-4">
            <h1>{props.title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-4">
            <h4>{props.message}</h4>
          </div>
        </div>
        <div className="row">
          <button
            className="btn btn-primary col-md-2 offset-md-4 mt-4 mb-5"
            style={{ marginLeft: "32em" }}
            onClick={() => {
              window.location.reload(true);
            }}
          >
            Reload
          </button>
        </div>
      </div>
    );
}

export default Error
