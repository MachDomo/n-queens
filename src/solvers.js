/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// togglePiece(rowIndex, columnIndex)


window.findNRooksSolution = function(n) {
  let solution = new Board({'n': n});
  // hasAnyRooksConflicts()
  let rookRecursion = function(row, col) {

    solution.togglePiece(row, col);

    if (solution.hasAnyRooksConflicts()) {
      solution.togglePiece(row, col);

      if (col + 1 < n) {
        rookRecursion(row, col + 1);
      }
    } else {
      if (row + 1 < n) {
        rookRecursion(row + 1, 0);
      }
    }
  };

  rookRecursion(0, 0);
  var array = [];

  for (let i = 0; i < n; i++) {
    array.push(solution.attributes[i]);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(array));
  return array;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0; //fixme
  let solution = new Board({'n': n});
  let returnSwitch = false;

  let rookRecursion = function(row) {
    for (let i = 0; i < n; i++) {
      solution.togglePiece(row, i);

      if (solution.hasAnyRooksConflicts()) {
      // if conflict, togglePiece(current row and column)
        solution.togglePiece(row, i);

      } else {

        if (row + 1 < n) {
          rookRecursion(row + 1, 0);
          solution.togglePiece(row, i);
          if (returnSwitch) {
            return;
          }

        } else if (row === n - 1) {
          if (solution.attributes[0][n / 2] === 1 && n % 2 === 0) {
            solutionCount *= 2;
            returnSwitch = true;
            return;
          }
          solutionCount++;
          solution.togglePiece(row, i);

        }
      }
    }
  };
  rookRecursion(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  let solution = new Board({'n': n});
  let array = [];

  if (n === 2 || n === 3) {

    for (let i = 0; i < n; i++) {
      array.push(solution.attributes[i]);
    }

    console.log('Single solution for ' + n + ' queens:', JSON.stringify(array));
    return array;
  }

  let rookRecursion = function(row, col) {
    for (let i = 0; i < n; i++) {

      solution.togglePiece(row, i);

      if (solution.hasAnyQueensConflictsOn(row, i)) {
        solution.togglePiece(row, i);

      } else {

        if (row + 1 < n) {
          rookRecursion(row + 1, 0);
          solution.togglePiece(row, i);

          if (array.length === n) {
            return;
          }

        } else if (row === n - 1) {

          for (let i = 0; i < n; i++) {
            array.push(solution.attributes[i].slice());
          }
          return;
        }
      }
    }
  };
  rookRecursion(0, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(array));
  return array;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0; //fixme
  let solution = new Board({'n': n});

  let queenRecursion = function(row) {

    for (let i = 0; i < n; i++) {
      solution.togglePiece(row, i);

      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(row, i);

      } else {

        if (row + 1 < n) {
          queenRecursion(row + 1, 0);
          solution.togglePiece(row, i);

        } else if (row === n - 1) {
          solutionCount++;
          solution.togglePiece(row, i);
        }
      }
    }
  };

  let queenEvenRecursion = function(row) {
    var returnSwitch = false;
    for (let i = 0; i < n; i++) {
      solution.togglePiece(row, i);

      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(row, i);

      } else {

        if (row + 1 < n) {
          queenRecursion(row + 1, 0);
          solution.togglePiece(row, i);
          if (returnSwitch) {
            return;
          }

        } else if (row === n - 1) {
          //check if position (0, n/2) double solution and return
          if (this.attributes[0][n / 2] === 1) {
            solutionCount *= 2;
            returnSwitch = true;
            return;
          }
          solutionCount++;
          solution.togglePiece(row, i);
        }
      }
    }
  };

  if (n % 2 === 0) {
    queenEvenRecursion(0);
  } else {
    queenRecursion(0);
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



/*
======================================================================
Old Code
======================================================================
*/



window.oldCountNRooksSolutions = function(n) {
  let solutionCount = 0; //fixme
  let solution = new Board({'n': n});
  let returnSwitch = false;

  let rookRecursion = function(row) {
    for (let i = 0; i < n; i++) {
      solution.togglePiece(row, i);

      if (solution.hasAnyRooksConflicts()) {
      // if conflict, togglePiece(current row and column)
        solution.togglePiece(row, i);

      } else {

        if (row + 1 < n) {
          rookRecursion(row + 1, 0);
          solution.togglePiece(row, i);


        } else if (row === n - 1) {

          solutionCount++;
          solution.togglePiece(row, i);

        }
      }
    }
  };
  rookRecursion(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


window.oldCountNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0; //fixme
  let solution = new Board({'n': n});

  let queenRecursion = function(row) {

    for (let i = 0; i < n; i++) {
      solution.togglePiece(row, i);

      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(row, i);

      } else {

        if (row + 1 < n) {
          queenRecursion(row + 1, 0);
          solution.togglePiece(row, i);

        } else if (row === n - 1) {
          solutionCount++;
          solution.togglePiece(row, i);
        }
      }
    }
  };

  queenRecursion(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
