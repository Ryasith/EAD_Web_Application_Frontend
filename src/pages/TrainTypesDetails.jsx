import React, { useState } from 'react';

const TrainTypesDetails = ({ trainType: initialTrainType, price: initialPrice }) => {
  const [trainType, setTrainType] = useState(initialTrainType);
  const [price, setPrice] = useState(initialPrice);

  return (
    <div className="row">
    <div className="col-md-6 mb-4">
      <label className="form-label" for="form3Example1m1">Train Type:</label>
      <input
        type="text"
        value={trainType}
        onChange={(e) => setTrainType(e.target.value)}
      />
    </div>
    <div className="col-md-6 mb-4">
     <label className="form-label" for="form3Example1m1">Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
    </div>
  );
};

export default TrainTypesDetails;
