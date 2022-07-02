import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { urls, addData, getData } = useContext(GlobalContext);
  const [data, setData] = useState({
    urls: "",
    short_urls: "",
    email: urls.email
  });
  const [store, setStore] = useState([]);

  const navigate = useNavigate();

  let inc = 9;
  const fullUrl = short => {
    if (short.length > 7) {
      let codes = short.slice(8, inc);
      if (short.length > 16) {
        codes = short.slice(8, 16);
      }
      console.log('vikash', codes);
      setData(pre => ({ ...pre, short_urls: codes }));
    }
    inc++;
    setData(pre => ({ ...pre, urls: short }));
  };

  const Submit = async e => {
    e.preventDefault();
    console.log(data);
    await addData(data);
    await getData(data.email);
    setData(pre => ({...pre, urls: "", short_urls: ""}))
  };
  useEffect(
    () => {
      if (typeof urls !== "object") {
        // alert(urls);
        console.log(urls);
      }
      setStore(urls);
    },
    [urls]
  );

  return (
    <Container className="App-header">
      <Button onClick={() => navigate("/")}>Login</Button>
      <Form onSubmit={Submit} style={{ width: "25rem" }}>
        <Form.Group controlId="forEmail">
          <Form.Label style={{ float: "left" }}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@gmail.com"
            value={data.email}
            onChange={e => setData(pre => ({ ...pre, email: e.target.value }))}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ float: "left" }}>Full URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://www.example.com"
            value={data.store}
            onChange={e => fullUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="text"
            placeholder="Custom code (optional)"
            value={data.short_store}
            onChange={e =>
              setData(pre => ({ ...pre, short_urls: e.target.value }))}
            required
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className="mt-3"
          style={{ float: "right" }}
        >
          Short
        </Button>
      </Form>
      <h2 className="mt-4">My Short store</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Sr</th>
            <th>URL</th>
            <th>Short code</th>
            <th>No. of visits</th>
          </tr>
        </thead>
        <tbody>
          {store.hasOwnProperty("urls") &&
            store.urls.length > 0 &&
            store.urls.map((ele, ind) => {
              console.log("vikashk");
              return (
                <tr key={ind}>
                  <td>
                    {ind + 1}
                  </td>
                  <td style={{wordWrap: 'break-word'}}>
                    {ele}
                  </td>
                  <td>
                    <a href={ele}>
                      {store.short_urls[ind]}
                    </a>
                  </td>
                  <td>
                    {store.visits[ind]}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
