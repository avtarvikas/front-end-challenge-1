import React from "react";

const GrandTotal = props => {
  let GrandTotal = 0;
  return (
    <div className="grand-total">
      <div>
        <ol>
          {props.data.length > 0 &&
            props.data.map((d, i) => {
              GrandTotal =
                GrandTotal +
                parseInt(d.sources[d.selectedSource].discounted_price,10) *
                  d.quantity;
              return (
                <li key={i}>
                  {d.sources[d.selectedSource].type}{" "}
                  <span style={{fontSize:"16px",fontStyle:'italic'}}>
                    {" "}
                    ₹{d.sources[d.selectedSource].discounted_price}
                    &nbsp; x {d.quantity}
                  </span>{" "}
                  = &nbsp;₹{parseInt(
                    d.sources[d.selectedSource].discounted_price,10
                  ) * d.quantity}
                </li>
              );
            })}
        </ol>
      </div>
      <div className="total">
        <label>GrandTotal</label>&nbsp;=&nbsp;
        <span>₹ {GrandTotal}</span>
      </div>
    </div>
  );
};

export default GrandTotal;
