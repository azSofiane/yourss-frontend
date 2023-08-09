import React from 'react';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Input, Button, Space, DatePicker, Avatar, Empty, message } from 'antd';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMagnifyingGlass, faSchool, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


function RechercheAnnonces () {
  const [annoncesData, setAnnoncesData] = useState([]);
  const [recherche, setRecherche] = useState ('');
  const dateFormat = 'DD/MM/YYYY';


  // use Effect pour récupérer toutes les annonces de la base de donnée
  useEffect(() => {
    fetch('http://localhost:3000/eleves/recherche/annonce')
    .then(response => response.json())
    .then(data => {
      // ajouter les annonces de la bdd dans le tableau annonceData
      setAnnoncesData(data.annonce)
    })
  }
  , []);

 
  // map sur les annonces et créer une card par annonce 
  const Annonces = annoncesData.filter((data) => { 
    return recherche.toLowerCase() === '' 
    ? data 
    : data.titre.toLowerCase().includes(recherche) || data.ville.toLowerCase().includes(recherche) ;
  }).map((data, i) => {
    
    const idAnnonce = data._id;

    return <div className="container" key={i}>
    <Space direction="vertical" className="w-100" size={12}>
      <Col span={24}>
        <Card>
          <Row gutter={[12, 12]}>
            <Col span={24} md={4}>
              <div>
                <Avatar alt='Avatar' size={100} src='tesla-logo-tesla.webp'/>
              </div>
            </Col>

            <Col span={24} md={10}>
              <div>
                {data.titre}
              </div>
              <div>
                Tesla
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
              <Link href={/annonce/+idAnnonce}>
                <Button
                  type="default"
                  size="large"
                  className="mx-2"
                  >
                  Voir l'annonce
                </Button>
              </Link>
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
            <Col span={24}>
              <Input 
                placeholder={'Rechercher un stage'} 
                suffix={<FontAwesomeIcon icon={faMagnifyingGlass} />} 
                // className={styles.input_seach} 
                onChange={(e) => setRecherche(e.target.value)
                }
                />
              Liste des annonces :
            </Col>
              {Annonces}
          </Col>
        </Space>
      </div>
    </>
  )
}


export default RechercheAnnonces;