/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/01/2024 16:31:28
*/
import React, { FC, useEffect, useState } from 'react';

import './Footer.css';
import { searchDatas } from '../../api/api-entity';
import { Page } from '../../models/Page';
import { OptionPage } from '../../models/OptionPage';
import { Link } from 'react-router-dom';


interface FooterProps {

}


const Footer: FC<FooterProps> = () => {

  
  const [pagesOneColunm, setPagesOneColumn] = useState<Page[]>([])
  const [pagesTwoColumn, setPagesTwoColumn] = useState<Page[]>([])
  const [pagesThreeColumn, setPagesThreeColumn] = useState<Page[]>([])



  useEffect(() => {
    window.scrollTo(0, 0);
  
    const runLocalData = async () => {
      const query = 'option.position=Footer';
      const dataFooter = await searchDatas('page', query);
  
      if (dataFooter.isSuccess) {
        const updatedDataPageFooter = dataFooter.results;
        
        const updatedPagesOneColumn: Page[] = [];
        const updatedPagesTwoColumn: Page[] = [];
        const updatedPagesThreeColumn: Page[] = [];
  
        updatedDataPageFooter.forEach((page: Page) => {
          page.options.forEach((option: OptionPage) => {
            const columnNumberPage = option.column;
            if (columnNumberPage === "1") {
              updatedPagesOneColumn.push(page);
            } else if (columnNumberPage === "2") {
              updatedPagesTwoColumn.push(page);
            } else {
              updatedPagesThreeColumn.push(page);
            }
          });
        });
  
        
        setPagesOneColumn(updatedPagesOneColumn);
        setPagesTwoColumn(updatedPagesTwoColumn);
        setPagesThreeColumn(updatedPagesThreeColumn);
      }
    };
  
    runLocalData();
  }, []); 

  return (
    <div className="Footer">
      <div className="container">
        <footer className="py-5">
          <div className="row">
            
            <div className="col-6 col-md-2 mb-3">
            <h5>Mudey </h5>
              {
                pagesOneColunm.map((pageOneClunm: Page)=>{
                  return <div key={pageOneClunm._id}>                            
                            <ul className="nav flex-column">
                              <li className="nav-item mb-2">
                                <Link to={"/page/" + pageOneClunm.slug} className="nav-link p-0 text-body-secondary">
                                   {pageOneClunm.name}                      
                                </Link></li>                             
                            </ul>
                         </div>
                })
              }        
            </div>
            <div className="col-6 col-md-2 mb-3">
            <h5>Mentions</h5>
              {
                pagesTwoColumn.map((pageTwoClunm: Page)=>{
                  return <div key={pageTwoClunm._id}>                            
                            <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                               <Link to={"/page/" + pageTwoClunm.slug} className="nav-link p-0 text-body-secondary">
                                   {pageTwoClunm.name}                           
                               </Link></li>
                            </ul>
                         </div>
                })
              }              
            </div>
            <div className="col-6 col-md-2 mb-3">
            <h5>Pages</h5>
              {
                pagesThreeColumn.map((pageThreeClunm: Page)=>{
                  return <div key={pageThreeClunm._id}>                            
                            <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                               <Link to={"/page/" + pageThreeClunm.slug} className="nav-link p-0 text-body-secondary">
                                   {pageThreeClunm.name}                            
                               </Link></li>                   
                            </ul>
                         </div>
                })
              }            
            </div>
           
            <div className="col-md-5 offset-md-1 mb-3">
              <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                  <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                  <button className="btn btn-primary" type="button">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2024 Company, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width={24} height={24}>
                <use xlinkHref="#twitter" />
              </svg></a></li>
              <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width={24} height={24}>
                <use xlinkHref="#instagram" />
              </svg></a></li>
              <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width={24} height={24}>
                <use xlinkHref="#facebook" />
              </svg></a></li>
            </ul>
          </div>
        </footer>
      </div>

    </div>
  );
}

export default Footer;