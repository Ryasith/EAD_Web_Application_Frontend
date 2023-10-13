import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

const TrainTypesDetails = ({ trainType: initialTrainType, price: initialPrice }) => {
  const [trainType, setTrainType] = useState(initialTrainType);
  const [price, setPrice] = useState(initialPrice);

  const { train_Type, isLoading, isError, isSuccess, message } = useSelector((state) => state.trains);
  
  const traintype = [
    "Express",
    "Commuter",
    "InterCity"]

  const handletypeChange = (e) => {
    const selectedOption = e.target.value;
    setTrainType(selectedOption);
  };

  return (
    <div className="row">
      <div className="col-md-6 mb-1">
        <label className="form-label" for="form3Example1m1">Train Type</label>
        <select name="trainType" id="trainType" class="form-select" aria-label="Default select example" value={trainType} onChange={handletypeChange}     >
          <option selected value="">Choose Train Type</option>
          {traintype.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6 mb-1">
        <label className="form-label" for="form3Example1m1">Ticket Price</label>
        <input
          type="number"
          value={price}
          className="form-control form-control-lg"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TrainTypesDetails;
