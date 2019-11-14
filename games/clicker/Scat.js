function buyCat() {
    //  var knifeCost = Math.floor(20 * Math.pow(1.1, knifes)); 
    var catCost = Math.floor(1000 * Math.pow(1.2, cats)); //works out the cost of this cursor
    if (dollars >= catCost) {                                   //checks that the player can afford the cursor
      cats = cats + 1;                                   //increases number of cursors
      dollars = dollars - catCost;                          //removes the knifes spent
      document.getElementById("cats").innerHTML = cats;  //updates the number of cursors for the user
      document.getElementById("dollars").innerHTML = dollars;  //updates the number of knifes for the user
    };
    var nextCost = Math.floor(1000 * Math.pow(1.15, cats));
    document.getElementById('catCost').innerHTML = nextCost;
  };