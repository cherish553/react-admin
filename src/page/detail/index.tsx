import React, { useState, useEffect } from "react";

function FriendStatus() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOnline(true);
    }, 2000);
  },[]);
  return (<div>11111111111 {isOnline?'true':'false'}</div>);
}
export default FriendStatus;
