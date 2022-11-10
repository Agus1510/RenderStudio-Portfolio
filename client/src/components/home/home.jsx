import React from "react";
import style from "./home.module.css";
import { RiSeparator } from "react-icons/ri";
import { useCallback } from "react";
import { setAddRoom } from "../../../redux/reducer";
import { getAllRooms } from "../../../redux/actions";
import Particles from "react-tsparticles";
import {
  IoChevronDownOutline,
  IoSearchSharp,
  IoLogoInstagram,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import { loadFull } from "tsparticles";
import { useSelector } from "react-redux";
import AddRoom from "./popUp/addRoom";
import { useDispatch } from "react-redux";
function Home() {
  const dispatch = useDispatch();
  const { user, addRoom, allRooms } = useSelector(
    (state) => state.reducerCompleto
  );

  const handleAdd = () => {
    dispatch(setAddRoom(true));
  };

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const array = allRooms;
  return (
    <div className={style.home}>
      <div className={style.container} id="home">
        <div className={style.flexContainer}>
          <img src="/images/logo2.png"></img>
        </div>
      </div>
      <div className={style.pages}>
        <div className={style.divisor}>
          <div className={style.divText}>
            <h1> RENDER STUDIO</h1>
            <RiSeparator />
            <p>
              "El angulo de la cámara, iluminación, color y la composición son
              los ingredientes claves, que juntos son los fundamentos
              principales para que una imagen luzca genial... para que tu
              proyecto luzca genial."
            </p>
          </div>
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              background: {
                color: {
                  value: "#00100",
                },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  directions: "none",
                  enable: true,
                  outModes: {
                    default: "out",
                  },
                  random: false,
                  speed: 6,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 50,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
          />
        </div>
        <div className={style.divisor2} id="portfolio">
          <div className={style.portfolio}>
            <h2>PORTAFOLIO</h2>
          </div>
        </div>
        <div className={style.portafolio}>
          {array
            ? array.map((p) => {
                return <img src={p.image[0].data_url} />;
              })
            : null}
        </div>
        {user.isAdmin ? (
          <div className={style.category2} onClick={() => handleAdd()}>
            <div className={style.img2}>
              <img src={"plus.png"} />
            </div>
            <div className={style.name2}>
              <h1>Add image</h1>
            </div>
          </div>
        ) : null}
        <div className={style.divisor3} id="contact">
          <div className={style.contacto}>
            <h2>CONTACT</h2>
          </div>
          <div className={style.contact}>
            <div className={style.text}>
              <IoPhonePortraitOutline />
              <p>+54 9 11 5878 4690</p>
            </div>
            <div className={style.text}>
              <IoLogoInstagram />
              <p>@render.studio.33</p>
            </div>
          </div>
        </div>
      </div>
      {addRoom ? <AddRoom /> : null}
    </div>
  );
}

export default Home;
