var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


var elRet = function (id) {
    return document.getElementById(id); 
};


//Constants for earnings
var monthEarning = getCookie("monthEarning");
var monthRent = getCookie("monthRent");
var monthBills = getCookie("monthBills");
var monthLoan = getCookie("monthLoan");
var monthGrocery = getCookie("monthGrocery");
var monthFood = getCookie("monthFood");
var monthGas = getCookie("monthGas");
var monthMisc = getCookie("monthMisc");
var monthSavings = monthEarning - monthRent - monthBills - monthLoan - monthGrocery - monthFood - monthGas - monthMisc


//Typewriter welcome
function welcomeText(){
    var i = 0;
    var txt = 'Please enter your income to begin.'; /* The text */
    var speed = 50; /* The speed/duration of the effect in milliseconds */

    function typeWriter() {
    if (i < txt.length) {
        document.getElementById("welcomeText").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
    }
    typeWriter()
}

function deleteAllCookies() {
    var incomeDisplay = document.getElementById("incomeSection");
    var expenseDisplay = document.getElementById("expenseSection");
    incomeDisplay.style.display = "flex";
    expenseDisplay.style.display = "none";
    
    setCookie("monthEarning", 0, 30) 
    setCookie("monthRent", 0, 30) 
    setCookie("monthBills", 0, 30) 
    setCookie("monthLoan", 0, 30) 
    setCookie("monthGrocery", 0, 30) 
    setCookie("monthFood", 0, 30) 
    setCookie("monthGas", 0, 30) 
    setCookie("monthMisc", 0, 30) 
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
var name = cname + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
    c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
    return parseInt(c.substring(name.length, c.length));
    }
}
return 0;
}

function checkCookie() {
    var incomeDisplay = document.getElementById("incomeSection");
    var expenseDisplay = document.getElementById("expenseSection");
    var rentAmount = getCookie("monthEarning");
    if (rentAmount > 0) {
      incomeDisplay.style.display = "none";
      expenseDisplay.style.display = "flex";
    } else {
       incomeDisplay.style.display = "flex";
       expenseDisplay.style.display = "none";
       welcomeText()
    }
}

//Enter Income
var enterIncome = function() {
    var income = parseFloat(elRet("income").value);
    var incomeDisplay = document.getElementById("incomeSection");
    var expenseDisplay = document.getElementById("expenseSection");
    if(validEntry(income) == true){
        incomeDisplay.style.display = "none";
        expenseDisplay.style.display = "flex";
        setCookie("monthEarning", income, 30)
        monthSavings = income;
        drawChart();
    };
};

//Verify proper entry
function validEntry(entry){
    if (isNaN(entry)) {
        alert("You must enter a value");
    //validate subtotal
    } 
    else if (entry <= 0 ) {
        alert("Earnings must be > 0");
    }
    else{
        return true
    }  
}

var addExpense = function() {
    var expenseAmount = parseFloat(elRet("addexpense").value);
    var expenseToAdd = elRet("expenseType").value;
    if (expenseToAdd == "rent"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthRent + expenseAmount)
            monthRent += expenseAmount
            setCookie("monthRent", newAmount, 30)
            drawChart();
            location.reload();
        }   
    } 
    else if (expenseToAdd == "bills"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthBills + expenseAmount)
            monthBills += expenseAmount
            setCookie("monthBills", newAmount, 30)
            location.reload();
            
        }   
    }
    else if (expenseToAdd == "loan"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthLoan + expenseAmount)
            monthLoan += expenseAmount
            setCookie("monthLoan", newAmount, 30)
            location.reload();
        }   
    } 
    else if (expenseToAdd == "grocery"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthGrocery + expenseAmount)
            monthGrocery += expenseAmount
            setCookie("monthGrocery", newAmount, 30)
            location.reload();
        }   
    } 
    else if (expenseToAdd == "food"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthFood + expenseAmount)
            monthFood += expenseAmount
            setCookie("monthFood", newAmount, 30)
            location.reload();
        }   
    } 
    else if (expenseToAdd == "gas"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthGas + expenseAmount)
            monthGas += expenseAmount
            setCookie("monthGas", newAmount, 30)
            location.reload();
        }   
    } 
    else if (expenseToAdd == "misc"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthMisc + expenseAmount)
            monthMisc += expenseAmount
            setCookie("monthMisc", newAmount, 30)
            location.reload();
        }   
    } 
};

var subtractExpense = function() {
    var expenseAmount = parseFloat(elRet("addexpense").value);
    var expenseToAdd = elRet("expenseType").value;
    
    if (expenseToAdd - expenseAmount > 0){
        alert("You cannot subtract more than you put in.")
        
    }
    if (expenseToAdd == "rent"){
        if(validEntry(expenseAmount) == true ){
            newAmount = (monthRent - expenseAmount)
            if (newAmount < 0){
                alert("You cannot subtract more than you put in.")
              return;  
            }
            monthRent -= expenseAmount
            setCookie("monthRent", newAmount, 30)
            location.reload();
            
        }   
    } 
    else if (expenseToAdd == "bills"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthBills - expenseAmount)
            if (newAmount < 0){
                alert("You cannot subtract more than you put in.")
              return;  
            }
            monthBills -= expenseAmount
            setCookie("monthBills", newAmount, 30)
            location.reload();
            
        }   
    }
    else if (expenseToAdd == "loan"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthLoan - expenseAmount)
            if (newAmount < 0){
                alert("You cannot subtract more than you put in.")
              return;  
            }
            monthLoan -= expenseAmount
            setCookie("monthLoan", newAmount, 30)
            location.reload();
        }   
    } 
    else if (expenseToAdd == "grocery"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthGrocery - expenseAmount)
            if (newAmount < 0){
                alert("You cannot subtract more than you put in.")
              return;  
            }
            monthGrocery -= expenseAmount
            setCookie("monthGrocery", newAmount, 30)
            location.reload();
        }   
    } 
    else if (expenseToAdd == "food"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthFood - expenseAmount)
            if (newAmount < 0){
                alert("You cannot subtract more than you put in.")
              return;  
            }
            monthFood -= expenseAmount
            setCookie("monthFood", newAmount, 30)
            location.reload();
        }   
    } 
    else if (expenseToAdd == "gas"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthGas - expenseAmount)
            if (newAmount < 0){
                alert("You cannot subtract more than you put in.")
              return;  
            }
            monthGas -= expenseAmount
            setCookie("monthGas", newAmount, 30)
            location.reload();
        }   
    } 
    else if (expenseToAdd == "misc"){
        if(validEntry(expenseAmount) == true){
            newAmount = (monthMisc - expenseAmount)
            if (newAmount < 0){
                alert("You cannot subtract more than you put in.")
              return;  
            }
            monthMisc -= expenseAmount
            setCookie("monthMisc", newAmount, 30)
            location.reload();
        }   
    } 
};

function showbutton(){
    if ((elRet("buttons").style.display) = "none"){
        $('#buttons').slideToggle(200);
    };
}
//Drawing Google Chart
function drawChart() {
    if (monthSavings < 0){
        monthSavings = 0;
    }
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Rent', monthRent],
        ['Bills',      monthBills],
        ['Debt',  monthLoan],
        ['Groceries', monthGrocery],
        ['Food',    monthFood],
        ['Gas', monthGas],
        ['Misc', monthMisc],
        ['Remainder', monthSavings]
    ]);

    var options = {
        title: 'Monthly Spending'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    
    chart.draw(data, options);
    }

function showhidesubtract() {
    $('#subtractsection').slideToggle(200);
}

function showhideadd() {
    $('#addsection').slideToggle(200);
}

//startup function
window.onload = function() {
    //process/clear buttons
    elRet("incomeButton").onclick = enterIncome;
    elRet("addExpense").onclick = addExpense;
    elRet("subtractExpense").onclick = subtractExpense;
    elRet("clearCookies").onclick = deleteAllCookies;


    checkCookie()
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
   
    window.onresize = function(){ location.reload(); }

    
};



