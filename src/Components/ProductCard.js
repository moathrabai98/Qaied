import { Button } from "react-bootstrap";

const ProductCard = (props) => {
  const { image, name,  transactionType, onButtonPress } = props;
  return (
    <div className="col-12 col-sm-6  col-lg-4 col-xl-3 mb-4 mt-2 m-2 p-3">
      <div className="card" dir="rtl">
        <img
          src={image}
          className="card-img-top"
          alt="..."
          onClick={onButtonPress}
          style={{ cursor: "pointer" }}
        />
        <div className="card-body">
          <h6 className="card-title">
            <strong>{name.charAt(0).toUpperCase() + name.slice(1)}</strong>
          </h6>
          <p className="card-text">
متاح            <strong style={{ color: "#198754" }}>
              {transactionType === "sell" ? " Purchase" : " للمقايضة"}
            </strong>
          </p>
          <Button className="btn  btn-primary" onClick={onButtonPress}>
            عرض
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
