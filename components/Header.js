import styles from '@styles/Header.module.scss'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@reducers/user';
import { Row, Col, Avatar, Popover, Button, Badge, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faCommentDots, faStar, faMagnifyingGlass, faUser, faBell } from '@fortawesome/free-solid-svg-icons';

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
          <img src='img/logo.svg' alt='logo yours' onClick={() => router.push('/')} className={styles.logo} />

          <Input placeholder={user.fonction === 'true' ? 'Rechercher un stage' : 'Rechercher un(e) stagiaire'} suffix={<FontAwesomeIcon icon={faMagnifyingGlass} />} className={styles.input_seach} />

          <div className='d-flex align-items-center'>
            <FontAwesomeIcon icon={faStar} className='me-5 cursor-pointer' />

            <Badge dot='true' className='me-5'>
              <FontAwesomeIcon icon={faBell} className='cursor-pointer' />
            </Badge>

            <Badge dot='true' className='me-5'>
              <FontAwesomeIcon icon={faCommentDots} className='cursor-pointer' />
            </Badge>

            <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} className='text-default cursor-pointer' />

            <Popover placement='bottomRight' content={popoverUtilisateur} trigger='click' className={styles.popover + ' d-none'}>
              <Avatar src={<img src={'https://www.photo-identite-bordeaux.fr/wp-content/uploads/2020/10/Enfant-04-2.jpg'} alt='avatar' />} size='' />
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
