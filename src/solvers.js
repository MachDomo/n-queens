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
  let solution = new Board({'n': n}); //fixme
  // hasAnyRooksConflicts()
  let rookRecursion = function(row, col) {
    // togglePiece(current row and column)

    // Base Case - We stop when we find a solution for row = N
    // What happens when we don't find a solution


    solution.togglePiece(row, col);
    if (solution.hasAnyRooksConflicts()) {
    // if conflict, togglePiece(current row and column)
      solution.togglePiece(row, col);
      if (col + 1 < n) {
        rookRecursion(row, col + 1);
      }
    } else {
      if (row + 1 < n) {
        rookRecursion(row + 1, 0);
      }

    }

    // if no conflicts
    // call rookRecursion on next row
    // if we are about to go over n - 1 on rows, then don't do next line

    // iterate through column
    // return array of arrays (solution.attributes)
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
  var solutionCount = 0; //fixme
  let solution = new Board({'n': n});

  let rookRecursion = function(row) {
    // togglePiece(current row and column)

    // Base Case - We stop when we find a solution for row = N

    // What happens when we don't find a solution

    //solution.attributes[row] = Array(n).fill(0);
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
          //console.log(solution.attributes);
          solutionCount++;
          solution.togglePiece(row, i);

        }
      }
    }
    // if no conflicts
    // call rookRecursion on next row
    // if we are about to go over n - 1 on rows, then don't do next line

    // iterate through column
    // return array of arrays (solution.attributes)
  };
  rookRecursion(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // hasAnyQueenConflictsOn(rowIndex, colIndex)
  let solution = new Board({'n': n}); //fixme
  let array = [];
  // hasAnyRooksConflicts()
  if (n === 2 || n === 3) {
    for (let i = 0; i < n; i++) {
      array.push(solution.attributes[i]);

    }
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(array));
    return array;
  }

  let rookRecursion = function(row, col) {
    // togglePiece(current row and column)

    // Base Case - We stop when we find a solution for row = N
    // What happens when we don't find a solution


    for (let i = 0; i < n; i++) {

      solution.togglePiece(row, i);
      if (solution.hasAnyQueensConflicts()) {
      // if conflict, togglePiece(current row and column)
        solution.togglePiece(row, i);

      } else {
        if (row + 1 < n) {
          rookRecursion(row + 1, 0);
          solution.togglePiece(row, i);
          if (array.length === n) {
            return;
          }
        } else if (row === n - 1) {
          //console.log(solution.attributes);
          for (let i = 0; i < n; i++) {
            array.push(solution.attributes[i].slice());
          }
          return;


        }
      }
    }

    // if no conflicts
    // call rookRecursion on next row
    // if we are about to go over n - 1 on rows, then don't do next line

    // iterate through column
    // return array of arrays (solution.attributes)
  };
  rookRecursion(0, 0);



  console.log('Single solution for ' + n + ' queens:', JSON.stringify(array));
  return array;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  let solution = new Board({'n': n});

  let rookRecursion = function(row) {
    // togglePiece(current row and column)

    // Base Case - We stop when we find a solution for row = N

    // What happens when we don't find a solution

    //solution.attributes[row] = Array(n).fill(0);
    for (let i = 0; i < n; i++) {

      solution.togglePiece(row, i);
      if (solution.hasAnyQueensConflicts()) {
      // if conflict, togglePiece(current row and column)
        solution.togglePiece(row, i);

      } else {
        if (row + 1 < n) {
          rookRecursion(row + 1, 0);
          solution.togglePiece(row, i);
        } else if (row === n - 1) {
          //console.log(solution.attributes);
          solutionCount++;
          solution.togglePiece(row, i);




        }
      }
    }
    // if no conflicts
    // call rookRecursion on next row
    // if we are about to go over n - 1 on rows, then don't do next line

    // iterate through column
    // return array of arrays (solution.attributes)
  };
  rookRecursion(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
