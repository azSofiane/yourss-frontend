import styles from '@styles/Home.module.scss';
import { useState } from 'react';
import { Row, Col, Card, Input, Select, Button, Space, Modal } from 'antd';

function Home() {
  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const mdpOublie = () => {
    return <>
      <p>Veuillez renseigner votre adresse e-mail pour réinitialiser votre mot de passe</p>

      <Space direction='vertical' className='w-100 text-center' size={12}>
        <Input placeholder='Email' size='large' />
        <Button type='default' size='large' onClick={() => réinitialisationMDP()}>Valider</Button>
      </Space>
    </>
  }

  const creationCompte = () => {
    return <>
      <p>Veuillez renseigner vos informations personnelles</p>

      <Space direction='vertical' className='w-100' size={12}>
        <Row gutter={[12, 12]}>
          <Col span={12}><Input placeholder='Nom' size='large' /></Col>
          <Col span={12}><Input placeholder='Prénom' size='large' /></Col>
          <Col span={24}><Input placeholder='Email' size='large' /></Col>
          <Col span={24}><Input.Password placeholder='Mot de passe' size='large' /></Col>
          <Col span={24}>
            <Select placeholder='Fonction' className='w-100' size='large'>
              <Option value="true">Eleve</Option>
              <Option value="false">Professionnel</Option>
            </Select>
          </Col>
          <Col span={24} className='text-center'><Button type='default' size='large' onClick={() => réinitialisationMDP()}>Valider</Button></Col>
        </Row>
      </Space>
    </>
  }

  const clickModalOpen = (data) => {
    setModal(true)
    setModalOpen(data)
  }

  const réinitialisationMDP = () => {
    setModal(false)
  }

  return (
    <>
      <main>
       <section className={styles.section_connection}>
        <div className='container'>
          <Row gutter={[16, 16]}>
            <Col span={24} md={12} className={styles.wrapCenter}>
              <img src='img/logo.svg' alt='logo yours' className={styles.logo} />
            </Col>

            <Col span={24} md={12} className={styles.wrapCenter}>
              <Card className={styles.wrapConnection}>
                <Space size={24} direction='vertical' className='w-100'>
                  <Space direction='vertical' className='w-100 text-center'>
                    <Input placeholder='Email' size='large'/>
                    <Input placeholder='Mot de passe' size='large'/>

                    <Button type='default' size='large' className='w-100'>Se connecter</Button>
                    <Button type='link' onClick={ () => clickModalOpen(true)}>Mot de passe oublié ?</Button>
                  </Space>

                  <Space direction='vertical' className='w-100 text-center'>
                    <Button type='success' size='large' onClick={ () => clickModalOpen(false)}>Créer un compte</Button>
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
       </section>
      </main>

      <Modal footer={null} centered open={modal} onCancel={() => setModal(false)} wrapClassName={styles.modal} title={modalOpen ? 'Réinitialisation mot de passe' : 'Créer un compte'}>{ modalOpen ? mdpOublie() : creationCompte() }</Modal>
    </>
  )
}

export default Home
