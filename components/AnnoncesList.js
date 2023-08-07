import React from 'react';
import { Button, Card, Col, Row, Space } from 'antd';
import Link from 'next/link';


function AnnoncesList() {


  return (
    <>
      <div className='container'>
        <Space direction='vertical' className='w-100' size={12} >
          <Row gutter={[12, 12]}>
            <Col span={24} className='text-end'>
              <span>Mes Annonces</span> 
              <Button size='large' className='mx-2'>Poster un annonce</Button>

            </Col>

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
    </>
  );
}

 export default AnnoncesList;
 