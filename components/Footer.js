import styles from '@styles/Footer.module.scss'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <div><small>&copy; { currentYear }, Yoursapp.</small></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
