import React, { Component } from 'react';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai';
import ImageForm from './components/ImageForm/ImageForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';


import './App.css';
import Navigation from './components/Navigation/Navigation';

const app = new Clarifai.App({
 apiKey: 'd7762c6d0c4640d7aa7bbccde374068e'
});



class App extends Component {
constructor(){
  super();
  this.state = {
    input:'',
    imageUrl:'',
    box: {},
    route: 'signin',
    isSignedin: false,
    user:{
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      joined: ''
    }
  }
}
  
  loadUser = (data) => {
    this.setState({
      user:{
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password,
          entries: data.entries,
          joined: data.joined
      }
    })
  }
  
  
 
 calculateFaceLocation = (data)=>{
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   return{
    leftCol: clarifaiFace.left_col * width,
    topRow : clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
   }
 }

 displayFaceBox = (box) => {
  console.log(box);
  this.setState({box:box});
 }





  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response =>{
      if(response){
        fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if(route=== 'signout'){
      this.setState({isSignedin: false})
    }else if(route === 'home'){
      this.setState({isSignedin:true})
    }
    this.setState({route: route});
  }
    
  render() {
    return (
      <div className="App">
            <Particles className="particles"
              params={{
                particles: {
                 number :{
                  value : 200,
                  density:{
                    enable:true,
                    value_area:800
                  }
                 } 

                  }
                
              }}
              />
           <div>
        
              <Logo />
              
              <ImageForm  
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
            
      </div>
    );
  }
}

export default App;
