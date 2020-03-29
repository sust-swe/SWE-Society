var express = require("express");
const fs = require('fs');
const { Client } = require("pg");
const formidabel = require("formidable");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
var app = express();
var session;
var data;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
    sessions({
      secret: '98rw-0di9fw89e-09r8=w-ed-089f8s09d8f=w879464werwe',
      resave: false,
      saveUninitialized: true
    })
  );

const client = new Client({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "booklist"
  }); 
  
  client.connect(err => {
    if (err) {
      console.error("connection error", err.stack);
    } else {
      console.log("connected");
    }
  });

app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs");


const login = function(req, res) {
    res.render("login");
  }

const profile = function(req, res){
  res.render('profile');
}

const updateProfile = function(req, res){
  res.render('updateProfile');
}

const feeds = function(req, res){
  res.render("feeds");
}

const details = function(req, res){
  res.render('details');
}
  
  const home = function(req, res) {
    res.render("index");
  }
  
  const batch = function(req, res) {
    res.render("batch");
  }
  
  const committe = function(req, res) {
    res.render("committe");
  }
  
  const about = function(req, res) {
    res.render("about");
  }
  
  const me = function(req, res) {
  
    if(session.isAuthenticated){
      res.render("me", {myinfo: data});
    }
    else{
      res.redirect('login');
    }
    
  }
  
  const logout = function(req, res) {
    req.session.destroy(function(error) {
      console.log(error);
      res.render("login");
    });
  }
  
  const allCommittee = function(req, res) {
    res.render("allCommittee");
  }
  
  const register = function(req, res) {
    res.render("register.ejs");
  }
  
  const bal = function(req, res) {
    res.render("bal.ejs");
  }
  
  const blog = function(req, res) {
    
    let query = {
      text: 'SELECT *FROM public."blog" LEFT JOIN members ON members.reg_no = blog.user_id',
    }
    client.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        // console.log(res.rows[0]);
        data = res.rows;
      }
    });
     res.render("blog", {blog: data});
  }
  
  const userRegister = function(req, res) {
    console.log(req.body);
    console.log(new Date());
    const query = {
      text: 'INSERT INTO public."members"(reg_no, username, pass, email) VALUES($1, $2, $3, $4)',
      values: [req.body.reg, req.body.username, req.body.password, req.body.email],
    }
    client.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[1]);
      }
    });
    res.redirect("home");
  }
  
  
  const createBlog = function(req, res) {
  
    console.log(req.body);
    let formData = {};
  
    const prefixPath = "/public/blog/";
    let filePath = "/blog/";
    new formidabel.IncomingForm()
      .parse(req)
      .on("fileBegin", (image, file) => {
        const randPath = file.path.split("_")[1] + "." + file.type.split("/")[1];
        file.path = __dirname + prefixPath + randPath;
        filePath += randPath;
      })
      .on("file", (name, file) => {
        formData[name] = filePath;
  
      })
  
    .on('field', (fieldName, fieldValue) => {
      console.log(fieldName+': '+fieldValue);
      formData[fieldName] = fieldValue;
      })
       
    .once('end', () => {
        console.log(formData.title);
        const query = {
          text: 'INSERT INTO public."blog"(user_id, title, blog_content, postdate, image, isapproved) VALUES($1, $2, $3, $4, $5, $6)',
          values: [session.reg_no, formData.title, formData.blog_content, new Date(), filePath, false],
        }
        client.query(query, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log("Successfully update");
          }
        });
      });
    res.redirect("blog");
  }
  
  
  const userLogin = function(req, res) {
    session = req.session;
  console.log(req.body);
    const query = {
      // give the query a unique name
      name: 'fetch-user',
      text: 'SELECT *FROM public."members" WHERE email = $1 and pass = $2',
       values: [req.body.email, req.body.password],
    }
    // res.cookie("username", req.body.username);
    // res.cookie("password", req.body.password);
    session.username = req.body.email;
    session.password = req.body.password;
    
    client.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log('Successfully authenticated');
        session.isAuthenticated = 'yes';
        data = res.rows[0];
        session.reg_no = data.reg_no
      }
    });
    res.redirect("me");
  }

  
  app
  .route('/register')
  .get(register)
  .post(userRegister)
  
  app
    .route('/blog')
    .get(blog)
    .post(createBlog)
  
  app
    .route('/login')
    .get(login)
    .post(userLogin)
  
  app
    .route('/home')
    .get(home)
  
  app
    .route('/batch')
    .get(batch)
  
  app
    .route('/committe')
    .get(committe)
  
  app
    .route('/about')
    .get(about)
  app
    .route('/me')
    .get(me)
  
  app
    .route('/logout')
    .get(logout)
  
  app
    .route('/allcommittee')
    .get(allCommittee)

  app
    .route('/feeds')
    .get(feeds);

  app
    .route('/details')
    .get(details)

  app
    .route('/profile')
    .get(profile)

  app
    .route('/updateProfile')
    .get(updateProfile)



app.listen(8080);

