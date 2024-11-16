function saveStudentData() {
    const fileInput = document.getElementById('file');
    const reader = new FileReader();

    reader.onload = function (e) {
        const photo = e.target.result;

        const student = {
            name: document.getElementById('name').value,
            fatherName: document.getElementById('fatherName').value,
            studentId: document.getElementById('studentId').value,
            lastname: document.getElementById('lastname').value,
            age: document.getElementById('age').value,
            photo: photo,
            gender: document.getElementById('gender').value,
            percentage: document.getElementById('percentage').value,
            department: document.getElementById('department').value
        };

        let students = JSON.parse(localStorage.getItem('students')) || [];
        const editingIndex = localStorage.getItem('editingStudentIndex');

        if (editingIndex !== null) {
            students[editingIndex] = student;
            localStorage.removeItem('editingStudentIndex');
            alert('Student data updated successfully');
        } else {
            students.push(student);
            alert('Student data saved successfully'); 
        }

        localStorage.setItem('students', JSON.stringify(students));
        document.getElementById('studentForm').reset();
        loadStudents();
    };

    if (fileInput.files.length > 0) { 
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert('Please select a photo.');
    }
}
function validateForm() {
    const inputs = document.querySelectorAll('#studentForm input, #studentForm select');
    for (let input of inputs) {
        if (input.value.trim() === '') {
            alert('Please fill out all fields.');
            return false;
        }
    }

    const age = parseFloat(document.getElementById('age').value);
    if (isNaN(age) || age > 90) {
        alert('Age must be a number less than or equal to 90.');
        return false;
    }

    const percentage = parseFloat(document.getElementById('percentage').value);
    if (isNaN(percentage) || percentage >= 101) {
        alert('Percentage must be a number less than or equal to 100.');
        return false;
    }

    const gender = document.getElementById('gender').value;
    if (gender === "Your Gender") {
        alert('Please select either Male or Female for gender.');
        return false;
    }

    saveStudentData();
    return true;
}
function loadStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || []; // اصلاح شده
    const tableBody = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    const topStudentsDiv = document.getElementById('topStudents');

    tableBody.innerHTML = '';
    topStudentsDiv.innerHTML = '';

    students.forEach(function (student, index) {
        const newRow = tableBody.insertRow();
        newRow.innerHTML =
            `<td><img src="${student.photo}" alt="Student Photo" width="50" height="50" style="border-radius: 50%;"></td>
            <td>${student.studentId}</td>
            <td>${student.name}</td>
            <td>${student.lastname}</td>
            <td>${student.fatherName}</td>
            <td>${student.department}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.percentage}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>`;
            if (parseFloat(student.percentage) > 90) {
                const profileDiv = document.createElement('div');
                profileDiv.className = 'profile';
    
                profileDiv.innerHTML =
                    `<img src="${student.photo}" alt="Student Photo" class="profile-photo">
                    <h4>${student.name} ${student.lastname}</h4>
                    <p>${student.department || 'N/A'}</p>
                    <p>Percentage: ${student.percentage}</p>
                    <p>Congratulations to ${student.name} for outstanding performance!</p>`;
                topStudentsDiv.appendChild(profileDiv);
            }
    });
}
function previewFile() {
    const file = document.getElementById('file').files[0];
    const preview = document.getElementById('photoPreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            preview.src = reader.result;
        }
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}
function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    localStorage.setItem('editingStudentIndex', index);
    window.location.href = 'information.html';
}
function loadEditingStudent() {
    const editingIndex = localStorage.getItem('editingStudentIndex');
    if (editingIndex !== null) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students[editingIndex];

        if (student) {
            document.getElementById('name').value = student.name;
            document.getElementById('fatherName').value = student.fatherName;
            document.getElementById('studentId').value = student.studentId;
            document.getElementById('lastname').value = student.lastname;
            document.getElementById('age').value = student.age;
            document.getElementById('gender').value = student.gender;
            document.getElementById('percentage').value = student.percentage;
            document.getElementById('department').value = student.department;
            document.getElementById('photoPreview').src = student.photo;
            document.getElementById('submit-btn').innerText = "Update";
        }
    }
}
window.onload = loadEditingStudent();
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}
