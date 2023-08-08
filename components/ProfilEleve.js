import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  Space,
  DatePicker,
  Avatar,
  Empty,
  message,
} from "antd";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUserGraduate,
  faSchool,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const { TextArea } = Input;

// todo - revoir les mots cles, format des textarea

function ProfilEleve({ props }) {
  const user = useSelector((state) => state.user);

  const [messageApi, contextHolder] = message.useMessage();
  const [isToken, setIsToken] = useState(false);
  const [editProfil, setIsEditProfil] = useState(false);
  const [formData, setFormData] = useState({ ...props });
  const [formDataPreview, setFormDataPreview] = useState({ ...props });
  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    if (user.token) {
      fetch("http://localhost:3000/eleves/" + user.token)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setIsToken(true);

            const {
              nom,
              prenom,
              photos,
              date_de_naissance,
              etablissement,
              presentation,
              motivation,
              ville,
              code_postal,
              disponible,
              date_de_debut,
              date_de_fin,
              ma_recherche_de_stage,
              mot_cle,
            } = data.data;

            setFormData({
              nom,
              prenom,
              photos,
              date_de_naissance,
              etablissement,
              presentation,
              motivation,
              ville,
              code_postal,
              disponible,
              date_de_debut,
              date_de_fin,
              ma_recherche_de_stage,
              mot_cle,
            });
          }
        });
    }
  }, [user.token]);

  useEffect(() => {
    setFormDataPreview({ ...formData });
  }, [formData]);

  const editProfilClick = () => {
    setIsEditProfil(true);
  };

  const saveProfilClick = () => {
    if (!user.token) return;

    setFormData({ ...formDataPreview });

    fetch("http://localhost:3000/eleves/edit/" + user.token, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formDataPreview }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          messageApi.open({
            type: "success",
            content: data.message,
          });
          // todo - réaliser les messages de confirmation
        } else {
          messageApi.open({
            type: "warning",
            content: data.message,
          });
        }
      });

    setIsEditProfil(false);
  };

  const cancelProfilClick = () => {
    setIsEditProfil(false);
    setFormData({ ...formData });
  };

  const handleRangePickerChange = (dates) => {
    if (dates && dates.length === 2) {
      setFormDataPreview({
        ...formDataPreview,
        date_de_debut: dates[0] ? dates[0].toDate() : null,
        date_de_fin: dates[1] ? dates[1].toDate() : null,
      });
    }
  };

  return (
    <>
      <main>
        {
          contextHolder /* messages d'information qui apparais en haut de la page après chaque intervention */
        }

        <div className="container">
          <Space direction="vertical" className="w-100" size={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} className="text-end">
                {user.fonction === "true" ? (
                  <>
                    {editProfil && (
                      <Button
                        type="danger"
                        size="large"
                        className="mx-2"
                        onClick={() => cancelProfilClick()}
                      >
                        Annuler
                      </Button>
                    )}

                    <Button
                      type="default"
                      size="large"
                      onClick={() => {
                        editProfil ? saveProfilClick() : editProfilClick();
                      }}
                    >
                      {editProfil ? "Sauvegarder" : "Editer"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="default" size="large" className="me-2">
                      Contacter
                    </Button>
                    <FontAwesomeIcon icon={faStar} />
                  </>
                )}
              </Col>

              <Col span={24}>
                <Card className="card-profil">
                  <Row gutter={[12, 12]}>
                    <Col
                      span={24}
                      md={4}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Avatar
                        src={
                          <img
                            src={
                              "https://www.photo-identite-bordeaux.fr/wp-content/uploads/2020/10/Enfant-04-2.jpg"
                            }
                            alt="avatar"
                          />
                        }
                        size={100}
                      />
                    </Col>

                    <Col
                      span={24}
                      md={10}
                      className={!editProfil && "d-flex align-items-center"}
                    >
                      <div>
                        <div className="my-1">
                          {editProfil ? (
                            <Input
                              placeholder="Nom"
                              size="large"
                              onChange={(e) =>
                                setFormDataPreview({
                                  ...formDataPreview,
                                  nom: e.target.value,
                                })
                              }
                              value={formDataPreview.nom}
                            />
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faUserGraduate}
                                className="me-1"
                              />{" "}
                              <span className="fw-bold">{formData.nom}</span>{" "}
                              <span>{formData.prenom}</span>
                            </>
                          )}
                        </div>

                        <div className="my-1">
                          {editProfil && (
                            <Input
                              placeholder="Prénom"
                              size="large"
                              onChange={(e) =>
                                setFormDataPreview({
                                  ...formDataPreview,
                                  prenom: e.target.value,
                                })
                              }
                              value={formDataPreview.prenom}
                            />
                          )}
                        </div>

                        <div className="my-1">
                          {editProfil ? (
                            <Input
                              placeholder="Etablissement"
                              size="large"
                              onChange={(e) =>
                                setFormDataPreview({
                                  ...formDataPreview,
                                  etablissement: e.target.value,
                                })
                              }
                              value={formDataPreview.etablissement}
                            />
                          ) : (
                            <>
                              {formData.etablissement && (
                                <>
                                  <FontAwesomeIcon
                                    icon={faSchool}
                                    className="me-1"
                                  />{" "}
                                  <span className="fw-bold">
                                    {formData.etablissement}
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </Col>

                    <Col span={24} md={10} className="text-center">
                      {(formData.date_de_debut ||
                        formData.date_de_fin ||
                        editProfil) && (
                        <>
                          <h2>Date de stage</h2>

                          {editProfil ? (
                            <>
                              <DatePicker
                                size="large"
                                placeholder="Date de début"
                                format={dateFormat}
                                onChange={(e) =>
                                  setFormDataPreview({
                                    ...formDataPreview,
                                    date_de_debut: e.toDate(),
                                  })
                                }
                                className="mx-2"
                              />

                              <DatePicker
                                size="large"
                                placeholder="Date de fin"
                                format={dateFormat}
                                onChange={(e) =>
                                  setFormDataPreview({
                                    ...formDataPreview,
                                    date_de_fin: e.toDate(),
                                  })
                                }
                                className="mx-2"
                              />
                            </>
                          ) : (
                            <>
                              {dayjs(formData.date_de_debut).format(dateFormat)}{" "}
                              <FontAwesomeIcon
                                icon={faAngleRight}
                                className="mx-3"
                              />{" "}
                              {dayjs(formData.date_de_fin).format(dateFormat)}
                            </>
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
                </Card>
              </Col>

              {!formData.ma_recherche_de_stage &&
                !formData.presentation &&
                !formData.motivation &&
                !editProfil && (
                  <Col span={24} className="py-5">
                    <Empty description={false} />
                  </Col>
                )}

              {(formData.ma_recherche_de_stage || editProfil) && (
                <Col span={24}>
                  <Card>
                    <h2>Mon Stage de rêve</h2>

                    {
                      // todo - ajout de mot_cle // liste de mots
                      editProfil ? (
                        // todo - format n'est pas bon les saut de ligne (<p> et <br/>)
                        <TextArea
                          rows={8}
                          placeholder="Bonjour, je recherche un stage.."
                          size="large"
                          onChange={(e) =>
                            setFormDataPreview({
                              ...formDataPreview,
                              ma_recherche_de_stage: e.target.value,
                            })
                          }
                          value={formDataPreview.ma_recherche_de_stage}
                        />
                      ) : (
                        formData.ma_recherche_de_stage
                      )
                    }
                  </Card>
                </Col>
              )}

              {(formData.presentation || editProfil) && (
                <Col span={24} md={(formData.motivation || editProfil) && 12}>
                  <Card>
                    <h2>Présentation</h2>

                    {editProfil ? (
                      // todo - format n'est pas bon les saut de ligne (<p> et <br/>)
                      <TextArea
                        rows={8}
                        placeholder="Bonjour, je suis très intérressé par le domaine du ..."
                        size="large"
                        onChange={(e) =>
                          setFormDataPreview({
                            ...formDataPreview,
                            presentation: e.target.value,
                          })
                        }
                        value={formDataPreview.presentation}
                      />
                    ) : (
                      formData.presentation
                    )}
                  </Card>
                </Col>
              )}

              {(formData.motivation || editProfil) && (
                <Col span={24} md={(formData.presentation || editProfil) && 12}>
                  <Card>
                    <h2>Motivation</h2>

                    {editProfil ? (
                      // todo - format n'est pas bon les saut de ligne (<p> et <br/>)
                      <TextArea
                        rows={8}
                        placeholder="Je suis particulièrement intérressé par votre ..."
                        size="large"
                        onChange={(e) =>
                          setFormDataPreview({
                            ...formDataPreview,
                            motivation: e.target.value,
                          })
                        }
                        value={formDataPreview.motivation}
                      />
                    ) : (
                      formData.motivation
                    )}
                  </Card>
                </Col>
              )}
            </Row>
          </Space>
        </div>
      </main>
    </>
  );
}

export default ProfilEleve;
