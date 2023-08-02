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

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function Annonce() {
  const test = true;

  return (
    <>
      <main>
        <div className="container">
          <Space direction="vertical" className="w-100" size={12}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Card>
                  <Row gutter={[12, 12]}>
                    <Col span={24} md={4}>
                      
                    </Col>

                    <Col span={24} md={10}>
                      {/* mettre du text */}
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

              <Col span={24}>
                {/* boutton eleve  et text*/}
                <div className="d-flex justify-content-end align-items-center">
                  <span>Postulé</span>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Postuler</Button>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Contacter le professionnel</Button>
                </div>
              </Col>

              {/* 3 boutton pour le professionnel editer archiver et sauvgarder */}
              <Col span={24}>
                <div className="d-flex justify-content-end align-items-center">
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Editer</Button>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Archiver</Button>
                  <Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Sauvegarder</Button>
                </div>
              </Col>
              {/* remplire l'annonce */}
              <Col span={24}>
                <Card>
                  <Row gutter={[12, 12]}>
                    <Col span={24}>{ test ? <Input placeholder="Titre" size="large" /> : 'Titre' }</Col>
                    <Col span={24} size="large"  ><RangePicker size="large"/></Col>
                    <Col span={24}>{ test ? <Input placeholder="Poste" size="large" /> : 'Localisation' }</Col>
                    <Col span={24}>{ test ? <Input placeholder="Entreprise" size="large" /> : 'Profession' }</Col>
                    <Col span={24}> <TextArea rows={12} placeholder="Description du stage"/></Col>
                    <Col span={24}><Button type='default' size='large' className='mx-2' onClick={() => fonctionachanger()}>Valider</Button></Col>
                    <Col span={24}></Col>
                    <Col span={24}></Col>
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
