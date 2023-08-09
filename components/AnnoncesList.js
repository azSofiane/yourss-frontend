import React from 'react';
import { useSelector } from "react-redux";
import { useState } from 'react';
import { Row, Col, Card, Input, DatePicker, Button, Space, Modal, message } from 'antd';

const { TextArea } = Input;

function AnnoncesList() {
  const user = useSelector((state) => state.user);
  const dateFormat = 'DD/MM/YYYY';

  const [messageApi, contextHolder] = message.useMessage();
  const [modal, setModal] = useState(false);
  // const [formData, setFormData] = useState({ titre: '', date_de_creation: null, date_de_modification: null, archive: null, date_de_publication: null, date_de_debut: null, date_de_fin: null, adresse: '', code_postal: '', ville: '', description: '', profession: [] });
  const [formData, setFormData] = useState({ titre: '', date_de_creation: new Date(), date_de_publication: null, date_de_debut: null, date_de_fin: null, adresse: '', code_postal: '', ville: '', description: '', profession: [] });


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
      profession: formData.profession
    };

    fetch('http://localhost:3000/annonces/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // todo - retraiter le token :
      body: JSON.stringify(annonceData),
    }).then(response => response.json())
      .then(data => {
        console.log("données front post annonce ", data);
        if (data.result) {
          setFormData({ ...formData, titre: '', date_de_creation: new Date(), date_de_publication: null, date_de_debut: null, date_de_fin: null, adresse: '', code_postal: '', ville: '', description: '', profession: [] });

          setModal(false)

          messageApi.open({
            type: 'success',
            content: 'Annonce créé'
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
                <Card>
                  <Row gutter={[12, 12]}>
                    <Col span={24} md={12}>
                      <div>
                        Boulanger
                      </div>
                      <div>
                        Entreprise
                      </div>
                      <div>
                        Localisation : 6 place Pablo Picasso, 93160 Noisy-Le-Grand
                      </div>
                      <div>
                        confection de pain et gateaux
                      </div>
                    </Col>

                    <Col span={24} md={12} className='text-center'>
                      <div>
                        du 04/09/2023 au 08/09/2023
                      </div>
                      <div>
                        <Button size='large' >Voir l'annonce</Button>
                      </div>
                      <div>
                        <Button size='large'>Modifier</Button>
                      </div>
                      <div>
                        <Button size='large'>Archiver</Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
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
