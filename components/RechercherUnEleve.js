import React from 'react';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Input, Button, Space, DatePicker, Avatar, Empty, message } from 'antd';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMagnifyingGlass, faLocationDot, faCalendar, faAngleRight, faUser } from '@fortawesome/free-solid-svg-icons';
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
      console.log("useeffect ",data);
      // ajouter les elèves de la bdd dans le tableau annonceData
      if (data.result) setElevesData(data.eleve)
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
    // || data.mot_cle.toLowerCase().includes(recherche) 
    || data.motivation.toLowerCase().includes(recherche) 
    // || data.ma_recherche_de_stage.toLowerCase().includes(recherche) 
    || data.etablissement.toLowerCase().includes(recherche);
  }).map((data, i) => {
   
    const tokenEleve = data.token;
    
    return <div className="container" key={i}>
      <Space direction="vertical" className="w-100" size={12}>
        <Col span={24}>
          <Card>
            <Row gutter={[12, 12]}>
              <Col span={7} md={3} className="d-flex align-items-center">
                <Avatar src={<img src={data.photos} alt="avatar"/>} size={100}/>
              </Col>

              <Col span={17} md={13} className="d-flex align-items-center">
                <div>
                  <div className="fw-bold">{data.nom} {data.prenom}</div>

                    {
                      // (data.code_postal && data.ville) &&
                        <div className="opacity-50 text-small">
                          <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                          <span className="me-2">{data.code_postal}</span>
                          <span>{data.ville}</span>
                        </div>
                    }
                    {
                      <div className="opacity-50 text-small">
                        <FontAwesomeIcon icon={faCalendar} className="me-2" />
                        <span>{dayjs(data.date_de_debut).format(dateFormat)}</span> <FontAwesomeIcon icon={faAngleRight} className="mx-1" /> <span>{dayjs(data.date_de_fin).format(dateFormat)}</span>
                      </div>
                    }
                </div>
              </Col>

              <Col span={24} md={8} className="d-flex align-items-center justify-content-center justify-content-md-end">
                  <Link href={/profil/+tokenEleve}>
                    <Button
                      type="default"
                      size="large"
                      className="mx-2"
                    >
                      Voir profil
                    </Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Space>
    </div>
  });


//   // à mettre en place :

//   <Col span={17} md={13} className="d-flex align-items-center">
//     <div>
//       <div className="fw-bold">{data.nom} {data.prenom}</div>

//       {
//         (data.code_postal && data.ville) &&
//           <div className="opacity-50 text-small">
//             <FontAwesomeIcon icon={faLocationDot} className="me-2" />
//             <span className="me-2">{data.code_postal}</span>
//             <span>{data.ville}</span>
//           </div>
//       }
//       {
//           <div className="opacity-50 text-small">
//             <FontAwesomeIcon icon={faCalendar} className="me-2" />
//             <span>{dayjs(data.date_de_debut).format(dateFormat)}</span> <FontAwesomeIcon icon={faAngleRight} className="mx-1" /> <span>{dayjs(data.date_de_fin).format(dateFormat)}</span>
//           </div>
//       }
//     </div>
//   </Col>

//   <Col span={24} md={8} className="d-flex align-items-center justify-content-center justify-content-md-end">
//     {
//       eleve[i].statut === 'en cours' ?
//         <>
//           <Button type="danger" size="large" className="m-1" onClick={() => postulerChoix('refuser', eleve[i].eleve)}>Refuser</Button>
//           <Button type="default" size="large" className="m-1" onClick={() => postulerChoix('accepter', eleve[i].eleve)}>Accepter</Button>
//         </>
//       :
//         eleve[i].statut === 'refuser' ?
//           <span className="mx-3 text-danger fw-bold">Profil refusé</span>
//         :
//           <span className="mx-3 text-success fw-bold">Profil accépté</span>
//     }
//     <Link href={'/profil/' + eleve[i].eleve}>
//       <Button type="default" size="large" className="m-1">
//         <FontAwesomeIcon icon={faEye} />
//       </Button>
//     </Link>
//   </Col>
// </Row>


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