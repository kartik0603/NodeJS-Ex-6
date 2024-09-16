document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('email');
    if (!email) {
      window.location.href = '/public/signIN.html';
    }
  
    let students = [];
  
    const renderStudents = (filteredStudents) => {
      const studentList = document.getElementById('studentList');
      studentList.innerHTML = '';
      filteredStudents.forEach(student => {
        const p = document.createElement('p');
        p.innerText = `${student.fullName} - ${student.gender}`;
        studentList.appendChild(p);
      });
    }
  
    const filterStudents = () => {
      const search = document.getElementById('search').value.toLowerCase();
      const filtered = students.filter(student =>
        student.fullName.toLowerCase().includes(search)
      );
      renderStudents(filtered);
    }
  
    const sortStudents = () => {
      const sorted = [...students].sort((a, b) => a.fullName.localeCompare(b.fullName));
      renderStudents(sorted);
    }
  
    fetch('/students')
      .then(response => response.json())
      .then(data => {
        students = data;
        renderStudents(students);
      });
  
    document.getElementById('search').addEventListener('input', filterStudents);
    document.getElementById('sortButton').addEventListener('click', sortStudents);
    document.getElementById('logoutButton').addEventListener('click', () => {
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      window.location.href = '/views/signIN.html';
    });
  });
  