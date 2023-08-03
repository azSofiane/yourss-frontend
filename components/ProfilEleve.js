import { Row, Col, Card, Input, Select, Button, Space, Modal,DatePicker,Avatar } from 'antd';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

function ProfilEleve() {
  
  const modifier = true;

    return (
        <>
          <main>
            <div className='container'>
              <Space direction='vertical' className='w-100' size={12}>
                  <Row gutter={[12, 12]}>
                   
                    {/* condition pour  pour changement de page : avec modification du nom du button , champ de saisie input vers => texte visible en dur  */}
                    <Col span={24} className='text-end'>
                      <Button type='default' size='default'>{ modifier ? 'Sauvegarder' : 'Editer' }</Button>
                      <FontAwesomeIcon icon={faStar} style={{color: "#ead02a",}}/>
                    </Col>

                    <Col span={24} >
                      <Card>
                        <Row gutter={[12, 12]}>
                           {modifier ?<Avatar src={<img src={"https://media.threatpost.com/wp-content/uploads/sites/103/2019/09/26105755/fish-1.jpg"} alt="avatar" />} size={100}/> : <Avatar src={<img src={""} alt="avatar"/>}/>}
                          <Col span={24} md={4}></Col>

                          {/* condition pour changement de page de: champ de saisie "identité" input vers => texte visible en dur  */}
                          <Col span={24} md={9}>
                            { modifier ? <Input placeholder='Nom' size='large'/> : 'Gaudelet'}
                            { modifier ? <Input placeholder='Prénom' size='large'/> : 'Edwin'}
                            { modifier ? <Input placeholder='Etablissement' size='large'/> : 'Collège Jean Monnet'}
                            { modifier ? <Input placeholder='Classe' size='large'/> : '3ème'}
                          </Col>
                        
                         {/* condition pour changement de page de: champ de saisie "date de stage" calendrier vers => texte visible en dur  */}
                          <Col span={24} md={8}>
                            <h2>Date de stage</h2>
                            { modifier ? <RangePicker /> : 'date de début :' +'   '+ 'date de fin :' }
                          </Col>
                        </Row>
                        
                      </Card>
                    </Col>

                     {/* CARD POUR LA PRESENTATION DE L ELEVE */}
                    <Col span ={24} md={12}>
                      <Card>
                        <h2>Présentation</h2>
                              {/* condition pour changement de page de: champ de saisie "PRESENTATION" input vers => texte visible en dur  */}
                              { modifier ? <TextArea rows={6} placeholder=' Bonjour, je suis très intérressé par le domaine du ...' size='large'/> : 'Je m/appelle Edwin, je suis très interressé par ...'}
                      </Card>
                    </Col>

                      {/* CARD POUR LA MOTIVATION DE L ELEVE */}
                    <Col span ={24} md={12}>
                      <Card>
                        <h2>Motivation</h2>
                              {/* condition pour changement de page de: champ de saisie "MOTIVATION" input vers => texte visible en dur  */}    
                              { modifier ? <TextArea rows={6} placeholder='Je suis particulièrement intérressé par votre ...' size='large'/> : 'J/adore le sport '}
                      </Card>
                    </Col>
                    {/* CARD POUR LA MOTIVATION DE L ELEVE */}
                    <Col span ={24}>
                      <Card>
                        <h2>Mon Stage de rêve</h2>
                              {/* condition pour changement de page de: champ de saisie "MON STAGE DE REVE" input vers => texte visible en dur  */}
                              { modifier ? <TextArea rows={6}  placeholder='Bonjour, je recherche un stage..' size='large'/> : 'College Edwin de Paris'}
                      </Card>
                    </Col>

                  </Row>
                </Space>
              </div>
            </main>
          </>
        )
      }
 

export default ProfilEleve;
