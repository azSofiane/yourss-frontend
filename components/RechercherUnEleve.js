import React from 'react';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Input, Button, Space, DatePicker, Avatar, Empty, message } from 'antd';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMagnifyingGlass, faBriefcase, faCity, faUserDoctor, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


function RechercherUnEleve () {
  const user = useSelector((state) => state.user);
  const [elevesData, setElevesData] = useState([]);
  const [recherche, setRecherche] = useState ('');
  const dateFormat = 'DD/MM/YYYY';

   
  // use Effect pour récupérer tous les élèves de la base de donnée au chargement du composant
  useEffect(() => {
    fetch('http://localhost:3000/professionnels/recherche/eleves/'+ user.token)
    .then(response => response.json())
    .then(data => {

      // ajouter les elèves de la bdd dans le tableau annonceData
      setElevesData(data.eleve)
    })
  }
  , []);

 
  // map sur les elèves et créer une card par elève 
  const Eleves = elevesData.filter((data) => { 
    return recherche.toLowerCase() === '' 
    ? data 
    : data.nom.toLowerCase().includes(recherche) 
    || data.prenom.toLowerCase().includes(recherche) 
    || data.ville.toLowerCase().includes(recherche) 
    || data.motivation.toLowerCase().includes(recherche) 
    || data.etablissement.toLowerCase().includes(recherche);
  }).map((data, i) => {
   
    const idEleve = data._id;
    
    return <div className="container" key={i}>
    <Space direction="vertical" className="w-100" size={12}>
      <Col span={24}>
        <Card>
          <Row gutter={[12, 12]}>
            <Col span={24} md={4}>
              <div>
                <Avatar alt='Avatar' size={100} src={data.photo}/>
              </div>
            </Col>

            <Col span={24} md={10}>
              <div>
              <FontAwesomeIcon 
                icon={faUser} 
                style={{color: "black"}} 
                className='me-2'
              />
                {data.nom} {data.prenom}
              </div>
              <div>
              <FontAwesomeIcon 
                icon={faCity}
                style={{color: "black"}} 
                className='me-2'
              />
               {data.ville}
              </div>
              <div>
                <FontAwesomeIcon 
                icon={faBriefcase}
                style={{color: "black"}} 
                className='me-2'
                />
                {data.motivation}
              </div>
            </Col>

            <Col span={24} md={10}>
              <div>
                { data.date_de_debut  && <span className='me-1'>du {dayjs(data.date_de_debut).format(dateFormat)}</span> } 
                { data.date_de_fin && <span>au {dayjs(data.date_de_fin).format(dateFormat)}</span> }
              </div>
              <div>
                {/* todo  pas possi-ble de consulter le profil de l'élève ? */}
              {/* todo - nettoyer le code */}
              <Link href={/profil/+idEleve}>
                <Button
                  type="default"
                  size="large"
                  className="mx-2"
                  >
                  Voir profil
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
            <Col span={24} className="ms-5">
              <Input 
                placeholder={'Rechercher un stagiaire'} 
                suffix={<FontAwesomeIcon icon={faMagnifyingGlass} />} 
                onChange={(e) => setRecherche(e.target.value)
                }
                />
              Liste des stagiaire :
            </Col>
              {Eleves}
          </Col>
        </Space>
      </div>
    </>
  )
}


export default RechercherUnEleve;