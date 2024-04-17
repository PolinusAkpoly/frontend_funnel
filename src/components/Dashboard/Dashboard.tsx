/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/01/2024 11:50:37
*/
import React, { FC, useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/selectors/selectors';
import ProfileForm from '../ProfileForm/ProfileForm';


interface DashboardProps {

}


const Dashboard: FC<DashboardProps> = () => {

  const navs = [
    {
      name: "Dashboard",
      path: '/dashboard'
    },
    // {
    //   name: "Settings",
    //   path: '/dashboard/settings'
    // },
  ]


  const [currentPage, setCurrentPage] = useState<number>(0)
  const user = useSelector(getCurrentUser)

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="Dashboard">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-2">
            <div className="list-group ">
              {
                navs.map((item, index) => {
                  return <Link key={index} to={item.path} onClick={() => setCurrentPage(index)}
                    className={"list-group-item list-group-item-action" + (currentPage == index ? ' active' : '')}>
                    {item.name}
                  </Link>
                })
              }
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h4>Your Profile</h4>
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {
                      navs[currentPage].name == 'Dashboard' ?
                        <ProfileForm userId={user._id} />
                        :
                        null
                    }
                    {
                      navs[currentPage].name == 'Settings' ?
                      "Settings"
                      :
                        null
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;