import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import './styles/styles.css';
import dance from './images/dance.jpg';
import travel from './images/travel.jpg';



function App() {

  // Init state (card not flipped; flip angle == 0)
  const [flipped, setFlipped] = useState(false);
  const [props, setProps] = useSpring(() => ({ angle: 0, config: {...config.default, mass: 2, tension: 100} }))



  // Listen if flip state has changed. If so - change flip angle
  useEffect(() => { setProps({ angle: flipped ? 180 : 0 }) }, [flipped])



  // Handle card click fn; Reverse flip state on click
  const handleClick = () => setFlipped(prevFlipped => !prevFlipped);



  // Card & images styling
  const cardStyle =   {
    boxShadow: props.angle.interpolate(angle => {
      const offsetY = 7 - (14 * angle / 180);
      const spread = ((-1 / 60) * Math.pow(angle, 2)) + (3 * angle) + 20;
      const alpha = angle < 90 ? (1 - (0.9 * (angle / 90))) : (0.1 + (0.9 * ((angle - 90) / 90)));

      return `0 ${ offsetY }px ${ spread }px 2px hsla(0, 0%, 25%, ${ alpha })`
    }),
    transform: props.angle.interpolate(angle => {
      const scale = angle < 90 ? (1 + (0.3 * (angle / 90))) : (1.3 - (0.3 * ((angle - 90) / 90)));

      return `perspective(1200px) rotateX(${angle}deg) scale(${scale})`
    })
  }
  const travelStyle = { opacity:   props.angle.interpolate({range: [0, 180], output: [1, 0]}) }
  const danceStyle =  { opacity:   props.angle.interpolate({range: [0, 180], output: [0, 1]}) }



  return (
    <div className='container'>
      <animated.div className='card' style={cardStyle} onClick={handleClick}>
        <animated.img src={travel} alt='Travel' className='image travel' style={travelStyle} />
        <animated.img src={dance}  alt='Dance'  className='image dance'  style={danceStyle} />
      </animated.div>
    </div>
  );
}

export default App;
