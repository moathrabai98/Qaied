import { useEffect, useState } from "react";
import ProductForm from "../Components/ProductForm";
import { useLocation } from "react-router-dom";
import { fetchCategories } from "../API calls/categories";
import Spinner from "../Components/Spinner";

const UpdateProduct = () => {
  const location = useLocation();
  const [categoryName, setCategoryName] = useState("");
  const [responseRecieved, setResponseRecieved] = useState(false);

  useEffect(() => {
    fetchCategories(location.state.categoryid)
      .then(response => {
        setResponseRecieved(true);
        console.log(response.data.data.categories);
        setCategoryName(
          response.data.data.categories.filter(
            category => category._id === location.state.categoryid
          )[0].categoryName
        );
      })
      .catch((error) => {
        setResponseRecieved(false);
        console.log(error);
      });
  }, [location.state.categoryid]);

  return (
    <>
      {!responseRecieved && <Spinner text="Loading" />}
      {categoryName && responseRecieved && (
        <div className="container">
          <div className="row mt-5">
              <img
                className="col-md-5"
                src={location.state.imageLink}
                alt="..."
              />
          
            <div className='col-md-7'>
            <ProductForm
              _id={location.state._id}
              productName={location.state.name}
              price={location.state.price}
              imageLink={location.state.imageLink}
              description={location.state.description}
              type={location.state.type}
              categoryName={categoryName}
              categoryId={location.state.categoryid}
              action="Update"
            />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
