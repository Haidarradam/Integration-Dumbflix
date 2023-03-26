import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { API } from "../config/api";
import { useQuery } from "react-query";

export default function TableTransactions() {
  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/transactions");
    console.log(response.data.data);
    return response.data.data;
  });
  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4 text-light fw-semibold">Income Transaction</h2>
      <Table striped bordered hover size="lg" className="text-center text-align-center"
      style={{
        backgroundColor:"#1F1F1F"
      }}
      >
        <thead>
          <tr style={{color:"#E50914"}}>
            <th>No</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Remaining Active</th>
            <th>Status User</th>
            <th>Status Payment</th>
          </tr>
        </thead>
        <tbody>
          {transaction?.map((item, index) => (
          <tr key={item.id}>
            <td className="text-light">{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.address}</td>
            {item.status === "pending" && <td className="text-capitalize" style={{ color: "#FF9900" }}>{item.status}</td>}
            {item.status === "success" && <td className="text-capitalize" style={{ color: "#78A85A" }}>{item.status}</td>}
            {item.status === "failed" && <td className="text-capitalize" style={{ color: "#E83939" }}>{item.status}</td>}
          </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}


