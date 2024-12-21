import React, {useEffect , useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { BrowserRouter ,Routes , Route, useParams , NavLink} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));

const Home =()=>{
  const [posts , setPosts] =useState([]);

useEffect (() =>{       {/* way to structure useeffect*/}
 fetch('https://jsonplaceholder.typicode.com/posts')
 .then((data => data.json()))
 .then((data=> setPosts(data)));
},[]);


  return(
    <div>
      <div className='post-container'>
        {posts.map((post)=>(
          <NavLink style={{ display: 'block' }} to={`/post/${post.id}`}>
          {post.title}
        </NavLink>
        
        ))}
      </div>
    </div>
   

  );
};

const About =()=>{
  return(
    <h1>Company BIO </h1>
  );
};

const Profile =()=>{
  return (
    <h1>Candidate Profile</h1>
  )
};

const SayUser =()=>{
  const params = useParams();
  // console.log ("params", params);   {/* dynamic routing url make by id*/}
  return(                    
    <div>
      <h1>My Nmae is {params.userId}</h1>  
    </div>

    
  );
  
};

const PostPage = ()=>{
  const params = useParams();
  const [data, setData] =useState(null)
 
  useEffect (()=>{
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    .then
    (data =>data.json())
    .then(data =>setData(data));

  },[]);

  console.log("Data" , data)

if( data === null)
  return <p>Loading.. </p>;
return(

  <div>
    <h1>
      {data.title}
      <p>{data.body}</p>
    </h1>
  </div>
);


  
}



root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>


      <Route path='/account/about' element={<About/>}/>  {/*Multi level Routing*/}
      <Route path='/user/:userId' element={<SayUser/>}/>
      <Route path='/post/:postId' element={<PostPage/>}/>
      {/*Nested Routing   for now all routes are hardcoded*/}

      <Route path='/account'>
        <Route path='profile' element={<Profile/>}/>
      </Route>
    

    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
