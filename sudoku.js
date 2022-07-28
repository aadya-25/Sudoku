var numSelected=null;
var tileSelected=null;

var errors=0;
var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var sol = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]


window.onload=function()
{
    setGame();
}

/*prepare the board*/
function setGame()
{
    //digits 1-9 for lower one
    for(let i =1;i<=9;i++)
    {
        //incase of html 
        //<div id=1 class number>1</div>
        //but we use js as in here we can use for loop
        let number=document.createElement("div");      //div name=number
        number.id=i;
        number.innerText=i;
        number.addEventListener("click",selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);

    }

    //for board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if(board[r][c] != "-"){   
            tile.innerText=board[r][c];
            tile.classList.add("tile-start");
            }                    //board filled excluding -
            if(r==2|| r==5)
            {
                tile.classList.add("horizontal-line")
            }
            if(c==2 || c==5)
            {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click",selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile); 


        }
    }
}
function selectNumber()
{
    if(numSelected!=null)
    {
        //remove gray background from it
        numSelected.classList.remove("number-selected"); 
    }
    // this is div itself
    numSelected=this;
    //and add to new selected
    numSelected.classList.add("number-selected");
}

//////
let coords=this.id.split("-"); 
        
        let row =parseInt(coords[0]);
        let col =parseInt(coords[1]);
        let num =parseInt(numSelected.id)
        
function isSafe(board, row, col, num)
{
     
    // Row has the unique (row-clash)
    for(let d = 0; d < board.length; d++)
    {
         
        // Check if the number we are trying to
        // place is already present in
        // that row, return false;
        if (board[row][d] == num)
        {
            return false;
        }
    }
 
    // Column has the unique numbers (column-clash)
    for(let r = 0; r < board.length; r++)
    {
          
        // Check if the number
        // we are trying to
        // place is already present in
        // that column, return false;
        if (board[r][col] == num)
        {
            return false;
        }
    }
 
    // Corresponding square has
    // unique number (box-clash)
    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;
 
    for(let r = boxRowStart;
            r < boxRowStart + sqrt; r++)
    {
        for(let d = boxColStart;
                d < boxColStart + sqrt; d++)
        {
            if (board[r][d] == num)
            {
                return false;
            }
        }
    }
 
    // If there is no clash, it's safe
    return true;
}
 
function solveSudoku(board, n)
{
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            if (board[i][j] == 0)
            {
                row = i;
                col = j;
 
                // We still have some remaining
                // missing values in Sudoku
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty)
        {
            break;
        }
    }
 
    // No empty space left
    if (isEmpty)
    {
        return true;
    }
 
    // Else for each-row backtrack
    for(let num = 1; num <= n; num++)
    {
        if (isSafe(board, row, col, num))
        {
            board[row][col] = num;
            if (solveSudoku(board, n))
            {
                 
                // print(board, n);
                return true;
            }
            else
            {
                 
                // Replace it
                board[row][col] = 0;
            }
        }
    }
    return false;
}
 
///////

let N = board.length;
 
solveSudoku(sol, N);




function selectTile()
{
    if(numSelected)
    { if(this.innerText!="")  //that means we have something
       {return;
       }
        
        //get coordinates of this tile
        let coords=this.id.split("-"); //[0,0]
        //because these were strings , have to parse it to int
        let r =parseInt(coords[0]);
        let c =parseInt(coords[1]);


        //checking
        

        
        if(sol[r][c]==numSelected.id)
        {
            this.innerText=numSelected.id;
        }
        else{
            errors+=1;
            document.getElementById("errors").innerText=errors; //display of errors div
            }
        
   
    }
}