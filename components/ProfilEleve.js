import { Row, Col, Card, Input, Select, Button, Space, Modal,DatePicker,Avatar } from 'antd';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

function ProfilEleve() {
  
  // const [formData, setFormData] = useState({
  //   nom: '',
  //   prenom: '',
  //   etablissement: '',
  //   classe: '',
  //   date de début: '',
  //    date de fin:'',
  // });
  
  const modifier = true;

  // const dur = false;

//   if(modifier)
//   {
// return (
//     <>
//       <main>
//         <div className='container'>
//           <Space direction='vertical' className='w-100' size={12}>
//               <Row gutter={[12, 12]}>
//                 <Col span={24} className='text-end'>
//                   <Button type='default' size='default'>{ modifier ? 'Sauvegarder' : 'Editer' }</Button>
//                 </Col>

//                 <Col span={24} >
//                   <Card>
//                     <Row gutter={[12, 12]}>
//                       <Avatar src={<img src={"https://media.threatpost.com/wp-content/uploads/sites/103/2019/09/26105755/fish-1.jpg"} alt="avatar" />} size={100}/>
//                       <Col span={24} md={4}></Col>

//                       <Col span={24} md={9}>
//                         { modifier ? <Input placeholder='Etablissement' size='large'/> : 'College Edwin de Paris'}
//                         <Input placeholder='Classe' size='large'/>
//                         { modifier ? <Input placeholder='Etablissement' size='large'/> : 'College Edwin de Paris'}
//                       </Col>
                    
//                       <Col span={24} md={8}>
//                         <h2>Date de stage</h2>
//                         <RangePicker/>
//                         <FontAwesomeIcon icon={faStar} style={{color: "#ead02a",}} />
//                       </Col>
//                     </Row>
                    
//                   </Card>
//                 </Col>

//                 <Col span ={24}>
//                   <Card>
//                     <h2>Mon Stage de rêve</h2>
//                           { modifier ? <TextArea rows={6}  placeholder='Bonjour, je recherche un stage..' size='large'/> : 'College Edwin de Paris'}
                        
//                   </Card>
//                 </Col>

//                 <Col span ={24} md={12}>
//                   <Card>
//                     <h2>Présentation</h2>
//                           { modifier ? <TextArea rows={6} placeholder=' Bonjour, je suis très intérressé par le domaine du ...' size='large'/> : 'College Edwin de Paris'}
//                   </Card>
//                 </Col>

//                 <Col span ={24} md={12}>
//                   <Card>
//                     <h2>Motivation</h2>
//                           { modifier ? <TextArea rows={6} placeholder='Je suis particulièrement intérressé par votre ...' size='large'/> : 'College Edwin de Paris'}
//                   </Card>
//                 </Col>
//               </Row>
//             </Space>
//           </div>
//         </main>
//       </>
//     )
//   }

  // else if(dur){
    return (
    <>
      <main>
        <div className='container'>
          <Space direction='vertical' className='w-100' size={12}>
              <Row gutter={[12, 12]}>
                <Col span={24} className='text-end'>
                  <Button type='default' size='default'>{ modifier ? 'Sauvegarder' : 'Sauvegarder' }</Button>
                </Col>

                <Col span={24} >
                  <Card>
                    <Row gutter={[12, 12]}>
                      <Avatar src={<img src={"https://media.threatpost.com/wp-content/uploads/sites/103/2019/09/26105755/fish-1.jpg"} alt="avatar" />} size={100}/>
                      <Col span={24} md={4}></Col>

                      <Col span={24} md={9}>
                        { modifier ? <Input placeholder='Etablissement' size='large'/> : 'College Edwin de Paris'}
                        <Input placeholder='Classe' size='large'/>
                        { modifier ? <Input placeholder='Etablissement' size='large'/> : 'College Edwin de Paris'}
                      </Col>
                    
                      <Col span={24} md={8}>
                        <h2>Date de stage</h2>
                        <RangePicker/>
                        <FontAwesomeIcon icon={faStar} style={{color: "#ead02a",}} />
                      </Col>
                    </Row>
                    
                  </Card>
                </Col>

                <Col span ={24}>
                  <Card>
                    <h2>Mon Stage de rêve</h2>
                          { modifier ? <TextArea rows={6}  placeholder='Bonjour, je recherche un stage..' size='large'/> : 'College Edwin de Paris'}
                        
                  </Card>
                </Col>

                <Col span ={24} md={12}>
                  <Card>
                    <h2>Présentation</h2>
                          { modifier ? <TextArea rows={6} placeholder=' Bonjour, je suis très intérressé par le domaine du ...' size='large'/> : 'College Edwin de Paris'}
                  </Card>
                </Col>

                <Col span ={24} md={12}>
                  <Card>
                    <h2>Motivation</h2>
                          { modifier ? <TextArea rows={6} placeholder='Je suis particulièrement intérressé par votre ...' size='large'/> : 'College Edwin de Paris'}
                  </Card>
                </Col>
              </Row>
            </Space>
          </div>
        </main>
      </>
    )
  // }
  // else {
  //   return null;
  // }
 
}
 

export default ProfilEleve;
