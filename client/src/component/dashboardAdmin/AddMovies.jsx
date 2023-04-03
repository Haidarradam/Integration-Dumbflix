import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Attachment from "../../assets/image/Attachment.png";

import { API } from "../../config/api";
import Swal from "sweetalert2";

function AdminAddMovies() {
  let Navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState();

  const title = " Admin Add Movies";
  document.title = "Dumbflix | " + title;

  const [categoryId, setCategoryId] = useState([]);

  const [addFilms, setAddFilms] = useState({});

  let { data: categories, refetch } = useQuery("categoriesCache", async () => {
    const response = await API.get("/categories");
    return response.data.data;
  });

  useEffect(() => {
    setCategoryId(categories);
  }, [categories]);

  const handleChange = (e) => {
    setAddFilms({
      ...addFilms,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
    }
  };

  const addButtonHandler = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      if (addFilms.category_id === "") {
        setAddFilms({ ...addFilms, CategoryID: categoryId[0]?.id });
      }
      // console.log(form);

      const formData = new FormData();
      if (addFilms.thumbnailfilm) {
        formData.set(
          "thumbnailfilm",
          addFilms?.thumbnailfilm[0],
          addFilms?.thumbnailfilm[0]?.name
        );
      }
      formData.set("title", addFilms.title);
      formData.set("description", addFilms.description);
      formData.set("year", addFilms.year);
      formData.set("category_id", addFilms.category_id);
      formData.set("linkfilm", addFilms.linkfilm);
      formData.set("linkeps", addFilms.linkeps);
      formData.set("titleeps", addFilms.titleeps);

      console.log(formData);
      // Configuration Content-type

      // Insert data user to database
      const response = await API.post("/film", formData, config);
      console.log("add movies success : ", response);

      Navigate("/");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add Film Success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Add Film Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });

  return (
    <Form
      className="w-75 mt-5 pt-5 mx-auto"
      onSubmit={(e) => addButtonHandler.mutate(e)}
    >
      <h4 className="text-light fw-semibold mb-4">Add Movie</h4>
      <Row className="mb-2 formInputMovies">
        <Col xs={9}>
          <Form.Control
            className="formInputMovies"
            placeholder="Title"
            type="text"
            name="title"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>
              <Form.Control
                name="thumbnailfilm"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Label>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Control
          className="formInputMovies"
          placeholder="Year"
          type="number"
          name="year"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Select
          className="custom-select"
          name="category_id"
          onChange={handleChange}
        >
          <option hidden>Genre</option>
          {categories?.map((item) => (
            <option style={{ color: "dark" }} value={item?.id}>
              {item?.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          className="formInputMovies"
          placeholder="Link Trailer"
          type="text"
          name="linkfilm"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-5">
        <Form.Control
          className="formInputMovies"
          as="textarea"
          placeholder="Description"
          type="text"
          name="description"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Title Movie"
          type="text"
          className="formInputMovies"
          name="titleeps"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Control
          placeholder="Link Movie"
          type="text"
          className="formInputMovies"
          name="linkeps"
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-flex flex-row-reverse">
        <Button
          className="border-0 fw-bold pe-5 ps-5 bd-highlight"
          style={{ backgroundColor: "#E50914" }}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default AdminAddMovies;
