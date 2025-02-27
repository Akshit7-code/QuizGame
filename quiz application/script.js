const optionsdiv = document.getElementById('optionsdiv');
const quizquestion = document.getElementById('quizquestion');
const Next = document.getElementById('Next');
const Pre = document.getElementById('Pre');
const sumbit = document.getElementById('sumbit');
const result = document.getElementById('result');
const totalquestion = document.getElementById('total-question');
const resultcontainer=document.getElementById("result-container");
const conttainer=document.querySelector('.quiz-container');
const quizresult=document.querySelector('.quiz-result');

const Quizquestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: 2
    },
    {
        question: "Who wrote 'Harry Potter'?",
        options: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "Stephen King"],
        answer: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2
    },
    {
        question: "Which country won the FIFA World Cup in 2018?",
        options: ["Germany", "Argentina", "Brazil", "France"],
        answer: 3
    },
    {
        question: "What is 15 + 25?",
        options: ["30", "40", "50", "60"],
        answer: 1
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Iron"],
        answer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: 2
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["90°C", "100°C", "110°C", "120°C"],
        answer: 1
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        options: ["Elephant", "Tiger", "Lion", "Gorilla"],
        answer: 2
    },
];

let currentQuestionIndex = 0;

let indexof = 0;
let count = 0;
result.innerHTML = count;

function showQuestion() {
    let question = Quizquestions[currentQuestionIndex];
    optionsdiv.innerHTML = ''; 
    optionsdiv.classList.remove('disabled');
    totalquestion.innerHTML=currentQuestionIndex+1;

    if(currentQuestionIndex<1){
        Pre.style.display='none';
    }
    if(currentQuestionIndex>=Quizquestions.length-1){
        Next.style.display='none';
        sumbit.style.display='inline-block';
    }
    
    quizquestion.innerHTML=question.question;

    let options = document.createElement('div');
    options.innerHTML = `
        <div class='option' data-value='0'>${question.options[0]}</div>
        <div class='option' data-value='1'>${question.options[1]}</div>
        <div class='option' data-value='2'>${question.options[2]}</div>
        <div class='option' data-value='3'>${question.options[3]}</div>
    `;

    optionsdiv.appendChild(options);

    let allOptions = options.querySelectorAll('.option');

    allOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            if (optionsdiv.classList.contains('disabled')) return; 

            optionsdiv.classList.add('disabled'); 
            indexof = event.target.getAttribute('data-value');

            if (indexof == question.answer) {
                event.target.classList.add('answer'); 
                count++;
                result.innerHTML = count;
            } else {
                event.target.classList.add('wrong'); 
                allOptions[question.answer].classList.add('answer'); 
            }

            
            allOptions.forEach(opt => opt.classList.add('disabled'));
        });
    });
}

showQuestion();


Next.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex > Quizquestions.length) {
        sumbit.style.display='inline-block';
    }
    Pre.style.display='inline-block';
    showQuestion();
});

Pre.addEventListener('click', () => {
    currentQuestionIndex--;
    if (currentQuestionIndex < 0) {
        currentQuestionIndex = Quizquestions.length - 1;
    }
    Next.style.display='inline-block';
    sumbit.style.display='none';
    showQuestion();
});

sumbit.addEventListener('click',()=>{
    conttainer.style.display='none';
    resultcontainer.style.display='none';
    quizresult.style.display='block';
    if(count>=7){
        document.getElementById('headingwinner').innerHTML='Great Job!';
        document.getElementById('img').src = 'images/10556764-removebg-preview.png';
        document.getElementById('scorecard').innerHTML=count;
    }
    else{
        document.getElementById('headingwinner').innerHTML='Well played';
        document.getElementById('img').src = 'images/10478816-removebg-preview.png';
        document.getElementById('scorecard').innerHTML=count;

    }
});
document.getElementById('Restart').addEventListener('click',()=>{
    conttainer.style.display='block';
    resultcontainer.style.display='block';
    quizresult.style.display='none';
    Pre.style.display='inline-block';
    Next.style.display='inline-block';
    sumbit.style.display='none';
    currentQuestionIndex = 0;
    showQuestion();
});