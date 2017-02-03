import React,{Component,PropTypes} from 'react';
import {fetchPost} from "../actions/index.js";
import {deletePost} from "../actions/index.js"

import {connect} from 'react-redux';
import {Link} from 'react-router';

 class PostsShow extends Component {

   static contextTypes = {                        //use context only in case  router

     router:PropTypes.object                      //router is available throughtout the application
                                                   //but is accessible through the  parent.
   }

    componentWillMount(){
    this.props.fetchPost(this.props.params.id);
    }

    handleClickEvent(event) {
      console.log("inside delete");
      this.props.deletePost(this.props.params.id).then(()=>{           //our action createPosts returns a promise
     //when promise is resolved ie blog post is created navigate to index
      this.context.router.push('/');

    });
    }

    render(){

     const {post} = this.props;

     if(!post){
      return <div>Loading....</div>;
     }

     return(
       <div id="post-content">
           <div className="text-xs-right">
             <Link to="/" className="btn btn-primary">
             Back
             </Link>

            <button onClick={this.handleClickEvent.bind(this)} className="btn btn-danger">Delete</button>
           </div>
          <h3>{post.title}</h3>
          <h6>{post.categories}</h6>
          <p>{post.content}</p>
       </div>
     )

  }

}

function mapStateToProps(state){
  return{post:state.posts.post};
}


export default connect(mapStateToProps,{fetchPost,deletePost})(PostsShow);
