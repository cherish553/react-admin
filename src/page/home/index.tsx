import React, { useState, useEffect } from "react";
import { Button } from "antd";
export default function Home() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
   
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
  },[page])
  const chifan=()=>{
    setPage(1)
  }
  return (
    <div>
      <p>You clicked {page} times</p>
      <Button type='default' onClick={() => setPage(page + 1)}>Click me</Button>
      <Button type='default' onClick={() => setSize(size + 1)}>Click me</Button>
      <Button onClick={() => chifan()}>Click me</Button>
      {size}
    </div>
  );
}
