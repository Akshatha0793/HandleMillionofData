
import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component{
  state={
    name:'',
    age:'',
    degree:'',
    limit:5,
    skip:0,
    posts:[]
  }

 nextPage=()=>{
    this.setState({
      skip: this.state.skip +this.state.limit
    });
    this.getBlogPost();
  }

  previousPage=()=>{
    if(this.state.skip>0){
      this.setState({
        skip:this.state.skip - this.state.limit
      });
    }
    this.getBlogPost();
  }

  componentDidMount=()=>{
    this.getBlogPost();
  };

  getBlogPost =()=>{
    var URL ="";
    if(this.state.name==="")
    { URL = 'http://localhost:8080/api/?limit='+this.state.limit+'&skip='+this.state.skip;}
    else{
       URL = 'http://localhost:8080/api/'+this.state.name+'?limit='+this.state.limit+'&skip='+this.state.skip ;
    }
    console.log(URL);
    axios.get(URL)
    .then((response)=>{
      const data = response.data;
      this.setState({posts:data});
      console.log('Data has been received');
    })
    .catch((error)=>{
      
    });
  }
  

  handleChange =({target})=>{
    const {name,value} = target;
    console.log(name);
    console.log(value);
    this.setState({[name]:value});
    if(name === "name"){
    const URL = 'http://localhost:8080/api/'+value+'?limit='+this.state.limit+'&skip='+this.state.skip ;
    console.log(URL);
    axios.get(URL)
    .then((response)=>{
      const data = response.data;
      this.setState({posts:data});
      console.log('Data has been received');
    })
    .catch((error)=>{
      
    });
    }

  };

  submit=(event)=>{
event.preventDefault();
const payload={
  title:this.state.title,
  body:this.state.body
};
console.log("Payload:",payload);
axios({
  url: 'http://localhost:8080/api/save',
  method: 'POST',
  data: payload
})
  .then(() => {
    console.log('Data has been sent to the server');
    this.resetUserInput();
    this.getBlogPost();
  })
  .catch(() => {
    console.log('Internal server error');
  });;
};



displayBlogPost = (posts) => {


 
  if (!posts.length) return null;
  
  return posts.map((post, index) => (
 
    <tr>
    <td>
    {post.name}
    </td>
    <td>
    {post.age}
    </td>
    <td>
      {post.degree}
    </td>

    </tr>
   
  ));
 
};

resetUserInput =() =>{
  this.setState({
    name:'',
    age:'',
    degree:''
  });
};

  render(){
    console.log('States',this.state);
    return(
      <div className="app">
        <h2>Display and search among data!!</h2>
        <form onSubmit={this.submit}>
        
          <div className="form-input">
            <input 
            type="text"
              placeholder="Type the record you want to search" 
              name="name" 
             
              value={this.state.name} 
              onChange={this.handleChange}>

            </input>
              
          </div>
        
        </form>

        <div className="blog-display">
        <table>
    <thead>
      <tr>
        <td>Name</td>
        <td>Age</td>
        <td>Degree</td>
      </tr>
    </thead>
    <tbody>
    {this.displayBlogPost(this.state.posts)}
    </tbody>
  </table>
          
        </div>
        <div className="spacing">
          <a onClick={this.nextPage}>Previous Page</a>

          <a onClick={this.previousPage}>Next Page</a>
        </div>
      </div>
    );
  }
}

export default App;