/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/01/2024 12:50:44
*/
import React, { FC, useEffect, useState } from 'react';
import './Pricing.css';
import PageHeader from '../PageHeader/PageHeader';
import { Formule } from '../../models/Formule';
import { getDatas } from '../../api/api-entity';
import { Link } from 'react-router-dom';


interface PricingProps {

}

const Pricing: FC<PricingProps> = () => {
  const [formules, setFormules] = useState<Formule[]>([])
  const [avantages, setAvantages] = useState<any[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      const dataFormul = await getDatas('formule')
      if (dataFormul.isSuccess) {
        
        setFormules(dataFormul.results)
      }
      const dataAvantage = await getDatas('Avantage')

      if (dataAvantage.isSuccess) {
        setAvantages(dataAvantage.results)
      }
    }
    runLocalData()
  },[])

  return (
    <div className="Pricing">
      <PageHeader name='Pricing' />
      <div className="container py-3">
        <main>
          <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {
              formules.map((formule: Formule, index: any) => {
                return <div className="col" key={index}>
                  <div className="card mb-4 rounded-3 shadow-sm">
                  <div className={`card-header py-3 ${formule.name === "enterprise" ? "bg-primary" : ""}`}>
                    <h4 className="my-0 fw-normal">{formule.name}</h4>
                  </div>

                    <div className="card-body">
                      {

                        formule.options ?
                          formule.options.map((option: any, index2: any) => {
                            return <div key={index2}>
                              <h1 className="card-title pricing-card-title">{option.name == "price" ? option.value : null}<small className="text-body-secondary fw-light"></small></h1>
                              <ul className="list-unstyled mt-3 mb-4">
                                <li> {option.name !== "price" ? option.value : null}</li>
                              </ul>
                            </div>

                          })
                          :
                          null

                      }

                      {
                        formule.name === "free" && (
                          <button type="button" className="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
                        )
                      }
                      {
                        formule.name === "pro" && (
                          <button type="button" className="w-100 btn btn-lg btn-primary">Get started</button>
                        )
                      }
                      {
                        formule.name === "enterprise" && (
                          <div>
                            <Link to={formule.button_link}>
                              <button type="button" className="w-100 btn btn-lg btn-primary">Contact us</button>
                            </Link>
                          </div>
                        )
                      }

                      {/* <Link to={formule.button_link}><button type="button" className="w-100 btn btn-lg btn-outline-primary ">{formule.button_text}</button></Link> */}
                    </div>
                  </div>
                </div>
              })
            }

          </div>
          <h2 className="display-6 text-center mb-4">Compare plans</h2>
          <div className="table-responsive">
            <table className="table text-center">
              <thead>
                <tr>
                  <th style={{ width: '20%' }} />
                  {
                    formules.map((formule: Formule) => {
                      return <th key={formule._id} style={{ width: 80 / (formules?.length || 1) }}>{formule.name}</th>
                    }
                    )}

                </tr>
              </thead>
              <tbody>

                {
                  avantages?.map((avantage: any) => {
                    return (
                      <tr key={avantage._id} >
                        <th scope="row" className="text-start">{avantage.name}</th>
                        {
                          formules.map((formule: Formule) => {
                            return <td key={formule._id}>
                              {
                                avantage?.formules?.includes(formule._id) ?
                                  <svg className="bi" width={24} height={24}><use xlinkHref="#check" /></svg>
                                  :
                                  null
                              }
                            </td>
                          }
                          )}
                      </tr>
                    );
                  })
                }

              </tbody>
              <tbody>

              </tbody>
            </table>
          </div>
        </main>

      </div>
    </div>

  );
}

export default Pricing;