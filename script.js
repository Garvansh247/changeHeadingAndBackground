const changeColorBtn = document.getElementById("changeColorBtn");
const changeHeadingBtn = document.getElementById("changeHeadingBtn");
const stopHeadingChangeBtn = document.getElementById("stopHeadingChangeBtn");
const stopColorChangeBtn = document.getElementById("stopColorChangeBtn");

const resetButton = document.getElementById("resetButton");

const heading= document.getElementById("heading");

const tmpMsgHeading = document.getElementById("tmpMsgHeading");
const tmpMsgColor = document.getElementById("tmpMsgColor");
tmpMsgHeading.style.display = "none";
tmpMsgColor.style.display = "none";



const headings = ["Welcome to My Website", "Hello World!", "Enjoy Your Stay!", "Have a Great Day!", "Explore and Learn!", "Stay Curious!", "Coding is Fun!", "Create Something Amazing!"];


const generateColor = ()=>{
    let colors = "0123456789ABCDEF"; // or use "0123456789abcdef".split('');
    let color="#";
    for(let i=0;i<6;i++){
        const randomIndex = Math.floor(Math.random() * colors.length);
        color+=colors[randomIndex];
    }
    return color;
}


// const orginalBgColor = document.body.style.backgroundColor;
const orginalBgColor = getComputedStyle(document.body).backgroundColor;
const originalHeadingText = heading.textContent;
const originalTmpMsgHeadingText = tmpMsgHeading.innerHTML;
const originalTmpMsgColorText = tmpMsgColor.innerHTML;



let countdownInterval=null;
let colorChangeInterval=null;
let headerChange=null;
let countDown = 10;
changeHeadingBtn.addEventListener("click", function() {
    tmpMsgHeading.style.display = "block";
    tmpMsgHeading.innerHTML = originalTmpMsgHeadingText;
    tmpMsgHeading.setAttribute("style", "display: block;");
    countDown = 10;
    if(!countdownInterval) countdownInterval = setInterval(() => { // if you do not use if condition here then you will unrefernced the previous intervals or timeouts when you click change heading or change interval button so previous ones can't be cleared then as you have reference to only one of them so use if condition to create only one interval or timeout at a time
        countDown--;
        const countdownElem = tmpMsgHeading.querySelector("#headingCountdown");
        if (countdownElem) countdownElem.textContent = `${countDown}`; // safety check that whether span element exists or not so that we do not get null error at runtime
    }, 1000);
    if(!headerChange) headerChange= setTimeout(() => {
        heading.textContent = "Heading Changed!";
        tmpMsgHeading.textContent = `Heading changed after countdown!`;
        clearInterval(countdownInterval);
    }, 10000);
});

stopHeadingChangeBtn.addEventListener("click", function() {
        if(headerChange) clearTimeout(headerChange);
        if(countdownInterval) clearInterval(countdownInterval);
        if(countDown>0){
            heading.textContent = originalHeadingText;
            tmpMsgHeading.textContent = `Heading change stopped with ${countDown} seconds remaining.`;
        } else {
            tmpMsgHeading.textContent = `Heading change already completed. Please reset to try again.`;
        }
        countDown = 0;
        headerChange = null;
        countdownInterval = null;
    });



changeColorBtn.addEventListener("click", function() {
    tmpMsgColor.style.display = "block";
    tmpMsgColor.innerHTML = originalTmpMsgColorText;
    tmpMsgColor.setAttribute("style", "display: block;");
    if(!colorChangeInterval) colorChangeInterval = setInterval(() => {
        document.body.style.backgroundColor = generateColor();
    }, 1000);
    
});
stopColorChangeBtn.addEventListener("click", function() {
        if(colorChangeInterval)clearInterval(colorChangeInterval);
        tmpMsgColor.textContent = `Color change stopped. Please reset to go to original color.`;
        colorChangeInterval = null;
});



resetButton.addEventListener("click", function() {
  if(countdownInterval) clearInterval(countdownInterval);
  if(colorChangeInterval) clearInterval(colorChangeInterval);
  if(headerChange) clearTimeout(headerChange);

  document.body.style.backgroundColor = orginalBgColor;
  heading.textContent = originalHeadingText;
  tmpMsgHeading.innerHTML = originalTmpMsgHeadingText;
  tmpMsgColor.innerHTML = originalTmpMsgColorText;

  countdownInterval = null;
  colorChangeInterval = null;
  headerChange = null;
  countDown = 10;

  tmpMsgHeading.style.display = "none";
  tmpMsgColor.style.display = "none";

});
