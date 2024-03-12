function assignColors() {
    // Define the colors
    var colors = ["green", "blue", "pink", "orange"];

    // Shuffle the colors array
    colors.sort(() => Math.random() - 0.5);

    // Assign a unique color to each player
    var player1Color = colors[0];
    var player2Color = colors[1];

    // Return the assigned colors
    return [player1Color, player2Color];
}