import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

export default function Post({_id,title,summary,cover,content,createdAt,author}) {
  console.log(cover);

  return (
<<<<<<< HEAD
   
    <div className="post">
     
=======
    
   <div className="post">
>>>>>>> dfe3cb9ae93ca202ab8543a065180882ba242885
      <div className="image">
        <Link to={`/post/${_id}`}>
  <img src={cover ? `https://mern-blog-app-backend-tgj1.onrender.com/${cover}` : '/placeholder.jpg'} alt="" />
</Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
<<<<<<< HEAD
  
}
=======
}
>>>>>>> dfe3cb9ae93ca202ab8543a065180882ba242885
