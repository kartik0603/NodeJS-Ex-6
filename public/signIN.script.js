document.getElementById('signinForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('email', data.email);
          localStorage.setItem('role', data.role);
          if (data.role === 'student') {
            window.location.href = '/student-home';
          } else if (data.role === 'teacher') {
            window.location.href = '/teacher-home';
          }
        } else {
          alert(data.message || 'Sign in failed');
        }
      });
  });