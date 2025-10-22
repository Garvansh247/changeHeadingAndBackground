const changeColorBtn = document.getElementById("changeColorBtn");
const changeHeadingBtn = document.getElementById("changeHeadingBtn");
const stopHeadingChangeBtn = document.getElementById("stopHeadingChangeBtn");
const stopColorChangeBtn = document.getElementById("stopColorChangeBtn");

const heading= document.getElementById("heading");

const tmpMsgHeading = document.getElementById("tmpMsgHeading");
const tmpMsgColor = document.getElementById("tmpMsgColor");


const headings = ["Welcome to My Website", "Hello World!", "Enjoy Your Stay!", "Have a Great Day!", "Explore and Learn!", "Stay Curious!", "Coding is Fun!", "Create Something Amazing!"];

let colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD"];


const orginalBgColor = document.body.style.backgroundColor;
const originalHeadingText = heading.textContent;
const originalTmpMsgHeadingText = tmpMsgHeading.innerHTML;
const originalTmpMsgColorText = tmpMsgColor.innerHTML;


const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function() {
    document.body.style.backgroundColor = orginalBgColor;
    heading.textContent = originalHeadingText;
    tmpMsgHeading.innerHTML = originalTmpMsgHeadingText;
    tmpMsgColor.innerHTML = originalTmpMsgColorText;
});

changeHeadingBtn.addEventListener("click", function() {
    tmpMsgHeading.innerHTML = originalTmpMsgHeadingText;
    tmpMsgHeading.setAttribute("style", "display: block;");
    let countDown = 10;
    const countdownInterval = setInterval(() => {
        countDown--;
        tmpMsgHeading.querySelector("#headingCountdown").textContent = `${countDown}`;
    }, 1000);
    const headerChange= setTimeout(() => {
        heading.textContent = "Heading Changed!";
        tmpMsgHeading.textContent = `Heading changed after countdown!`;
        clearInterval(countdownInterval);
    }, 10000);
    stopHeadingChangeBtn.addEventListener("click", function() {
        clearTimeout(headerChange);
        clearInterval(countdownInterval);
        if(countDown>0){
            heading.textContent = originalHeadingText;
            tmpMsgHeading.textContent = `Heading change stopped with ${countDown} seconds remaining.`;
        } else {
            tmpMsgHeading.textContent = `Heading change already completed. Please reset to try again.`;
        }
        countDown = 0;
    });
});

changeColorBtn.addEventListener("click", function() {
    tmpMsgColor.innerHTML = originalTmpMsgColorText;
    tmpMsgColor.setAttribute("style", "display: block;");
    let colorChangeInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        document.body.style.backgroundColor = colors[randomIndex];
    }, 1000);
    stopColorChangeBtn.addEventListener("click", function() {
        clearInterval(colorChangeInterval);
        tmpMsgColor.textContent = `Color change stopped. Please reset to go to original color.`;
    });
});
