import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";

export default function Payments() {
    return (
        <>
        <Container>
        <Row>
            <Col className="mt-5 pt-5" style={{ textAlign: "center" }}>
            <h1 className="mt-5 mb-4 text-white fw-bold">Premium</h1>
            <p className="text-white fs-5">
                Bayar Sekarang dan Nikmati streaming film-film yang kekinian dari{" "}
                <span className="fw-bold" style={{color:"#E50914"}}>DUMBFLIX</span>
            </p>
            <p>
                <span className="fw-bold fs-5" style={{color:"#E50914"}}>DUMBFLIX : </span>
                <span className="fw-bold text-white fs-5">0981119181</span>
            </p>
            </Col>
            <Row className="d-flex flex-column justify-content-center">
            <Col className="d-flex flex-column justify-content-center align-items-center mt-3">
                <Form.Control
                className="fs-6"
                type="text"
                placeholder="Input Your Account Number"
                style={{ width: "400px", backgroundColor:"#1F1F1F", border:"2px solid #D2D2D2", color:"#D2D2D2" }}
                />
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center mt-3">
                <InputGroup className="mb-3" style={{ width: "400px" }}>
                <Form.Control
                    className="text-center fs-6 text-danger"
                    type="file"
                />
                </InputGroup>
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center mt-3">
                <p
                className="btn btn-danger mt-3 fs-5" 
                style={{ width: "400px", backgroundColor:"#E50914" }}
                >
                Kirim
                </p>
            </Col>
            </Row>
        </Row>
        </Container>
        </>
    )
}