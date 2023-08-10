import styles from '@styles/Header.module.scss'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@reducers/user';
import { Row, Col, Avatar, Popover, Button, Badge, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faCommentDots, faStar, faMagnifyingGlass, faUserGraduate, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'antd/lib/typography/Link';

function Header() {
	const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
		dispatch(logout());
    router.push('/');
	};

  const popoverUtilisateur = (
    <div>
      <div className={styles.popover_body}>
        <Row gutter={[12, 12]}>
          <Col>
            <Avatar src={<img src={"https://www.photo-identite-bordeaux.fr/wp-content/uploads/2020/10/Enfant-04-2.jpg"} alt="avatar" />} size={60} />
          </Col>
          <Col>
            <div><span className='fw-bold'>Lahrim</span> Soufiane</div>
            <div>Lahrim@a.fr</div>
          </Col>
        </Row>
      </div>

      <div className={styles.popover_footer}>
        <Button type='default' onClick={handleLogout} className={styles.popover_footer_btn}>
          <FontAwesomeIcon icon={faRightFromBracket} className='me-2' /> Déconnexion
        </Button>
      </div>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className='d-flex align-items-center justify-content-between'>
          <Link href={'/'}>
            <img src='/img/logo.svg' alt='logo yours' className={styles.logo} />
          </Link>

          <div className='d-flex align-items-center text-center'>
            <div className='mx-5'>
              <Link href={'/'} className={styles.link}k>
                <FontAwesomeIcon icon={user.fonction ? faUserGraduate : faUser} className='cursor-pointer' />
                <div className='mt-1 text-small'>Mon profil</div>
              </Link>
            </div>

            <div className='mx-5'>
              <Link href={'/'} className={styles.link}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='cursor-pointer' />
                <div className='mt-1 text-small'>{ user.fonction ? 'Annonces' : 'Stagiaires'}</div>
              </Link>
            </div>

            <div className='mx-5'>
              <Link href={'/'} className={styles.link}>
                <FontAwesomeIcon icon={faStar} className='cursor-pointer' />
                <div className='mt-1 text-small'>Mes favoris</div>
              </Link>
            </div>

            <div className='mx-5'>
              <Link href={'/'} className={styles.link}>
                <Badge dot='true'>
                  <FontAwesomeIcon icon={faBell} className='cursor-pointer' />
                </Badge>
                <div className='mt-1 text-small'>Notifications</div>
              </Link>
            </div>

            <div className='mx-5'>
              <Link href={'/'} className={styles.link}>
                <Badge dot='true'>
                  <FontAwesomeIcon icon={faCommentDots} className='cursor-pointer' />
                </Badge>
                <div className='mt-1 text-small'>Messagerie</div>
              </Link>
            </div>
          </div>

          <div className='d-flex align-items-center text-center'>
            <div>
              <Link href={'/'} router className={styles.linkLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} className='cursor-pointer' />
                <div className='mt-1 text-small'>Déconnexion</div>
              </Link>
            </div>

            <div className='d-none'>
              <Popover placement='bottomRight' content={popoverUtilisateur} trigger='click' className={styles.popover}>
                <Avatar src={<img src={'https://www.photo-identite-bordeaux.fr/wp-content/uploads/2020/10/Enfant-04-2.jpg'} alt='avatar' />} size='' />
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
