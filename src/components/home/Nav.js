import "./styles/nav.css";

const Nav = () => {
  const isLoggedIn = true;
  return (
    <nav className="navbar">
      <div className="logo-container">
        {/* <Link href="/" className={styles["logo-link"]}>
          <Image
            className={styles.logo}
            src="assets/images/nblogo.svg"
            alt="logo"
            width={60}
            height={60}
          />
          <div className={styles["app-name"]}>NextBudget</div>
        </Link> */}
      </div>
      {isLoggedIn ? (
        <div className="user-nav">
          {/* <Link className={styles.profile} href="/profile">
            Profile
          </Link> */}
          <div className="theme">Light</div>
          <div className={`button-container user-button`}>
            <button>Log Out</button>
          </div>
        </div>
      ) : (
        <div className="button-container">
          <button>Log In</button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
