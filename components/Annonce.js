import styles from "@styles/Model.module.scss";
import {
  Row,
  Col,
  Card,
  Avatar,
  DatePicker,
  Input,
  Select,
  Button,
  Space,
  Modal, 
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import dayjs from "dayjs";

const { TextArea } = Input;

function Annonce() {
  const test = true;
  
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

  const[creationTitre,setCreationTitre] = useState("");
  const[creationDateDebut,setCreationDateDebut] = useState("");
  const[creationDateFin,setCreationDateFin] = useState(null);
  const[creationPoste,setCreationPoste] = useState("");
  const[creationEntreprise,setCreationEntreprise] = useState("");
  const[creationDescription,setCreationDescription] = useState("");
  const[creationAdresse,setCreationAdresse] = useState("");
  const[creationCodePostal,setCreationCodePostal] = useState("");
  const[creationVille,setCreationVille] = useState("");
  const[creationDatePublication,setCreationDatePublication] = useState("");
  const [archiver, setArchiver] = useState(false);
  const[creationDateCreation, setCreationDateCreation] = useState(new Date()); // si la date a changé, permet de garder en mémoire.

  // fonction connexion utilisateur
  // Champs obligatoire : ['titre', 'date_de_creation', 'code_postal', 'ville', 'description', 'token' ]
  const handleCreationAnnonce = () => {
    fetch('http://localhost:3000/annonces/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // todo - retraiter les dates : date_de_debut:creationDateDebut, date_de_fin: creationDateFin, date_de_publication: creationDatePublication, 
      body: JSON.stringify({ archive:archiver, ville:creationVille,code_postal:creationCodePostal, adresse:creationAdresse, profession: creationPoste, entreprise:creationEntreprise,description:creationDescription }),
    }).then(response => response.json())
      .then(data => {
        // console.log(handleCreationAnnonce)
        console.log('00');
        // Si la connnexion est réussie et que le backend renvoie un token
        if (data.result) {
          // 
          setCreationTitre('');
          setCreationDateDebut(null);
          setCreationDateFin(null);
          setCreationPoste('');
          setCreationEntreprise('');
          setCreationDescription('');
          setCreationAdresse('');
          setCreationCodePostal('');
          setCreationVille('');
        }
        console.log(data)
      });
  };

  const HandleArchiverAnnonce = () => {
    fetch('http://localhost:3000/annonces/archive', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ archive:archiver }),
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        // Si la connnexion est réussie et que le backend renvoie un token
        // if (data.result)
      });
  }
  
  

  return (
    <>
      <main>
        <div className="container">
          <Space direction="vertical" className="w-100" size={12}>
            <Row gutter={[12, 12]}>
              {/* Section 1 élève non editable */}
              <Col span={24}>
                <Card>
                  <Row gutter={[12, 12]}>
                    <Col span={24} md={4}>
                    <Avatar size={100} src={<img src={"https://cdn.britannica.com/01/236601-050-2CFDF711/Julia-Roberts-2019.jpg"} alt="Photo de profile"/>}/>
                    </Col>

                    <Col span={24} md={10}>
                      <div>Poste</div>
                      <div>Entreprise</div>
                      <div>Localisation</div>
                    </Col>

                    <Col span={24} md={10}>
                      <div>Date du stage</div>
                      <br></br>
                      <div><FontAwesomeIcon size={50} icon={faStar} style={{color: "#f2e12c",}} /></div>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Section 2 eleve non éditable*/}
              <Col span={24}>
                <div className="d-flex justify-content-end align-items-center">
                  <span>Postulé</span>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Postuler</Button>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Contacter le professionnel</Button>
                </div>
              </Col>

              {/* Section 1 professionnel non éditable 
              boutton editer archiver et sauvgarder */}
              <Col span={24}>
                <div className="d-flex justify-content-end align-items-center">
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Editer</Button>
                  <Button type='default' size='large' className='mx-2' onClick={() => HandleArchiverAnnonce()}>Archiver</Button>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Sauvegarder</Button>
                </div>
              </Col>
              {/* Section page annonce champs éditable*/}
              <Col span={24}>
                <Card>
                  <Row gutter={[12, 12]}>
                    <Col span={24}>{ test ? <Input placeholder="Titre" size="large" onChange={(e) => setCreationTitre(e.target.value)} value={creationTitre}/> : 'Titre' }</Col>

                    <Col span={24}>{ test ? <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} size="large" placeholder="Date Publication" onChange={(date) => setCreationDatePublication(date)} value={creationDatePublication}/>: 'Date de publication' }</Col>

                    <Col span={24}> {test ? <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} size="large" placeholder="Date Début" onChange={(date) => setCreationDateDebut(date)} value={creationDateDebut}/> : 'Date de début'}</Col>
                      
                    <Col span={24}> {test ? <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} size="large" placeholder="Date Fin" onChange={(date) => setCreationDateFin(date)} value={creationDateFin} /> : 'Date de fin'}</Col>

                    <Col span={24}>{ test ? <Input placeholder="Poste" size="large" onChange={(e) => setCreationPoste(e.target.value)} value={creationPoste}/> : 'Profession' }</Col>

                    <Col span={24}>{ test ? <Input placeholder="Entreprise" size="large" onChange={(e) => setCreationEntreprise(e.target.value)} value={creationEntreprise} /> : 'Entreprise' }</Col>

                    <Col span={24}>{ test ? <Input placeholder="Ville" size="large" onChange={(e) => setCreationVille(e.target.value)} value={creationVille} /> : 'Ville' }</Col>

                    <Col span={24}>{ test ? <Input placeholder="Adresse" size="large" onChange={(e) => setCreationAdresse(e.target.value)} value={creationAdresse} /> : 'Adresse' }</Col>

                    <Col span={24}>{ test ? <Input placeholder="Code postal" size="large" onChange={(e) => setCreationCodePostal(e.target.value)} value={creationCodePostal} /> : 'Code postal' }</Col>

                    <Col span={24}> {test ? <TextArea rows={12} placeholder="Description du stage" onChange={(e) => setCreationDescription(e.target.value)} value={creationDescription} />: "Description du stage" } </Col>

                    <Col span={24}><Button type='default' size='large' className='mx-2' onClick={() => handleCreationAnnonce()}>Valider</Button></Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Space>
        </div>
      </main>
    </>
  );
}

export default Annonce;
