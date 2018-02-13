// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y,s) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += (this.speed * dt);
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 400;
}

Player.prototype.update = function() {
    //不能进河 到初始位置
    if (this.y < 50) {this.y = 400;this.x = 202;}
    
    //不能碰虫子
    for (var i = allEnemies.length - 1; i >= 0; i--) {
        if(clash(this,allEnemies[i]))
        {
            this.y = 400;
            this.x = 202;
        }
    }
   //console.log(allEnemies[0])
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(e) {
    var step1 = 100;
    var step2 = 85;
    //不能边界， 停在原位置
    if(e=="left" && this.x > 100)
    {
        this.x -= step1;
    }
    else if(e=="right" && this.x < 400)
    {
        this.x += step1;
    }
    else if(e=="down" && this.y < 390)
    {
        this.y += step2;
    }
    else if(e=="up")
    {
        this.y -= step2;
    }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
allEnemies.push(new Enemy(0,60,100));
allEnemies.push(new Enemy(0,145,120));
allEnemies.push(new Enemy(0,230,120));
var player = new Player();

function addEnemy()
{
    //console.log(Math.floor(Math.random()*3));
    var newY = Math.floor(Math.random()*3)*85 + 60;
    var newSpeed = Math.floor(Math.random()*250)+100;
    allEnemies.push(new Enemy(0,newY,newSpeed));
}
function delEnemy()
{
    while(allEnemies.length > 0){
        if (allEnemies[0].x > 500) {
            allEnemies.shift();
        }
        else{
            break;
        }
    }
}
setInterval("addEnemy()","900");
setInterval("delEnemy()","10000");

function clash(p,e){
    if (p.y == e.y) 
    {
        if((p.x+30 < e.x-30) || (p.x-30 > e.x+30))
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    return false;
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
