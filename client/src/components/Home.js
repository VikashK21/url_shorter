// eslint-disable-next-line
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
    email: ""
  });
  const [store, setStore] = useState(urls || []);

  const navigate = useNavigate();

  const Submit = async e => {
    e.preventDefault();
    try {
      await addData(data);
      await getData(data.email);
      setData(pre => ({ ...pre, urls: "", short_urls: "" }));
    } catch (err) {
      setData(pre => ({ ...pre, urls: "", short_urls: "" }));
    }
  };
  useEffect(
    () => {
      if (typeof urls !== "object") {
        console.log(urls);
        // alert(urls);
        // eslint-disable-next-line
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
            onChange={e => {
              let codes2 = "";
              codes2 += (Math.random() + 1).toString(36).substring(5);
              setData(pre => ({
                ...pre,
                urls: e.target.value,
                short_urls: codes2
              }));
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="text"
            placeholder="Custom code (optional)"
            value={data.short_urls}
            onChange={e =>
              setData(pre => ({ ...pre, short_urls: e.target.value }))}
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
              return (
                <tr key={ind}>
                  <td>
                    {ind + 1}
                  </td>
                  <td style={{ wordWrap: "break-word" }}>
                    {ele}
                  </td>
                  <td
                    onClick={e => {
                      const visits = async e => {
                        await axios.patch("/api/visit", {
                          email: store.email,
                          visits: ind
                        });
                        await getData(store.email);
                      };
                      visits();
                    }}
                  >
                    {" "}<a href={ele} target="_blank">
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
