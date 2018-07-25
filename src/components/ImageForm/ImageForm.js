import React from 'react';
import './ImageForm.css';

import 'tachyons';

const ImageForm = ({onInputChange, onButtonSubmit}) => {
	return(
		<div>
			<p className="f2 bold white ">
				{'Hey give a picture and this app will detect the face'}
			</p>
			<div className="ct center">
				<div className="pa4 form br3 shadow-5 center">
					<input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
					<button className="w-30 grow f4 link pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>

		</div>	

		);

}
export default ImageForm;