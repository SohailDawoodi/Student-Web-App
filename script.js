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