import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function Sidebar() {
    const [data, setData] = useState([])
    const user = Cookies.get('user')
    console.log(user)

    useEffect(() => {
        const fetchData = async () => {
            let ErrorDataset = []
            try {
                const dataset = [
                    {
                        name: 'Homepage',
                        isHomePage: true,
                        _id: '/home',
                    },
                    {
                        name: 'My Projects',
                        isLabel: true,
                    },
                ]

                const url = 'http://localhost:3000'

                const response1 = await fetch(
                    url + '/project/myProjects/' + user
                )
                let data1 = await response1.json()

                data1 = data1.map((item) => {
                    return {
                        ...item,
                        isMyProject: true,
                    }
                })
                const response2 = await fetch(
                    url + '/project/collabProjects/' + user
                )
                let data2 = await response2.json()

                data2 = data2.map((item) => {
                    return {
                        ...item,
                        isMyProject: false,
                    }
                })

                const newDataset = dataset
                    .concat(data1)
                    .concat({
                        name: 'Collab Projects',
                        isLabel: true,
                    })
                    .concat(data2)
                setData(newDataset)
            } catch (error) {
                console.error('Error fetching data:', error)
                ErrorDataset = [
                    {
                        name: 'Homepage',
                        isHomePage: true,
                        _id: '/home',
                    },
                    {
                        name: 'My Projects',
                        isLabel: true,
                    },
                    {
                        name: 'Collab Projects',
                        isLabel: true,
                    },
                ]
                setData(ErrorDataset)
            }
        }
        fetchData()
    }, [])

    const Sidebardata = data

    const handleClick = (project) => {
        // onProjectSelect(project._id)
    }

    console.log('siderbar here')
    console.log(Sidebardata)
    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {Sidebardata.map((val, key) => (
                    <li
                        key={key}
                        className="SidebarList row"
                    >
                        {val._id ? (
                            <Link
                                to={
                                    val.isHomePage
                                        ? '/home'
                                        : `/project/${val._id}`
                                }
                                className={
                                    val.isHomePage
                                        ? 'HomePageButton'
                                        : val.isLabel
                                        ? 'Label'
                                        : val.isMyProject
                                        ? 'MyProject'
                                        : 'CollabProject'
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
    )
}

export default Sidebar
