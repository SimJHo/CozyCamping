const { response, request } = require('express');
const express = require('express');
const app = express();
const session = require('express-session');

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret code',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    maxAge: 1000 * 60 * 60 //쿠키 유효 시간 1시간 
  }
}))

const server = app.listen(3000, () => {
  console.log('server : port 3000')
});

app.set('views', __dirname + '/products');

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '12345qwert',
  database: 't_product'
});

app.get('/', function (req, res) {
  res.render('product_main.html');
})

app.get('/cart_page.html', function (req, res) {
  res.render('cart_page.html');
})

app.get('/join_page.html', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT m_id FROM login', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.render('join_page.html',{data:results});
    });  
  }); 
})

app.get('/login_page.html', function (req, res) {
  res.render('login_page.html');
})

app.get('/product_detail.html/:alias', function (req, res) {
  res.render('product_detail.html');
})

app.get('/product_list.html/:alias', function (req, res) {
  res.render('product_list.html');
})

app.get('/product_registration.html', function (req, res) {
  res.render('product_registration.html');
})

app.get('/my_page.html', function (req, res) {
  res.render('my_page.html');
})

app.get('/id_Verification.html', function (req, res) {
  res.render('id_Verification.html');
})

app.get('/pw_Verification.html', function (req, res) {
  res.render('pw_Verification.html');
})

app.get('/pw_change.html', function (req, res) {
  res.render('pw_change.html');
})

app.get('/pw_check.html', function (req, res) {
  res.render('pw_check.html');
})

app.get('/search.html', function (req, res) {
  res.render('search.html');
})

app.get('/notice.html', function (req, res) {
  res.render('notice.html');
})

app.get('/notice_text.html/:alias', function (req, res) {
  res.render('notice_text.html');
})

app.get('/notice_write.html', function (req, res) {
  res.render('notice_write.html');
})

app.get('/notice_rewrite.html/:alias', function (req, res) {
  res.render('notice_write.html');
})

//데이터
app.get('/productlist', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist ORDER BY imgenum DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/popularity', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist ORDER BY popularity DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/highprice', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist ORDER BY price DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/lowprice', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist ORDER BY price', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/pwcheck', function (req, res) {
  console.log(req.query.m_id);
  console.log(req.query.m_pass);
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT m_name,user_id,m_email,m_tel,m_date FROM login WHERE ((m_id=?) && (m_pass=?))', [req.query.m_id, req.query.m_pass], function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/idcheck', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT count(*) as cnt FROM login WHERE m_id=?', req.query.m_id, function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/telcheck', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT count(*) as cnt FROM login WHERE m_tel=?', req.query.m_tel, function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/emailcheck', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT count(*) as cnt FROM login WHERE m_email=?', req.query.m_email, function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.post('/join_com', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var sql = 'INSERT INTO login(m_id, m_pass, m_email, m_name, m_date, m_tel) VALUES(? ,? ,? ,? ,? ,? )';
    var params = [req.body.m_id, req.body.m_pass, req.body.m_email, req.body.m_name, req.body.m_date, req.body.m_tel];
    connection.query(sql, params, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        throw error;
      }
      res.render('login_page.html',{data:results});
    });  
  }); 
})

app.get('/login_com', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var sql = 'SELECT m_name,user_id,m_email,m_tel,m_date FROM login WHERE ((m_id=?) && (m_pass=?))';
    var params = [req.query.m_id, req.query.m_pass];
    connection.query(sql, params, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        throw error;
      }
      // console.log(results);
      res.send({data:results});
    });  
  }); 
})

app.post('/PR_com', function (req, res) {
  
  pool.getConnection(function (err, connection) { 
    if (err) throw err;
    var sql = 'INSERT INTO productlist (title, titleen, price, imge, category, popularity, imge2, imge3) VALUE ( ?, ?, ?, ?, ?, ?, ?, ?)';
    var params = [req.body.title, req.body.titleen, req.body.price, req.body.imge, req.body.category, req.body.popularity, req.body.imge2, req.body.imge3];
    connection.query(sql, params, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        throw error;
      }
      res.render('product_registration.html',{data:results});
    });  
  }); 
})

app.get('/productlist/tent', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "텐트" ORDER BY imgenum DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/popularity/tent', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "텐트" ORDER BY popularity DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/lowprice/tent', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "텐트" ORDER BY price', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/highprice/tent', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "텐트" ORDER BY price DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/productlist/chair', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "의자" ORDER BY imgenum DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/popularity/chair', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "의자" ORDER BY popularity DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/lowprice/chair', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "의자" ORDER BY price', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/highprice/chair', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "의자" ORDER BY price DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/productlist/grill', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "그릴" ORDER BY imgenum DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/popularity/grill', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "그릴" ORDER BY popularity DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/lowprice/grill', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "그릴" ORDER BY price', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/highprice/grill', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "그릴" ORDER BY price DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/productlist/lantern', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "랜턴" ORDER BY imgenum DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/popularity/lantern', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "랜턴" ORDER BY popularity DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/lowprice/lantern', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "랜턴" ORDER BY price', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/highprice/lantern', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE category = "랜턴" ORDER BY price DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });
  }); 
})

app.get('/idVerification', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT m_id FROM login WHERE (m_name=?) && (m_tel=?)', [req.query.m_name, req.query.m_tel], function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.post('/pwchange', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('UPDATE login SET m_pass=? WHERE m_id=?', [req.body.m_pass, req.body.m_id], function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.render('login_page.html',{data:results});
    });  
  }); 
})

app.get('/cartlist', function (req, res) {

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var sql = 'INSERT INTO cart (user_id, count, total, imgenum) VALUE ( ?, ?, ?, ?)';
    var params = [req.query.user_id, req.query.count, req.query.total, req.query.imgenum];
    connection.query(sql, params, function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/cart', function (req, res) {

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var sql = 'SELECT cart.count,cart.total , productlist.* FROM cart LEFT JOIN productlist ON cart.imgenum = productlist.imgenum WHERE user_id=?';
    var params = req.query.user_id;
    connection.query(sql, params, function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/cartDelAll', function (req, res) {

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var sql = 'DELETE FROM cart WHERE user_id=?';
    var params = req.query.user_id;
    connection.query(sql, params, function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/cartDelCh', function (req, res) {

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var sql = 'DELETE FROM cart WHERE user_id=? && imgenum=?';
    var params = [req.query.user_id, req.query.imgenum];
    connection.query(sql, params, function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.post('/userInfoModi', function (req, res) {
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('UPDATE login SET m_name=? ,m_tel=? ,m_email=? ,m_date=? WHERE m_email=?', [req.body.m_name, req.body.m_tel, req.body.m_email, req.body.m_date, req.body.m_email], function (error, results, fields) {
      connection.release();
      // console.log(results);
      if (error) throw error;
      res.render('my_page.html',{data:results});
    });  
  }); 
})

app.get('/search/newest', function (req, res) {
  let title = req.query.title;
  let titleen = req.query.titleen;
  let category = req.query.category;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE ((title LIKE ?) || (titleen LIKE ?) || (category LIKE ?))', [`%${title}%`, `%${titleen}%`, `%${category}%`], function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/search/popularity', function (req, res) {
  let title = req.query.title;
  let titleen = req.query.titleen;
  let category = req.query.category;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE ((title LIKE ?) || (titleen LIKE ?) || (category LIKE ?)) ORDER BY popularity DESC', [`%${title}%`, `%${titleen}%`, `%${category}%`], function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/search/lowprice', function (req, res) {
  let title = req.query.title;
  let titleen = req.query.titleen;
  let category = req.query.category;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE ((title LIKE ?) || (titleen LIKE ?) || (category LIKE ?)) ORDER BY price', [`%${title}%`, `%${titleen}%`, `%${category}%`], function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/search/highprice', function (req, res) {
  let title = req.query.title;
  let titleen = req.query.titleen;
  let category = req.query.category;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM productlist WHERE ((title LIKE ?) || (titleen LIKE ?) || (category LIKE ?)) ORDER BY price DESC', [`%${title}%`, `%${titleen}%`, `%${category}%`], function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/noticelist', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT num,title,date FROM notice ORDER BY num DESC', function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/noticesearch', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT num,title,date FROM notice WHERE ((title LIKE ?) || (num LIKE ?)) ORDER BY num DESC', [`%${req.query.title}%`, `%${req.query.num}%`], function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/noticetext', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM notice WHERE num=?',req.query.id, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.send({data:results});
    });  
  }); 
})

app.get('/noticewrite', function (req, res) {
  pool.getConnection(function (err, connection) { 
    if (err) throw err;
    connection.query('INSERT INTO notice (title, text) VALUE ( ?, ?)', [req.query.title, req.query.text], function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        throw error;
      }
      res.send({data:results});
    });  
  }); 
})

app.get('/notice_rewrite', function (req, res) {
  pool.getConnection(function (err, connection) { 
    if (err) throw err;
    connection.query('SELECT * FROM notice WHERE num=?', req.query.id, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        throw error;
      }
      res.send({data:results});
    });  
  }); 
})

app.get('/noticerewrite', function (req, res) {
  pool.getConnection(function (err, connection) { 
    if (err) throw err;
    connection.query('UPDATE notice SET title=?, text=? WHERE num=?', [req.query.title, req.query.text, req.query.id], function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        throw error;
      }
      res.send({data:results});
    });  
  }); 
})

//노드 메일러
const nodemailer = require('nodemailer');

app.get('/sendemail', function (req, res) {
  const email = {
    service: "naver",
    host: "localhost",
    port: 2525,
    auth: {
      user: "email-verification@naver.com",
      pass: "tlawnsgh1!A"
    }
  };

const send = async (option) => {
    nodemailer.createTransport(email).sendMail(option,  (error, info) => {
        if(error) {
            console.log(error);
        }else{
            console.log(info);
            return info.response;
        }
    });
  };

  let email_data = {
    from: "email-verification@naver.com",
    to: req.query.useremail,
    subject: "CozyCamping 이메일 인증 메일입니다.",
    html: "<h1 style='color: #325341'>CozyCamping 이메일 인증</h1><br>"+
    "<h1 style='color: #325341'>인증번호 : <span style='font-weight: bolder; color: #F1EBE5; background-color:#325341; padding: 10px'>"
    +req.query.number+"</span></h1>"
  };

  send(email_data);
})

app.use('/products', express.static('products'));
app.use('/imge', express.static('imge'));
app.use('/public', express.static('public'));