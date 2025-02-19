import React from "react";
import { useState } from "react";

export const AddActorForm = () => {
  const [name, setName] = useState();
  const [date_of_birth, setDate_of_birth] = useState();
  const [nationality, setNationality] = useState();
  const [resultOperation, setResult] = useState("");

  const getName = (event) => {
    setName(event.target.value);
  };

  const getBirth = (event) => {
    setDate_of_birth(event.target.value);
  };

  const getNationality = (event) => {
    setNationality(event.target.value);
  };

  const onSubmitHandler = async () => {
    event.preventDefault();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const endpoint = "/actor";

    const url = `${baseUrl}${endpoint}`;

    const tmp = {
      name,
      date_of_birth,
      nationality,
    };

    const results = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmp),
    });

    const data = await results.json();
    if (results.status === 500) {
      setResult("Data base error");
    } else {
      console.log(data.message);
      setResult(data.message);
    }

    setTimeout(() => {
      window.location = "/actors";
    }, 5000);
  };

  return (
    <>
      <h1 className="display-1 text-center">Add Actor</h1>
      <div className="container mt-3">
        <form onSubmit={onSubmitHandler} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" onChange={getName} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" onChange={getBirth} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Nationality</label>
            <input
              type="text"
              onChange={getNationality}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
        <p className ="text-primary display-4" >{resultOperation}</p>
      </div>
    </>
  );
};
