const email = localStorage.getItem('email');
if (!email) {
  window.location.href = '/public/signIN.html';
} else {
  document.getElementById('studentDetails').innerText = `Logged in as:  ${email} `;
}

const logout=()=> {
  localStorage.removeItem('role');
  localStorage.removeItem('email');
  window.location.href = '/public/signIN.html';
}