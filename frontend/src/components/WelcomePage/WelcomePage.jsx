import Navbar from "../Navbar/Navbar";

function WelcomePage() {
  return (
    <>
      <div className="welcome-page__container">
        <Navbar />
        <div className="welcome-page__text">
          <h1 className="welcome-page__heading">
            Beautiful Places of the world
          </h1>
          <p className="welcome-page__subtitle">Look back at memories and plan for the next ones</p>
        </div>
        <footer>
          <p className="welcome-page__copyright">Copyright © by MyPlace team: Alina Ermakova, Rikie Patrick, Roberto Quadraccia, Claudia Alves, Yasien Watkin </p>
        </footer>
      </div>
    </>
  );
}

export default WelcomePage;