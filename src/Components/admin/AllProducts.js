import { useState, useEffect } from "react";
import { deleteProductAdmin, getAllProduct } from "../../API calls/admin";


const AllProducts = () => {
  const [products, setProducts] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data);
      } catch (error) {
        console.log("Error while fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (product.productName &&
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product._id && product._id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductAdmin(productId);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.log(`Error while deleting product ${productId}`, error);
    }
  };

  return (
    <div className="col-md-9 col-sm-12" dir="rtl">
      <h2 className="m-2">جميع المنتجات</h2>
      <div className="form-group mt-3">
        <div className="search-bar-container m-2">
          <input
            type="text"
            className="form-control search-bar-input"
            placeholder="ابحث عن منتج"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-bar-button">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">الاسم</th>
            <th scope="col">الحالة</th>
            <th scope="col">id</th>
            <th scope="col">مالك المنتج</th>
            <th scope="col">الوصف</th>
            <th scope="col">حذف</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}.</td>
                <td>{product.productName}</td>
                <td>{product.status}</td> {/* New status column */}
                <td>{product._id}</td>
                <td>{product.username}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">لا يوجد منتجات</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
