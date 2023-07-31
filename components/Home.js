import styles from '@styles/Home.module.scss';
import { useState } from 'react';
import { Row, Col, Card, Input, Button, Space, Modal } from 'antd';

function Home() {
  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const mdpOublie = () => {
    return <>
    </>
  }

  const creationCompte = () => {
    return <>
    Lahrim
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
                    <Button type='default' size='large'>Se connecter</Button>
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
       <section className='section-'></section>
       <section className='section-'></section>
      </main>
      
        <Modal footer={null} centered open={modal} onCancel={() => setModal(false)} wrapClassName={styles.modal } 
        title="Réinitialisation mot de passe"
        >
        <Space direction='vertical' className='w-100 text-center' size={12}>
          <p>Veuillez renseigner votre adresse e-mail pour réinitialiser votre mot de passe</p>
          <Input placeholder='Email'></Input>
          <Button type='default' size='large' onClick={ () => réinitialisationMDP()} >Valider</Button>
          { modalOpen ? mdpOublie() : creationCompte() }
        </Space>
        </Modal>

        {/* <Modal footer={null} centered open={modal} onCancel={() => setModal(false)} wrapClassName={styles.modal } 
        title="Créer un compte"
        >
        <Space direction='vertical' className='w-100 text-center' size={12}>
          <p>Veuillez renseigner vos information personnelle</p>
          <Input placeholder='Nom'></Input>
          <Input placeholder='Prénom'></Input>
          <Input placeholder='Email'></Input>
          <Input placeholder='Mot de passe'></Input>
          <Button type='default' size='large' onClick={ () => réinitialisationMDP()} >Valider</Button>
          { modalOpen ? mdpOublie() : creationCompte() }
        </Space>
        </Modal> */}
    </>
  )
}

export default Home
