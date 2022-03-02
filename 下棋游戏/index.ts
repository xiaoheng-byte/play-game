//定义两个玩家
enum Player{
    X='x',
    O='o',
}
//所有可能赢的情况
let winsArr = [
    [0,1,2],[3,4,5],[6,7,8],    // 横
    [1,3,6],[1,4,7],[2,5,8],    // 竖
    [0,4,8],[2,4,6]             // 斜
]
//获取所有class = cell的元素，所有格子
let cells = document.querySelectorAll('.cell')
//记录当前玩家
let currentPlayer : Player
//游戏面板
let gameBord = document.querySelector('#bord')
//下棋步数
let steps : number
//游戏结果信息
let message = document.querySelector('#message') as HTMLDivElement
//谁赢了
let winner = document.querySelector('#winner') as HTMLParagraphElement
//重新开始
let restart = document.querySelector('#restart') as HTMLButtonElement

startGame()

//点击重新开始按钮
restart.addEventListener('click',startGame)

function startGame(){
    //隐藏上一局结果
    message.style.display = 'none'
    //游戏步数重置为0
    steps = 0
    //当前玩家默认为x
    currentPlayer = Player.X
    //重置下棋提示为 x
    gameBord.classList.remove(Player.X,Player.O)
    gameBord.classList.add(Player.X)
    //清空棋盘
    cells.forEach(function(item){
        let cell = item as HTMLDivElement
        cell.classList.remove(Player.X, Player.O)
        cell.removeEventListener('click',clickCell)
        cell.addEventListener('click',clickCell,{ once:true })
    })

}
// cells.forEach(function(item){
//     let cell = item as HTMLDivElement
//     cell.addEventListener('click',clickCell,{ once:true })
// }) 
function clickCell(event:MouseEvent){
    let target  = event.target as HTMLDivElement
    target.classList.add(currentPlayer)
    //记录下棋步数
    steps++;

    //调用判赢函数
    let isWin = checkWin(currentPlayer)
    if(isWin){
        message.style.display = 'block'
        winner.innerText = currentPlayer + ' 赢了！'
        return
    }
    //判断平局
    if(steps == 9){
        message.style.display = 'block'
        winner.innerText = '平局'
        return 
    }
    //根据当前玩家，得到下一个玩家
    currentPlayer = currentPlayer === Player.O ? Player.X : Player.O
    gameBord.classList.remove(Player.X,Player.O)
    gameBord.classList.add(currentPlayer)
} 

//判赢函数
function checkWin(player : Player){
    return winsArr.some(function(item){
        let cellIndex1 = item[0]
        let cellIndex2 = item[1]
        let cellIndex3 = item[2]
        if(
            hasClass(cells[cellIndex1],player) &&
            hasClass(cells[cellIndex2],player) &&
            hasClass(cells[cellIndex3],player)
            )
            return true
        return false
    })  
}

function hasClass(el : Element,name : string){
    return el.classList.contains(name)
}