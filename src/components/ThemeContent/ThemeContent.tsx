/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 02/02/2024 10:44:55
*/
// ThemeContent.tsx
import React, { FC, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { getDatas } from '../../api/api-entity';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { TunnelStep } from '../../models/TunnelStep';
// import ImagePreview from '../ImagePreview/ImagePreview';

interface ThemeContentProps { 
  tunnelId?: string
  currentStep: TunnelStep
}

const ThemeContent: FC<ThemeContentProps> = ({tunnelId, currentStep}) => {
  const [templates, setTemplates] = useState<any[]>();
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const runLocalData = async () => {
    const data = await getDatas('template');
    if (data.isSuccess) {
      setTemplates(data.results);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    runLocalData();
  }, []);

  // const handlePreviewClick = (template: any) => {
  //   // Ajoutez ici la logique de prévisualisation en fonction du template
  //   console.log('Preview clicked for:', template);
  // };

  const handleMouseEnter = (themeId: string) => {
    setHoveredTheme(themeId);
  };

  const handleMouseLeave = () => {
    setHoveredTheme(null);
  };
  // const handleSelectClick = (template: any) => {
  //   // Ajoutez ici la logique de sélection en fonction du template
  //   console.log('Select clicked for:', template);
  // };

  return (
    <div className="ThemeContent p-1">
      {loading ? (
        <Loading />
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-2">
          {templates?.map((template: any) => (
            <Col key={template._id}>
              <Card
                onMouseEnter={() => handleMouseEnter(template._id)}
                onMouseLeave={handleMouseLeave}
                className={`position-relative ${hoveredTheme === template._id ? 'shadow' : ''}`}
              >
                <Card.Img src={template.imageUrl} alt={template.name} />

                <Card.Body className="">
                  <Card.Title>{template.name}</Card.Title>
                  {/* Ajoutez d'autres informations si nécessaire */}
                </Card.Body>
                <div className={
                  hoveredTheme == template._id ?
                    "d-flex overlay  justify-content-center align-items-center position-absolute w-100 h-100"
                    :
                    "d-none"
                }>

                  <div className="d-flex gap-1">
                    <Link className="btn btn-success d-flex align-items-center gap-1" 
                     to={"/template/"+ currentStep?._id +"/"+tunnelId+"/editor"}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-cursor-fill" viewBox="0 0 16 16">
                        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
                      </svg>

                      Select
                    </Link>
                    <Link className="btn btn-primary d-flex align-items-center gap-1" 
                    to={"/template/"+ template?._id +"/"+tunnelId+"/show"} target='blank'>
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                      </svg>
                      Preview
                    </Link>

                    {/* <div className={`btn btn-primary me-2 ${hoveredTheme === template._id ? 'shadow-lg' : ''}`} onClick={() => handlePreviewClick(template)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                      </div> */}


                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ThemeContent;
