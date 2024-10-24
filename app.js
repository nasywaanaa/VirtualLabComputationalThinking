document.addEventListener('DOMContentLoaded', async function () {
    // Load Pyodide when the DOM is loaded
    window.pyodide = await loadPyodide();
    console.log('Pyodide loaded successfully');
    
    const textarea = document.querySelector('#user_code');
    
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});

// Array soal (contoh 15 soal)
const questions = [
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
];

// Array untuk menyimpan jawaban pengguna
let userAnswers = new Array(questions.length).fill(null);
let userGrades = new Array(questions.length).fill(null);

let currentQuestion = 1; // Initialize with the first question

// Function to load the current question
function loadQuestion(questionNumber) {
    const question = questions[questionNumber - 1]; // Get the question based on the number

    // Update question text
    document.querySelector('.question_section .question_label').innerText = `Question ${questionNumber}`;
    document.querySelector('.question_section p').innerText = question.question;

    // Update input and output
    const inputElement = document.querySelector('.input_output_section .input_label').nextElementSibling;
    inputElement.innerHTML = ''; // Clear previous inputs
    question.input.forEach((input) => {
        inputElement.innerHTML += `<p>${input}</p>`;
    });

    document.querySelector('.input_output_section .output_label').nextElementSibling.innerText = question.output;

    // Clear the answer field
    document.getElementById("user_code").value = ''; // Clear the code input

    // Update the active question number in the UI
    const buttons = document.querySelectorAll('.numbers_grid .number');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[questionNumber - 1].classList.add('active');

    // Change the next button text to "Submit" on the last question
    const nextButton = document.querySelector('.next_button');
    if (questionNumber === questions.length) {
        nextButton.innerText = 'Submit'; // Change text to "Submit"
        nextButton.onclick = submitQuiz; // Change functionality to submit the quiz
    } else {
        nextButton.innerText = 'Next Question'; // Reset text to "Next Question"
        nextButton.onclick = goToNextQuestion; // Reset functionality to go to the next question
    }
}

// Function to go to the next question
function goToNextQuestion() {
    if (currentQuestion < questions.length) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
}

// Function to go to the previous question
function goToPreviousQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

// Initially load the first question when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadQuestion(currentQuestion);
});


// Fungsi untuk berpindah ke soal yang dipilih
function navigateToQuestion(questionNumber) {
    loadQuestion(questionNumber);  // Memuat soal yang sesuai
}


// Function to save the user's answer for the current question
function saveAnswer(questionNumber) {
    const answer = document.getElementById("user_code").value.trim(); // Get and trim the user input
    if (answer !== "") {  // Only save if there's an answer
        userAnswers[questionNumber - 1] = answer; // Save the answer in the array
    }
}

// Function to submit the quiz and calculate the score
function submitQuiz() {
    let score = 0;
    let unansweredQuestions = 0;

    // Compare the user's answers with the correct answers
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === null || userAnswers[i] === "") {
            unansweredQuestions++; // Count unanswered questions
        } else {
            score += questionGrades[i]; // Add the final grade for each answered question
        }
    }

    // Check if there are unanswered questions
    if (unansweredQuestions > 0) {
        alert(`You have ${unansweredQuestions} unanswered question(s). Please answer all questions before submitting.`);
    } else {
        // Display the final score if all questions are answered
        alert(`Your final score is: ${score}`);
    }
}


// Event listener for the "Check" button
document.querySelector('.check_button').addEventListener('click', function() {
    const answer = document.getElementById("user_code").value; // Get answer from the textarea
    const activeQuestion = Number(document.querySelector('.numbers_grid .number.active').innerText); // Get the active question number and convert to number
    saveAnswer(activeQuestion); // Save the answer
});


// Event listener untuk tombol submit
document.querySelector('.submit_button').addEventListener('click', submitQuiz);

// Fungsi untuk menjalankan kode Python
async function runPythonCode() {
    console.log("Tombol Check ditekan!");

    // Ambil kode Python dari textarea
    var code = document.getElementById("user_code").value;
    console.log("Kode Python dari user:", code);

    try {
        // Load Pyodide jika belum ter-load
        let pyodide = await loadPyodide();
        console.log("Pyodide berhasil di-load");  

        // Tangkap output print dari kode Python
        let output = await pyodide.runPythonAsync(`
            import sys
            from io import StringIO

            output = StringIO()
            sys.stdout = output

            # Eksekusi kode Python user
            ${code}

            sys.stdout = sys.__stdout__  # Reset stdout
            output.getvalue()  # Return hasil output
        `);

        console.log("Output dari Python:", output);

        // Cek apakah output ada dan hanya tampilkan jika diperlukan
        if (output.trim() !== "") {
            document.getElementById("output").innerHTML = ""; // Clear output area
            const activeQuestion = currentQuestion; // Get the current active question number
            checkAnswer(output, activeQuestion);  // Pass the question number to checkAnswer
        } else {
            alert("Tidak ada output dari kode Anda. Coba lagi!");
        }

    } catch (err) {
        console.log("Error:", err);
        document.getElementById("output").innerHTML = err.toString();
    }
}


// Fungsi untuk mengecek jawaban
function checkAnswer(output, questionNumber) {
    var userOutput = output.trim();
    var correctAnswer = questions[questionNumber - 1].output;  // Use the correct answer based on the current question

    console.log("User Output:", userOutput);
    console.log("Expected Output:", correctAnswer);

    // Define scores for each case
    let case1Score, case2Score, case3Score;

    // Case 1: Exact match
    if (userOutput === correctAnswer) {
        case1Score = 100; // Correct output
    } else {
        case1Score = 0; // Wrong output
    }

    // Case 2: Check for other conditions (adjust as needed)
    if (userOutput === correctAnswer) {
        case2Score = 100; // Correct output
    } else {
        case2Score = 0; // Wrong output
    }

    // Case 3: Any other cases (adjust as needed)
    if (userOutput === correctAnswer) {
        case3Score = 100; // Correct output
    } else {
        case3Score = 0; // Wrong output
    }

    // Calculate the final grade based on the case scores
    let finalGrade = (case1Score + case2Score + case3Score) / 3;
    userGrades[questionNumber - 1] = finalGrade; // Store the grade for this question
    displayGrade(finalGrade, case1Score, case2Score, case3Score);
}


// Fungsi untuk menampilkan grade dan mewarnai tombol
function displayGrade(finalScore, case1Score, case2Score, case3Score) {
    // Display the grade box
    const gradeBox = document.getElementById("grade_box");
    if (gradeBox) {
        gradeBox.style.display = "block"; // Only display if element exists
    } else {
        console.error("Grade box element not found!");
    }

    // Set the grade text
    const gradeElement = document.getElementById("grade");
    if (gradeElement) {
        gradeElement.innerText = finalScore.toFixed(2);
    }

    // Set the case scores
    const case1Element = document.getElementById("case1");
    if (case1Element) {
        case1Element.innerText = case1Score;
    }

    const case2Element = document.getElementById("case2");
    if (case2Element) {
        case2Element.innerText = case2Score;
    }

    const case3Element = document.getElementById("case3");
    if (case3Element) {
        case3Element.innerText = case3Score;
    }

    // Select the active question number (button) element
    const questionNumberElement = document.querySelector('.numbers_grid .number.active');

    if (questionNumberElement) {
        // Remove any existing color classes before adding the new one
        questionNumberElement.classList.remove('green', 'orange', 'red');

        // Add the appropriate color class based on the final grade
        if (finalScore === 100) {
            questionNumberElement.classList.add('green'); // Grade is 100, make it green
        } else if (finalScore > 0 && finalScore < 100) {
            questionNumberElement.classList.add('orange'); // Grade is between 0 and 100, make it orange
        } else if (finalScore === 0) {
            questionNumberElement.classList.add('red'); // Grade is 0, make it red
        }
    }
}

// Fungsi untuk memperbarui waktu di elemen server_time
function updateServerTime() {
    const timeElement = document.getElementById('server_time');
    const currentTime = new Date(); // Ambil waktu sekarang

    // Format waktu sebagai HH:MM:SS
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');

    // Update elemen dengan waktu yang sudah diformat
    timeElement.innerText = `${hours}:${minutes}:${seconds}`;
}

// Panggil fungsi updateServerTime setiap 1 detik (1000 ms)
setInterval(updateServerTime, 1000);

// Jalankan segera saat halaman pertama kali dimuat
updateServerTime();
