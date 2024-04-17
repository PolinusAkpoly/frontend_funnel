/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/02/2024 13:07:30
*/
import React, { FC, useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getTunnelStepTemplate } from '../../api/api-tunnel';
import Loading from '../Loading/Loading';
import { Block } from '../../models/Block';
import 'react-quill/dist/quill.snow.css';
import { OuitubePlayer } from 'ouitube-player';
import Accordion from '../Accordion/Accordion';
interface TemplateViewProps { }

const TemplateView: FC<TemplateViewProps> = () => {
  const { tunnelId, stepId } = useParams();
  const [datas, setDatas] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [close, setClose] = useState<boolean>(false);

  useEffect(() => {
    const runLocalData = async () => {
      if (tunnelId && stepId) {
        try {
          const newDatas = await getTunnelStepTemplate(tunnelId, stepId);
          if (newDatas?.isSuccess && newDatas.blocks) {
            setDatas(newDatas);
          }
          setLoading(false);
        } catch (error) {
          console.error('Une erreur est survenue lors de la récupération des données du template :', error);
        }
      }
    };
    runLocalData();
  }, [tunnelId, stepId]);

  if (datas && !datas.isSuccess) {
    return <Navigate to="/error" />;
  }

  const getAccordion = (content: string) =>{
    const data = JSON.parse(content)
    if(!Array.isArray(data)){
      return <></>
    }

    return <div className='ml-5 mr-5'>
    {
       data.map((elt, index) => {
        return <div >
          <Accordion key={index} title={elt.title} children={elt.content} />
        </div> 
       })
    }
    </div>
   
  }


  

  return (
    <div className="TemplateView">
      {loading ? (
        <Loading />
      ) : (
        <>
          {
            !close ?
              <header className="d-flex p-1 gap-2 bg-dark sticky-top align-items-center justify-content-center">
                Preview (Mudey Template)
                <Link className="btn btn-success" to={`/template/${stepId}/${tunnelId}/editor`}>
                  Return
                </Link>
                <button className="btn btn-close" onClick={() => setClose(true)}></button>
              </header>
              :
              <div onClick={() => setClose(false)} className="position-fixed btn btn-success bottom-0 m-3 openButton">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>

              </div>
          }

          {datas?.blocks?.map((block: Block) => (
            <section style={block.styles} key={block._id}>
              <div className={(block.container || 'container-fluid')}>
                <div className={block.columnCount > 1 ? 'row ' : ''}>
                  {[...Array(block.columnCount)].map((_, index) => (
                    <div
                      key={index}
                      className={block.columnCount > 1 ? `col-md-${12 / block.columnCount}` : ''}
                    >
                      {block.templates.filter(t => t.columnIndex == index).map((template) => {
                        const {styles, content, attributes} = template

                        if (template.type === 'IMAGE') {
                          return <div key={template._id}>
                            <img
                              {...attributes}
                              width={'100%'}
                              style={styles}
                            />

                          </div>
                        }
                        if (template.type === 'VIDEO') {
                          return <div key={template._id} >
                            <div style={styles} {...attributes}>
                              <OuitubePlayer
                                src={attributes?.src as string || ''}
                                onProgress={(e: any) => console.log(e)}
                              />
                            </div>

                          </div>
                        }
                        if (template.type === 'BUTTON') {
                          return <div key={template._id}>
                            <button
                              {...attributes}
                              style={styles}
                            >
                              {(template.content as string) || 'button'}
                            </button>

                          </div>
                        }
                        if (template.type === 'LINK') {
                          return <div key={template._id}>
                            <a
                              {... attributes}
                              style={template.styles}
                            >
                              {(content as string) || 'button'}
                            </a>

                          </div>
                        }
                        if (template.type === 'ACCORDION') {
                          return <div key={template._id}>
                            {getAccordion(content)}
                          </div>
                        }
                        if (template.type === 'AUDIO') {
                          return <div key={template._id}>
                            <audio controls {...attributes}>
                              <source
                                src={attributes?.src as string || window.location.origin + "/assets/audios/change.wav"}
                                style={styles} />
                              Your browser does not support the audio tag.
                            </audio>
                          </div>
                        }
                        if (template.type === 'APPLICATION') {
                          return <embed
                            {... attributes}
                            type="application/pdf"
                            style={styles}
                            width="100%"
                            height="500px"
                          />

                        }
                        return (
                          <div key={template._id} 
                          style={styles} 
                          dangerouslySetInnerHTML={{ __html: content }} 
                          />

                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </>
      )}

    </div>
  );
};

export default TemplateView;
