import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Row, Col, Card, Avatar, DatePicker, Input, Select, Button, Space, Modal } from "antd";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTag, faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const { TextArea } = Input;

function Annonce({ props }) {
  const user = useSelector((state) => state.user);

  const dateFormat = 'DD/MM/YYYY';

  const [editAnnonce, setIsEditAnnonce] = useState(false);
  const [formData, setFormData] = useState({ titre: '', date_de_creation: null, date_de_modification: null, archive: null, date_de_publication: null, date_de_debut: null, date_de_fin: null, adresse: '', code_postal: '', ville: '', description: '', profession: [] });
  const [formDataPreview, setFormDataPreview] = useState({});

  const editAnnnonceClick = () => {
    setIsEditAnnonce(true);
  };

  const saveAnnonceClick = () => {
    // if(!user.token) return;

    // setFormData({ ...formDataPreview });

		// fetch('http://localhost:3000/professionnels/edit/' + user.token, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...formDataPreview })
    // }).then(response => response.json())
    // .then(data => {
    //   if (data.result) {
    //     messageApi.open({
    //       type: 'success',
    //       content: data.message
    //     });
    //   } else {
    //     messageApi.open({
    //       type: 'warning',
    //       content: data.message
    //     });
    //   }
    // });

    setIsEditAnnonce(false);
  };

  const cancelAnnonceClick = () => {
    setIsEditAnnonce(false);
    setFormData({ ...formData });
  };

  const HandleArchiverAnnonce = () => {
    fetch('http://localhost:3000/annonces/archive', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archive: formData.archive })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("annonce.js  fetch", data);
        // Si la connnexion est réussie et que le backend renvoie un token
        // if (data.result)
      });
  };

  console.log({...props})


  useEffect(() => {
    // setFormData({ ...props });
    // setFormDataPreview({ ...formData });
  }, [formData]);

  return (
    <main>
      <div className="container">
        <Space direction="vertical" className="w-100" size={12}>
          <Row gutter={[12, 12]}>
            {
              // partie card pour les éléves
              user.fonction === 'true' &&
                <>
                  <Col span={24}>
                    <Card>
                      <Row gutter={[12, 12]}>
                        <Col span={24} md={4}>
                          <Avatar src={<img src={"https://cdn.britannica.com/01/236601-050-2CFDF711/Julia-Roberts-2019.jpg"} alt="Photo de profile" />} size={100} />
                        </Col>

                        <Col span={24} md={10}>
                          <div>Poste</div>
                          <div>Entreprise</div>
                          <div>Localisation</div>
                        </Col>

                        <Col span={24} md={10}>
                          <div>Date du stage</div>
                          <div><FontAwesomeIcon icon={faStar} size={50} style={{ color: "#f2e12c" }} /></div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  <Col span={24}>
                    <div className="d-flex justify-content-end align-items-center">
                      <span>Postulé</span>
                      <Button
                        type="default"
                        size="large"
                        className="mx-2"
                        onClick={() => fonctionachanger()}
                      >
                        Postuler
                      </Button>
                      <Button
                        type="default"
                        size="large"
                        className="mx-2"
                        onClick={() => fonctionachanger()}
                      >
                        Contacter le professionnel
                      </Button>
                    </div>
                  </Col>
                </>
            }



            {
              // partie édition, uniquement pour les professionnelles

              user.fonction === 'false' &&
                <>
                  <Col span={24}>
                    <div className="d-flex justify-content-end align-items-center">
                      {
                        <>
                          { editAnnonce && <Button type='danger' size='large' className='mx-2' onClick={() => cancelAnnonceClick()}>Annuler</Button> }

                          <Button type='default' size='large' onClick={() => {editAnnonce ? saveAnnonceClick() : editAnnnonceClick()}}>{ editAnnonce ? 'Sauvegarder' : 'Editer' }</Button>
                        </>
                      }

                      <Button type="default" size="large" className="d-none" onClick={() => HandleArchiverAnnonce()}>Archiver</Button>
                    </div>
                  </Col>
                </>
            }



            {
              // partie affichage des elements
            }
            <Col span={24}>
              <Card>
                <Row gutter={[12, 12]}>
                  {
                    editAnnonce && user.fonction === 'false' &&
                      <>
                        <Col span={24}>
                          <Input placeholder="Titre" size="large" onChange={(e) => setFormDataPreview({ ...formDataPreview, titre: e.target.value })} value={formData.titre} />
                        </Col>
                        <Col span={24}>
                          <DatePicker
                            placeholder="Date de publication"
                            size="large"
                            className="w-100"
                            format={dateFormat}
                            onChange={(e) => setFormDataPreview({ ...formDataPreview, date_de_publication: e })}
                            value={formData.date_de_publication}
                          />
                        </Col>
                        <Col span={12}>
                          <DatePicker
                            placeholder="Date de début"
                            format={dateFormat}
                            size="large"
                            className="w-100"
                            onChange={(e) => setFormDataPreview({ ...formDataPreview, date_de_debut: e })}
                            value={formData.date_de_debut}
                          />
                        </Col>
                        <Col span={12}>
                          <DatePicker
                            placeholder="Date de fin"
                            format={dateFormat}
                            size="large"
                            className="w-100"
                            onChange={(e) => setFormDataPreview({ ...formDataPreview, date_de_fin: e })}
                            value={formData.date_de_fin}
                          />
                        </Col>
                        <Col span={24}>
                          <Input
                            placeholder="Adresse"
                            size="large"
                            onChange={(e) => setFormDataPreview({ ...formDataPreview, adresse: e.target.value })}
                            value={formData.adresse}
                          />
                        </Col>
                        <Col span={12}>
                          <Input
                            placeholder="Code postal"
                            size="large"
                            onChange={(e) => setFormDataPreview({ ...formDataPreview, code_postal: e.target.value })}
                            value={formData.code_postal}
                          />
                        </Col>
                        <Col span={12}>
                          <Input
                            placeholder="Ville"
                            size="large"
                            onChange={(e) => setFormDataPreview({ ...formDataPreview, ville: e.target.value })}
                            value={formData.ville}
                          />
                        </Col>
                        <Col span={24}>
                          <TextArea
                            rows={6}
                            placeholder="Description du stage"
                            onChange={(e) => setFormDataPreview({ ...formDataPreview, description: e.target.value })}
                            value={formData.description}
                          />
                        </Col>
                        <Col span={24}>
                          <Input
                            placeholder="Mots clé profession"
                            size="large"
                            onChange={(e) => setFormDataPreview({ ...formDataPreview, profession: e.target.value })}
                            value={formData.profession}
                          />
                        </Col>
                      </>
                  }

                  {
                    !editAnnonce &&
                      <>
                        <Col span={24}>
                          <div className="d-flex align-items-center justify-content-between">
                            <h2 className="mb-0">{ props.titre }</h2>
                            <small className="text-disabled"><FontAwesomeIcon icon={faCalendar} className="me-2" /> { dayjs(props.date_de_creation).format(dateFormat) }</small>
                          </div>
                        </Col>
                        {
                          props.date_de_publication && user.fonction === 'false' &&
                            <Col span={24}>
                              <>
                                Sera publiée le : { dayjs(props.date_de_publication).format(dateFormat) }
                              </>
                            </Col>
                        }
                        {
                          props.date_de_debut || props.date_de_fin &&
                            <Col span={24}>
                              { props.date_de_debut && dayjs(props.date_de_debut).format(dateFormat) }
                              { props.date_de_fin && dayjs(props.date_de_fin).format(dateFormat) }
                            </Col>
                        }
                        <Col span={24}>
                          <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                          { props.adresse && <span className="me-1">{props.adresse},</span> }
                          <span className="me-1">{props.code_postal}</span> <span>{props.ville}</span>
                        </Col>
                        <Col span={24}>
                          { props.description }
                        </Col>
                        {
                          props.profession &&
                            <Col span={24}>
                              <FontAwesomeIcon icon={faTag} className="me-2 vertical-align-middle" /> {props.profession}
                            </Col>
                        }
                      </>
                  }
                </Row>
              </Card>
            </Col>
          </Row>
        </Space>
      </div>
    </main>
  );
}

export default Annonce;
