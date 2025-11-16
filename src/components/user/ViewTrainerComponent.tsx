import React from "react";

const ViewTrainerComponent = () => {
  return (
    <div className="min-h-screen  min-w-screen bg-secondary pt-20">
      <div className="min-w-screen bg-main h-120 flex items-center justify-around ">
        <img
          src=" https://media.licdn.com/dms/image/v2/D5622AQFn8oGomeptuw/feedshare-shrink_800/B56ZpzSjCQJwAg-/0/1762870842011?e=1764806400&v=beta&t=ctIWR8gJkwIYmh70MDvT1bpTO3-JtCePlqVNGiRFLTg"
          className="h-70  w-70"
          alt=""
        />
        <div className="mr-200">
          <h1>name</h1>
          <h2>expertise</h2>
        </div>
      </div>
    </div>
  );
};

export default ViewTrainerComponent;
