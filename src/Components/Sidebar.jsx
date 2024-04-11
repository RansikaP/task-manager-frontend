import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Sidebar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Sidebar");
        const dataset = [
          {
            name: "Homepage",
            isHomePage: true,
            _id:'/home'
          },
          {
            name: "My Projects",
            isLabel: true,
          },
        ];

        const url = "http://localhost:3000";
        const response1 = await fetch(url + "/project/myProjects/Rans");
        let data1 = await response1.json();

        data1 = data1.map((item) => {
          return {
            ...item,
            isMyProject: true,
          };
        });
        const response2 = await fetch(url + "/project/collabProjects/Rans");
        let data2 = await response2.json();

        data2 = data2.map((item) => {
          return {
            ...item,
            isMyProject: false,
          };
        });

        const newDataset = dataset
          .concat(data1)
          .concat({
            name: "Collab Projects",
            isLabel: true,
          })
          .concat(data2);
        console.log(newDataset);
        setData(newDataset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const Sidebardata = data;

  const handleClick = (project) => {
    // onProjectSelect(project._id)
  };

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {Sidebardata.map((val, key) => (
          <li key={key} className="SidebarList row">
            {val._id ? (
              <Link
                to={val.isHomePage ? "/home" : `/project/${val._id}`}
                className={
                  val.isHomePage
                    ? "HomePageButton"
                    : val.isLabel
                    ? "Label"
                    : val.isMyProject
                    ? "MyProject"
                    : "CollabProject"
                }
                onClick={() => handleClick(val)}
              >
                {val.name}
              </Link>
            ) : (
              <div className="Label">{val.name}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
