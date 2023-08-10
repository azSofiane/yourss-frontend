import { useSelector } from "react-redux";
import { useRouter } from 'next/router';

import MesAnnonces from '@components/MesAnnonces';

function MesAnnoncesPage() {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  if (user.fonction === 'false') {
    return <MesAnnonces />;
  } else {
    if (typeof window !== 'undefined') router.push('/')

    return null;
  }
}

export default MesAnnoncesPage;
