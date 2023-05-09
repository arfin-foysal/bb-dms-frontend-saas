import React from "react";

const TopBox = ({ name, color, icon,item }) => {
  return (
    <div className="col-xl-3 col-md-6 mb-4 ">
      <div
        className="card  border-end border-top-0 border-bottom-0  shadow h-100 py-2"
        style={{
          borderLeft: `0.25rem solid ${color}`,
        }}
      >
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary  mb-1">
                {name}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {item}
              </div>
            </div>
            <div className="col-auto ">
              {/* <i className="fas fa-calendar fa-2x text-gray-300"></i> */}
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBox;
