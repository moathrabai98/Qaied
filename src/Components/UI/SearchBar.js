import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex align-items-center">
      <Form.Control
        type="text"
        placeholder="ابحث عن المنتجات"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="me-2"
      />
      <Button variant="primary" type="submit">
        بحث
      </Button>
    </Form>
  );
};

export default SearchBar;
