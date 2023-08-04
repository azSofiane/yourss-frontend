import React from "react";
import { Avatar, Button, Card, Col, Input, Row, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

function candidaturesEleves() {

  return(
    <>
      <div className="container">
        <Space direction="vertical" className="w-100" size={12}>
          <Col span={24}>
            <Col span={24}>Candidatures</Col>
            <Col span={24}>
              <Input placeholder="Filtrer par : " size=""></Input>
            </Col>

            {/* Card candidatures coté élève */}
            <Card>
              <Row gutter={[12, 12]}>
                <Col span={24} md={4}>
                  <div>
                    <Avatar alt='Avatar' size={100}>
                    </Avatar>
                  </div>
                </Col>

                <Col span={24} md={10}>
                  <div>
                    Boulanger
                  </div>
                  <div>
                    Noisy pain chaud
                  </div>
                  <div>
                    Noisy le Grand
                  </div>
                </Col>

                <Col span={24} md={10}>
                <div>
                    <FontAwesomeIcon icon={faStar} style={{color: "lightgrey"}}/>
                    Status en cours
                  </div>
                  <div>
                    Du 10/09/2023 au 14/09/2023
                  </div>
                  <div>
                    <Button>
                      Voir l'annonce
                    </Button>
                  </div>
                  <div>
                    Date candidature : 14/08/2023
                  </div>               
                </Col>

                <Col span={24}>
                  <div>
                  Description Rapide: lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem              
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Card candidatures coté Pro */}
            <Card>
              <Row gutter={[12, 12]}>
                <Col span={24} md={4}>
                  <div>
                    <Avatar alt='Avatar' size={100}>
                    </Avatar>
                  </div>
                </Col>

                <Col span={24} md={10}>
                  <div>
                    Mohammed
                  </div>
                  <div>
                    Ali
                  </div>
                  <div>
                    Butterfly
                  </div>
                </Col>

                <Col span={24} md={10}>
                  <div>
                    <FontAwesomeIcon icon={faStar} style={{color: "lightgrey"}}/>
                    Stage accepté
                  </div>
                  <div>
                    Du 10/09/2023 au 14/09/2023
                  </div>
                  <div>
                    Date candidature : 14/08/2023
                  </div>                 
                  <div>
                    <Button>
                      Contacter
                    </Button>
                  </div>
                  <div>
                    <Button>
                      Accepter
                    </Button>
                  </div>
                  <div>
                    <Button>
                      Refuser
                    </Button>
                  </div>
                </Col>

                <Col span={24}>
                  <div>
                  Description Rapide: lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem              
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Space>
      </div>
    </>
  )
}

export default candidaturesEleves;