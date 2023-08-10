import { useSelector } from "react-redux";

import RechercherUnEleve from '@components/RechercherUnEleve';
import RechercheAnnonces from '@components/RechercheAnnonces';

function RechercherUnElevePage() {
  const user = useSelector((state) => state.user);

  return (
    <>
      {
        user.fonction === 'true' ?
          <RechercheAnnonces />
        :
          <RechercherUnEleve />
      }
    </>
  )
}

export default RechercherUnElevePage;
