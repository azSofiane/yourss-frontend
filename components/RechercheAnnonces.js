import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Input, Button, Space, DatePicker, Avatar, Empty, message } from 'antd';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserGraduate, faSchool, faAngleRight } from '@fortawesome/free-solid-svg-icons';


function RechercheAnnonces () {

  const [annoncesData, setAnnoncesData] = useState([]);

  const dateFormat = 'DD/MM/YYYY';

  // use Effect pour récupérer toutes les annonces de la base de donnée
  useEffect(() => {
    fetch('http://localhost:3000/elevesRecherche')
    .then(response => response.json())
    .then(data => {
      // ajouter les annonces de la bdd dans le tableau annonceData
      setAnnoncesData(data.annonce)
    })
  }
  , []);

  const detailsAnnonce = () => {

  } 

 
  // map sur les annonces et créer une card par annonce 
  const Annonces = annoncesData.map((data, i) => {
    
    return <div className="container">
    <Space direction="vertical" className="w-100" size={12}>
      <Col span={24}>
        <Card>
          <Row gutter={[12, 12]}>
            <Col span={24} md={4}>
              <div>
                <Avatar alt='Avatar' size={100} 
                src='tesla-logo-tesla.webp'
                >
                </Avatar>
              </div>
            </Col>

            <Col span={24} md={10}>
              <div>
                {data.titre}
              </div>
              <div>
                Canal+
              </div>
              <div>
                {data.ville}
              </div>
            </Col>

            <Col span={24} md={10}>
              <div>
                { data.date_de_debut  && <span className='me-1'>du {dayjs(data.date_de_debut).format(dateFormat)}</span> } 
                { data.date_de_fin && <span>au {dayjs(data.date_de_fin).format(dateFormat)}</span> }
              </div>
              <div>
                <Button onClick={ () => { detailsAnnonce() } }>
                  Voir l'annonce
                </Button>
              </div>
              <div>
                <FontAwesomeIcon icon={faStar} style={{color: "lightgrey"}} />
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Space>
  </div>
  });

  return(
    <>
      <div className="container">
        <Space direction="vertical" className="w-100" size={12}>
          <Col span={24}>
            <Col span={24}>Liste des annonces :</Col>
              {Annonces}
          </Col>
        </Space>
      </div>
    </>
  )
}


export default RechercheAnnonces;