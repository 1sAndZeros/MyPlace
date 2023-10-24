import Navbar from "../Navbar/Navbar";
import FigmaIcon from "../../assets/icons/figma.svg?react";
import GithubIcon from "../../assets/icons/github.svg?react";

function AboutPage() {
  return (
    <>
      <div className="about__container">
        <Navbar />
        <div className="about__main">
          <p className="about__content">
            Welcome to MyPlace. A project born from the creative minds of five
            passionate individuals. <br />
            Meet our team: Alina Ermakova, Rikie Patrick, Roberto Quadraccia,
            Claudia Alves, and Yasien Watkin. <br />
            MyPlace is the result of two intense weeks at Makers boot-camp,
            where we embarked on a journey to create a travel map like no other.
          </p>
          <p>
            Our vision was to provide a platform where users could curate their
            own personal travel experiences. We faced exciting challenges in
            bringing our vision to life, from integrating Mapbox to developing a
            seamless user experience.
          </p>
          <p>
            With MyPlace, you can save your favourite destinations, both those
            you&apos;ve explored and those you aspire to visit. We invite you to
            explore the world through our interactive map, save your cherished
            places, and connect with fellow travellers. Join us in creating your
            own travel story with MyPlace.
          </p>
          <div className="about__project-info">
            <a
              href="https://www.figma.com/file/geo3MuCsbO5ed0HknjD83Z/myplace"
              target="_blank"
              rel="noreferrer"
            >
              <FigmaIcon /> Project&apos;s design
            </a>
            <a
              href="https://github.com/1sAndZeros/MyPlace"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon /> Project&apos;s GitHub
            </a>
          </div>
        </div>
        <footer>
          <p className="about__copyright">
            Copyright © by MyPlace team: Alina Ermakova, Rikie Patrick, Roberto
            Quadraccia, Claudia Alves, Yasien Watkin{" "}
          </p>
        </footer>
      </div>
    </>
  );
}

export default AboutPage;
