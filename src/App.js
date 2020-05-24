import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './styles/styles.css';
import dance from './images/dance.jpg';
import travel from './images/travel.jpg';



function App() {

  // Init state (card not flipped; flip angle == 0)
  const [flipped, setFlipped] = useState(false);
  const [props, setProps] = useSpring(() => ({ angle: flipped ? 180 : 0 }))



  // Listen if flip state has changed. If so - change flip angle
  useEffect(() => { setProps({ angle: flipped ? 180 : 0 }) }, [flipped])



  // Handle card click fn; Reverse flip state on click
  const handleClick = () => setFlipped(prevFlipped => !prevFlipped);



  // Card & images styling
  const cardStyle =   { transform: props.angle.interpolate(angle => `perspective(1200px) rotateX(${angle}deg)`) }
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
