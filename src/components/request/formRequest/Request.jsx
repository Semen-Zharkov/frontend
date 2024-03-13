import React, {Component} from 'react';
import Userfront, { SignupForm } from "@userfront/toolkit/react";


async function getInfo() {
  const res = await window.fetch("/your-endpoint", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Userfront.tokens.accessToken}`,
    },
  });

  console.log(res);
}


export default getInfo;