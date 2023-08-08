import React from 'react';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Input, Button, Space, DatePicker, Avatar, Empty, message } from 'antd';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserGraduate, faSchool, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


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


// function DetailsAnnonce2() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [annonceDetails, setAnnonceDetails] = useState(null);

//   useEffect(() => {
//     if (id) {
//       fetch(`http://localhost:3000/annonces/${id}`)
//         .then(response => response.json())
//         .then(data => {
//           if (data.result) {
//             setAnnonceDetails(data.annonce);
//           }
//         });
//     }
//   }, [id]);

//   return (
//     <div>
//       <h1>Détails de l'annonce</h1>
//       {annonceDetails && (
//         <div>
//           <h2>{annonceDetails.titre}</h2>
//           <p>Date de début: {dayjs(annonceDetails.date_de_debut).format('DD/MM/YYYY')}</p>
//           <p>Date de fin: {dayjs(annonceDetails.date_de_fin).format('DD/MM/YYYY')}</p>
//           <p>Description: {annonceDetails.description}</p>
//         </div>
//       )}
//     </div>
//   );
// }





  const detailsAnnonce = (id) => {
    fetch('http://localhost:3000/annonce/' + annoncesData.id)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const {
            titre,
            date_de_creation,
            date_de_modification,
            archive,
            date_de_publication,
            date_de_debut,
            date_de_fin,
            adresse,
            code_postal,
            ville,
            description,
            profession,
          } = data.annonce;

          console.log('Détails de l\'annonce:', {
            titre,
            date_de_creation,
            date_de_modification,
            archive,
            date_de_publication,
            date_de_debut,
            date_de_fin,
            adresse,
            code_postal,
            ville,
            description,
            profession,
          });

          // setFormData({ titre, date_de_creation, date_de_modification, archive, date_de_publication, date_de_debut, date_de_fin, adresse, code_postal, ville, description, profession });
        };
      });
  };
  

 
  // map sur les annonces et créer une card par annonce 
  const Annonces = annoncesData.map((data, i) => {
    
    const idAn = data._id;

    return <div className="container">
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
              <Link href={/annonce/+idAn}>
          <a>Voir l'annonce</a>
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
            <Col span={24}>Liste des annonces :</Col>
              {Annonces}
          </Col>
        </Space>
      </div>
    </>
  )
}


export default RechercheAnnonces;