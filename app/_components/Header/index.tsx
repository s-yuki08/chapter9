import Link from 'next/link';
import classes from './Header.module.css'

const Header = () => (
  <header className={classes.header}>
    <div className={classes.header__inner}>
      <Link
        href="/"
        className={classes.header__logo}>
        blog
      </Link>
      <nav className={classes['header__nav-lists']}>
        <Link
          href='/contact'
          className={classes['header__nav-list']}
        >
          お問い合わせ
        </Link>
      </nav>
    </div>
  </header>
)

export default Header
