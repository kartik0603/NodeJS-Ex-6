const express = require('express')
const app = express();
const bodyParser = require('body-parser')

app.use(express.json());

let users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.redirect('/signup');
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/registration.html');
});

app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/public/signin.html');
});

app.post('/signup', (req, res) => {
  const { fullName, username, email, mobile, gender, password, role } = req.body;
  users.push({ fullName, username, email, mobile, gender, password, role });
  res.redirect('/signin');
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, role: user.role, email: user.email });
  } else {
    res.json({ success: false, message: 'Invalid login' });
  }
});

app.get('/students', (req, res) => {
  const students = users.filter(user => user.role === 'student');
  res.json(students);
});


app.get('/student-home', (req, res) => {
  res.sendFile(__dirname + '/public/student-home.html');
});

app.get('/teacher-home', (req, res) => {
  res.sendFile(__dirname + '/public/teacher-home.html');
});

app.listen(8090, () => {
  console.log('Server is running on port 8090');

})