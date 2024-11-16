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