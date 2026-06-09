import React from 'react';
import './Home.css';
import resume from '../../Assets/Niel_Resume.pdf';
import hero from '../../Images/Portfolio Picture.png';
import cat from '../../Images/Cat Image.png';
import { FaBook } from 'react-icons/fa';
import Layout from '../../Components/Layout';
import SocialLinks from '../../Components/SocialLinks';

function Home() {
  return (
    <Layout>
    <div className = 'home-container'>
      <div className="introduction">
        <p className="hello">| Hello</p>
        <p className="name">
          My name is <span style={{ color: 'maroon' }}>Niel</span>.
        </p>
        <p className="bio">
          An aspiring software developer with one year of experience in back-end development using Java and Kotlin.
        </p>
        <a href={resume} download="Niel_Resume.pdf">
          <button className="rounded-button">
            My Resume <FaBook />
          </button>
        </a>
      </div>

      <div className="hero-section">
        <div className="image-container">
          <img src={hero} className="hero-image" alt="hero" />
        </div>
      </div>

      <SocialLinks />
      
      <div className="bottom-picture">
        <img src={cat} className="cat-picture" alt="cat" />
      </div>
    </div>
     
    </Layout>
  );
}

export default Home;