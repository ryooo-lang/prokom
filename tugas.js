document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const courseId = document.getElementById('courseId').value;
    const assignmentId = document.getElementById('assignmentId').value;
    const fileId = document.getElementById('fileId').value;

    const studentSubmission = {
        "assignmentId": assignmentId,
        "submission": {
            "state": "TURNED_IN",
            "attachments": [
                {
                    "driveFile": {
                        "id": fileId
                    }
                }
            ]
        }
    };

    // Panggil fungsi untuk mengumpulkan tugas
    submitAssignment(courseId, assignmentId, studentSubmission);
});

function submitAssignment(courseId, assignmentId, studentSubmission) {
    const url = `https://drive.google.com/drive/folders/1VCl6hWQ1e1UeaHkJbSwBFj-GgGM8wtA4/${courseId}/courseWork/${assignmentId}/studentSubmissions`;

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + getAccessToken(), // Ganti dengan token akses yang valid
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentSubmission)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Gagal mengumpulkan tugas: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('message').textContent = 'Tugas berhasil dikumpulkan!';
        document.getElementById('message').style.color = 'green';
    })
    .catch(error => {
        document.getElementById('message').textContent = error.message;
    });
}

// Fungsi untuk mendapatkan token akses (Anda perlu mengimplementasikan ini)
function getAccessToken() {
    // Implementasikan logika untuk mendapatkan token akses
    // Misalnya, menggunakan OAuth 2.0 untuk mendapatkan token
    return 'YOUR_ACCESS_TOKEN'; // Ganti dengan token akses yang valid
}