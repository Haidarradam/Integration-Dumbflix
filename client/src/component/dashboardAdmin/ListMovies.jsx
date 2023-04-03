import Table from "react-bootstrap/Table";
import { Container, Button } from "react-bootstrap";
import { API } from "../../config/api";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import DeleteData from "../../component/ModalDelete";

export default function TableListMovies() {
  const navigate = useNavigate();

  //Variabels for delete movies
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  let { data: films, refetch } = useQuery("FilmsAdminCache", async () => {
    const response = await API.get("/films");
    console.log(response.data.data);
    return response.data.data;
  });
  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/film/${id}`);
      console.log(response);
      refetch();
      navigate("/listmovies");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Delete Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <Container className="mt-5 pt-5">
        <h2 className="mb-4 text-light fw-semibold">List Movies</h2>
        <Table
          striped
          bordered
          hover
          size="lg"
          className="text-center text-align-center"
          style={{
            backgroundColor: "white",
          }}
        >
          <thead>
            <tr style={{ color: "#E50914" }}>
              <th>No</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Movies</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {films?.map((item, id) => {
              return (
                <>
                  <tr key={item.id}>
                    <td
                      className="align-content-center"
                      style={{ paddingTop: "70px" }}
                    >
                      {id + 1}
                    </td>
                    <td>
                      <img
                        src={item.thumbnailfilm}
                        className="m-4"
                        width="100px"
                        height="100px"
                        alt="Thumbnails"
                        style={{ objectFit: "cover" }}
                      ></img>
                    </td>
                    <td className="p-5">{item.title}</td>
                    <td>
                      <iframe
                        src={item.linkfilm}
                        className="m-4"
                        width="100px"
                        height="100px"
                        alt="Video"
                        allowFullScreen
                      ></iframe>
                    </td>
                    <td className="p-5">{item.description}</td>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      type="submit"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        margin: "50px",
                      }}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}
