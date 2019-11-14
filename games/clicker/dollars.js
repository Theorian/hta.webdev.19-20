var dollars = 0;
function updateDollarCount() {
    dollars++;
    document.getElementById("dollarCount").innerHTML = dollars;
  };
  
  function dollarClick(number) {
    dollars = dollars + number; 
    document.getElementById("dollars").innerHTML = dollars;
  };
  
  function dollarsPerSecond() {
    dps = cats * 5;
    document.getElementById("dps").innerHTML = dps;
    document.getElementById("cats").innerHTML = cats;
  }
  window.setInterval(function () {
    dollarClick(5 * cats);
  }, 1000);