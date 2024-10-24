document.addEventListener('DOMContentLoaded', async function () {
    // Load Pyodide when the DOM is loaded
    window.pyodide = await loadPyodide();
    console.log('Pyodide loaded successfully');
    
    const textarea = document.querySelector('#user_code');
    
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Load the first question
    loadQuestion(currentQuestion);
});

// Array soal (contoh 15 soal)
const questions = [
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    },
    // Additional questions here...
    {
        question: "Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua...",
        input: ["1"],
        output: "3"
    }
];

// Array untuk menyimpan jawaban pengguna
let userAnswers = new Array(questions.length).fill(null);

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

    // Enable or disable navigation buttons based on question number
    document.querySelector('.back_button').disabled = questionNumber === 1;

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
        saveAnswer(currentQuestion); // Save the answer before moving
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
}

// Function to go to the previous question
function goToPreviousQuestion() {
    if (currentQuestion > 1) {
        saveAnswer(currentQuestion); // Save the answer before moving
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

// Function to save the user's answer for the current question
function saveAnswer(questionNumber) {
    const answer = document.getElementById("user_code").value; // Get the user input
    userAnswers[questionNumber - 1] = answer; // Save the answer in the array
}

// Function to submit the quiz and calculate the score
function submitQuiz() {
    let score = 0;

    // Compare the user's answers with the correct answers
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].output) {
            score += 100 / questions.length; // Calculate score
        }
    }

    // Display the final score
    alert(`Your final score is: ${score}`);
}

// Event listener untuk tombol check jawaban
document.querySelector('.check_button').addEventListener('click', function() {
    const answer = document.getElementById("user_code").value; // Ambil jawaban dari textarea
    const activeQuestion = document.querySelector('.numbers_grid .number.active').innerText; // Ambil nomor soal yang aktif
    saveAnswer(activeQuestion, answer); // Simpan jawaban
});

// Function to run the Python code using Pyodide
async function runPythonCode() {
    console.log("Tombol Check ditekan!");

    // Get the Python code from the textarea
    var code = document.getElementById("user_code").value;
    console.log("Kode Python dari user:", code);

    try {
        // Run the Python code with Pyodide
        let output = await pyodide.runPythonAsync(`
            import sys
            from io import StringIO

            output = StringIO()
            sys.stdout = output

            ${code}

            sys.stdout = sys.__stdout__  # Reset stdout
            output.getvalue()  # Return hasil output
        `);

        console.log("Output dari Python:", output);

        if (output.trim() !== "") {
            document.getElementById("output").innerHTML = ""; // Clear output area
            checkAnswer(output);  // Only check the answer, do not display unnecessary output
        } else {
            alert("Tidak ada output dari kode Anda. Coba lagi!");
        }

    } catch (err) {
        console.log("Error:", err);
        document.getElementById("output").innerHTML = err.toString();
    }
}

// Function to check the answer
function checkAnswer(output) {
    var userOutput = output.trim();
    var correctAnswer = "3";  // Correct answer for comparison

    console.log("User Output:", userOutput);
    console.log("Expected Output:", correctAnswer);

    // Compare user output to the correct answer
    let case1Score = userOutput === correctAnswer ? 100 : 0;
    displayGrade(case1Score);
}

// Function to display the grade
function displayGrade(finalScore) {
    const gradeBox = document.getElementById("grade_box");
    if (gradeBox) {
        gradeBox.style.display = "block"; // Only display if the element exists
    } else {
        console.error("Grade box element not found!");
    }

    const gradeElement = document.getElementById("grade");
    if (gradeElement) {
        gradeElement.innerText = finalScore.toFixed(2);
    }
}

// Function to update server time
function updateServerTime() {
    const timeElement = document.getElementById('server_time');
    const currentTime = new Date(); // Get the current time

    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');

    timeElement.innerText = `${hours}:${minutes}:${seconds}`;
}

// Call the updateServerTime function every second
setInterval(updateServerTime, 1000);

// Run the function immediately when the page first loads
updateServerTime();
