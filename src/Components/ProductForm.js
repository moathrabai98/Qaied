import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { fetchCategories } from "../API calls/categories";
import {
  createProduct,
  updateProduct,
  // getUploadLink,
  // uploadImage,
} from "../API calls/products";
import { Form, Button } from "react-bootstrap";
import Input from "./UI/Input";
import DropdownSelector from "./UI/Dropdown";

const ProductForm = props => {
  const [type, setType] = useState(props.type);
  const [categories, setCategories] = useState([]);
  const [chosenCategoryId, setChosenCategoryId] = useState(props.categoryId);
  const [chosenCategoryName, setChosenCategoryName] = useState(
    props.categoryName
  );
  const [productName, setProductName] = useState(props.productName);
  const [img, setImg] = useState([]);
  const [variant, setVariant] = useState("primary");
  const [productDescription, setProductDescription] = useState(
    props.description
  );

  useEffect(() => {
    fetchCategories()
      .then(result => setCategories(result.data.data.categories))
      .catch("Error while fetching categories");
  }, []);

  useEffect(() => {
    setImg(props.file);
  }, [props.file]);

  const submit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("categoryId", chosenCategoryId);
    formData.append("username", localStorage.getItem("username"));
    formData.append("description", productDescription);

    formData.append("date", Date.now());
    formData.append("transactionType", type);
    formData.append("image", img);
    
    if (props.action === "Update") {
      let data = {
        _id: props._id,
        productName,
        categoryId: chosenCategoryId,
        username: localStorage.getItem("username"),
        description: productDescription,
        date: Date.now(),
        transactionType: type,
        images: props.imageLink,
      };
      updateProduct(data)
        .then(() =>
          props.history.push(`/${localStorage.getItem("user_id")}/get_products`)
        )
        .catch(err => {
          if (err.response.status === 401) {
            alert("Unauthorized Access. Product was not updated.");
          } else if (err.response.status === 406) {
            alert("Problem while updating product. Please try again or later.");
          }
        });
   
    } else {
              createProduct(formData)
                .then(
                  props.history.push(
                    `/${localStorage.getItem("user_id")}/get_products`
                  )
                )
                .catch(err => {
                  if (err.response.status === 401) {
                    alert("Unauthorized Access. Product was not created.");
                  } else if (err.response.status === 406) {
                    alert(
                      "Problem while updating product. Please try again or later."
                    );
                  }
                });
            }
            
        
      
  };
  return (
    <React.Fragment>
      <Form onSubmit={submit} dir="rtl">
        <Input
          label="إسم المنتج"
          type="Text"
          placeholder="قم بإدخال اسم المنتج"
          val={productName}
          updateState={e => setProductName(e.target.value)}
        />


       <textarea
       style={{width:"29.7em"}}
          label="الوصف"
          value={productDescription}
          placeholder="قم بكتابة وصف عن تفاصيل المنتج"
          onChange={e => setProductDescription(e.target.value)}
        />


        <div className="row mt-2">
          <Form.Group className=" col-md-5 col-lg-3 col-12 mb-3 offset-md-2">
            <DropdownSelector
              variant="light"
              className=""
              label="نوع العملية"
              labelRequired={true}
              chosen={type}
              options={[ "exchange"]}
              onSelect={type => setType(type)}
              dropdownOff="transactionType"
              
            />
          </Form.Group>

          <Form.Group className=" col-md-2 mb-3">
            <DropdownSelector
              variant="light"
              className=""
              label="الصنف"
              labelRequired={true}
              chosen={chosenCategoryName}
              options={categories}
              onSelect={cat => {
                setChosenCategoryId(cat._id);
                setChosenCategoryName(cat.categoryName);
                
              }}
              dropdownOff="category"
            />
          </Form.Group>
        </div>

        <div className="row mt-4 mb-3">
          <div className="col-md-3 offset-md-2">
            <Button
              variant={variant}
              type="submit"
              style={{ width: "100%" }}
              onClick={() => {
                setVariant("success");
              }}
              disabled={
                productName === "" || productDescription === ""
                  ? true
                  : false
              }
            >
              {props.action || "Create"}
            </Button>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default withRouter(ProductForm);
