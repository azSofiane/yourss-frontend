import { useRouter } from "next/router";
import Annonce from "@components/Annonce";
import { useEffect, useState } from "react";


export default function AnnoncePage() {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  // const [creationDescription, setCreationDescription] = useState("");
  const [annonceDetails, setAnnonceDetails] = useState({
    creationTitre: "",
    creationDateDebut: "",
    creationDateFin: "",
    creationPoste: "",
    creationEntreprise: "",
    creationDescription: "",
    creationAdresse: "",
    creationCodePostal: "",
    creationVille: "",
    creationDatePublication: "",
    archiver: "",
    creationDateCreation: "",
  });

  useEffect(() => {
    // Faire une requête au backend pour obtenir les détails de l'annonce en utilisant le slug
    fetch("http://localhost:3000/annonces/" + id)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("mes datafetch", data.annonce);

          const {
            date_de_creation,
            date_de_publication,
            date_de_debut,
            date_de_fin,
            titre,
            archive,
            ville,
            code_postal,
            adresse,
            profession,
            entreprise,
            description,
          } = data.annonce;

          console.log("lahrim", titre);

          setAnnonceDetails({
            creationTitre: titre,
            creationDateDebut: date_de_debut,
            creationDateFin: date_de_fin,
            creationPoste:profession,
            creationEntreprise: entreprise,
            creationDescription: description,
            creationAdresse: adresse,
            creationCodePostal: code_postal,
            creationVille: ville,
            creationDatePublication: date_de_publication,
            archiver: archive,
            creationDateCreation:date_de_creation,
          });
        }
      });
  }, [id]);

  return (
    <div>
      {annonceDetails ? (
        <Annonce props={annonceDetails} />
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
