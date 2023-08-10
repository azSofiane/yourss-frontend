import React from 'react';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Row, Col, Card, Input, DatePicker, Button, Space, Modal, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Link from 'next/link';


const { TextArea } = Input;

function AnnoncesList() {
  const user = useSelector((state) => state.user);
  const dateFormat = 'DD/MM/YYYY';

  const [annoncesData, setAnnoncesData] = useState([]);
  const [recherche, setRecherche] = useState ('');


  const [messageApi, contextHolder] = message.useMessage();
  const [modal, setModal] = useState(false);
  // const [formData, setFormData] = useState({ titre: '', date_de_creation: null, date_de_modification: null, archive: null, date_de_publication: null, date_de_debut: null, date_de_fin: null, adresse: '', code_postal: '', ville: '', description: '', profession: [] });
  const [formData, setFormData] = useState({ titre: '', date_de_creation: new Date(), date_de_publication: null, date_de_debut: null, date_de_fin: null, adresse: '', code_postal: '', ville: '', description: '', professionnel: '', profession: [] });

    // use Effect pour récupérer toutes les annonces de la base de donnée
  useEffect(() => {
    fetch('http://localhost:3000/professionnels/mesannonces/' + user.token)
    .then(response => response.json())
    .then(data => {
      // ajouter les annonces de la bdd dans le tableau annonceData
      if(data.result) setAnnoncesData(data.annonces)
    })
  }, []);


    // map sur les annonces et créer une card par annonce
  
      const Annonces = annoncesData.filter((data) => { 
        return recherche.toLowerCase() === '' 
        ? data 
        : data.titre.toLowerCase().includes(recherche) 
        || data.ville.toLowerCase().includes(recherche) ;
      }).map((data, i) => { 
      
        const idAnnonce = data._id;

        return <div className="container" key={i}>
        <Space direction="vertical" className="w-100" size={12}>
          <Col span={24}>
            <Card key={i}>
              <Row gutter={[12, 12]}>
                <Col span={24} md={12}>
                  <div>
                    {data.titre}
                  </div>
                  <div>
                    {<span>Publié le : {dayjs(data.date_de_publication).format(dateFormat)}</span>}
                  </div>
                  <div>
                    {data.ville}
                  </div>
                  <div>
                    {data.description}
                  </div>
                </Col>

                <Col span={24} md={12} className='text-center'>
                  <div>
                    { data.date_de_debut  && <span className='me-1'>du {dayjs(data.date_de_debut).format(dateFormat)}</span> } 
                    { data.date_de_fin && <span>au {dayjs(data.date_de_fin).format(dateFormat)}</span> }
                  </div>
                  <div>
                  {/* todo - a nettoyer */}
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
                </Col>
              </Row>
            </Card>
            </Col>
        </Space>
      </div>
      });

  

      // Champs obligatoire : ['titre', 'date_de_creation', 'code_postal', 'ville', 'description', 'token' ]
      const handleCreationAnnonce = () => {
        const annonceData = {
          titre: formData.titre,
          date_de_creation: formData.date_de_creation,
          date_de_publication: formData.date_de_publication,
          date_de_debut: formData.date_de_debut,
          date_de_fin: formData.date_de_fin,
          adresse: formData.adresse,
          code_postal: formData.code_postal,
          ville: formData.ville,
          description: formData.description,
          profession: formData.profession,
          professionnel: formData.professionnel
        };


        fetch('http://localhost:3000/annonces/create/' + user.token, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // todo - retraiter le token :
          body: JSON.stringify(annonceData),
        }).then(response => response.json())
          .then(data => {
            console.log("données front post annonce ", data);
            if (data.result) {
              setFormData({ ...formData, titre: '', date_de_creation: new Date(), date_de_publication: null, date_de_debut: null, date_de_fin: null, adresse: '', code_postal: '', ville: '', description: '', profession: [], professionnel:'' });
              const nouvellesAnnonces = [...annoncesData, { ...formData }];


              setModal(false)
              setAnnoncesData(nouvellesAnnonces)
              
              messageApi.open({
                type: 'success',
                content: 'Annonce créée'
              });
            };
          });
      };
   
      // modal - creation d'annonce

      const creationAnnonce = () => {
        return <>
          <Space direction='vertical' className='w-100' size={12}>
            <Row gutter={[12, 18]}>
              <Col span={24}>
                <Input placeholder="Titre" required size="large" onChange={(e) => setFormData({...formData, titre: e.target.value})} value={formData.titre} />
              </Col>

              <Col span={24}>
                <DatePicker placeholder="Date Publication" size="large" className='w-100' format={dateFormat} onChange={(e) => setFormData({...formData, date_de_publication: e})} value={formData.date_de_publication}/>
              </Col>

              <Col span={12}>
                <DatePicker placeholder="Date Début" size="large" className='w-100' format={dateFormat} onChange={(e) => setFormData({...formData, date_de_debut: e})} value={formData.date_de_debut}/>
              </Col>

              <Col span={12}>
                <DatePicker placeholder="Date Fin" size="large" className='w-100' format={dateFormat} onChange={(e) => setFormData({...formData, date_de_fin: e})} value={formData.date_de_fin} />
              </Col>

              <Col span={24}>
                <Input placeholder="Adresse" size="large" onChange={(e) => setFormData({...formData, adresse: e.target.value})} value={formData.adresse} />
              </Col>

              <Col span={12}>
                <Input placeholder="Code postal" size="large" onChange={(e) => setFormData({...formData, code_postal: e.target.value})} value={formData.code_postal} />
              </Col>

              <Col span={12}>
                <Input placeholder="Ville" size="large" onChange={(e) => setFormData({...formData, ville: e.target.value})} value={formData.ville} />
              </Col>

              <Col span={24}>
                <TextArea rows={6} placeholder="Description du stage" onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description} />
              </Col>

              <Col span={24}>
                <Input placeholder="Mots clé profession" size="large" onChange={(e) => setFormData({...formData, profession: e.target.value})} value={formData.profession}/>
              </Col>

              <Col span={24} className='text-center'>
                <Button type='default' size='large' onClick={() => handleCreationAnnonce()}>Valider</Button>
              </Col>
            </Row>
          </Space>
        </>
      }

      return (
        <>
          <main>
            <div className='container'>
              <Space direction='vertical' className='w-100' size={12} >
                <Row gutter={[12, 12]}>
                  {
                    user.fonction === 'false' &&
                      <Col span={24} className='text-end'>
                        <Button type='default' size='large' onClick={() => setModal(true)}>Poster un annonce</Button>
                      </Col>
                  }

                  {/* Modèle de boucles pour les annonces du professionnel*/}
                  <Col span={24}>
                    <Input 
                      placeholder={'Rechercher une annonce'} 
                      suffix={<FontAwesomeIcon icon={faMagnifyingGlass} />} 
                      onChange={(e) => setRecherche(e.target.value)
                      }
                      />
                      {Annonces}
                  </Col>
                </Row>
              </Space>
            </div>
          </main>

          <Modal footer={null} centered open={modal} onCancel={() => setModal(false)} title={'Créer une annonce'}>{ creationAnnonce() }</Modal>
          {contextHolder /* messages d'information qui apparais en haut de la page après chaque intervention */ }
        </>
      );
    }
 export default AnnoncesList;
