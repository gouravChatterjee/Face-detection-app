import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png';
import './Logo.css'

import 'tachyons';

const Logo = () => {
	return(
		<div className="ma4 mt4">
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
			 	<div className="Tilt-inner pa3"><img className="pa1" src={brain} alt="brain"/></div>
			</Tilt>

		</div>	

		);

}
export default Logo;