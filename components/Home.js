import styles from '@styles/Home.module.scss';
import { Row, Col, Card, Input, Button, Space, Modal } from 'antd';

function Home() {
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
                    <Button type='link'>Mot de passe oublié ?</Button>
                  </Space>
                  
                  <Space direction='vertical' className='w-100 text-center'>
                    <Button type='success' size='large'>Créer un compte</Button>
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
    </>
  )
}

export default Home
