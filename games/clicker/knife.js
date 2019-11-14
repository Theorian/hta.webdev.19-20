var knifes = 0;
function buyKnife() {
    //  var knifeCost = Math.floor(20 * Math.pow(1.1, knifes)); 
    var knifeCost = Math.floor(20 * Math.pow(1.2, knifes)); //works out the cost of this cursor
    if (dollars >= knifeCost) {                                   //checks that the player can afford the cursor
      knifes = knifes + 1;                                   //increases number of cursors
      dollars = dollars - knifeCost;                          //removes the knifes spent
      document.getElementById("knifes").innerHTML = knifes;  //updates the number of cursors for the user
      document.getElementById("dollars").innerHTML = dollars;  //updates the number of knifes for the user
    };
    var nextCost = Math.floor(20 * Math.pow(1.2, knifes));
    document.getElementById('knifeCost').innerHTML = nextCost;
  };
  function mug() {
    //  var knifeCost = Math.floor(20 * Math.pow(1.1, knifes)); 
    var mugCost = 1; //works out the cost of this cursor
    if (knifes >= mugCost) {                                   //checks that the player can afford the cursor
      dollars = dollars + Math.floor(20 * Math.pow(1.2, knifes));                                   //increases number of cursors
      knifes = knifes - mugCost;                          //removes the knifes spent
      document.getElementById("knifes").innerHTML = knifes;  //updates the number of cursors for the user
      document.getElementById("mug").innerHTML = mug;
      document.getElementById("dollars").innerHTML = dollars;//updates the number of knifes for the user
    };
    var nextCost = Math.floor(20 * Math.pow(1.2, dollars));
    document.getElementById('dollars').innerHTML = nextCost;
  };