import fs = require('fs');

enum Direction {
    Up = "^",
    Down = "v",
    Left = "<",
    Right = ">",
}


let map: string[];
let carts: {x:number, y:number, facing: Direction, turn: number, id: number, collided: boolean}[] = [];

fs.readFile("13.txt", 'utf8', function(err, data) {
    map = data.split("\n");
    playGame();
});

function playGame() {
    let n = 0;
    for(let y = 0; y < map.length; y++) {
        //console.log(map[y]);
        for(let x = 0; x < map[y].length; x++) {
            let val = map[y][x];
            if(([Direction.Up, Direction.Down, Direction.Left, Direction.Right] as string[]).includes(val)) {
                carts.push({
                    x: x, y: y, facing: (val as Direction), turn: 0, id: n++, collided: false
                });
            }
        }
    }
    console.log(carts);

    while(true) {
        //console.log("tick");
        carts.sort((a,b) => {
            if(a.y != b.y) {return a.y - b.y;}
            return a.x - b.x;
        })

        if(false) {
            let showCarts = [].concat(carts);
            for(let y = 0; y < map.length; y++) {
                let line = "";
                for(let x = 0; x < map[y].length; x++) {
                    if(showCarts[0] && showCarts[0].x == x && showCarts[0].y == y) {
                        showCarts.shift();
                        line += "*";
                    } else {
                        line += map[y][x];
                    }
                }
                console.log(line);
            }
        }

        carts.forEach((cart) => {
            if(cart.collided) { return; }
            if(cart.facing === Direction.Up) {
                cart.y -= 1;
            } else if(cart.facing === Direction.Down) {
                cart.y += 1;
            } else if(cart.facing === Direction.Left) {
                cart.x -= 1;
            } else {
                cart.x += 1;
            }

            carts.forEach((cart2) => {
                if(cart.x == cart2.x && cart.y == cart2.y && cart.id != cart2.id && !cart2.collided) {
                    cart.collided = true;
                    cart2.collided = true;

                    console.log([cart, cart2]);

                    return;
                }
            });

            let track = map[cart.y][cart.x];
            if(track == "/") {
                if(cart.facing === Direction.Up) {
                    cart.facing = Direction.Right;
                } else if(cart.facing === Direction.Down) {
                    cart.facing = Direction.Left;
                } else if(cart.facing === Direction.Left) {
                    cart.facing = Direction.Down;
                } else {
                    cart.facing = Direction.Up;
                }
            } else if(track == "\\") {
                if(cart.facing === Direction.Up) {
                    cart.facing = Direction.Left;
                } else if(cart.facing === Direction.Down) {
                    cart.facing = Direction.Right;
                } else if(cart.facing === Direction.Left) {
                    cart.facing = Direction.Up;
                } else {
                    cart.facing = Direction.Down;
                }
            } else if(track == "+") {
                if(cart.turn == 0) { //left
                    if(cart.facing === Direction.Up) {
                        cart.facing = Direction.Left;
                    } else if(cart.facing === Direction.Down) {
                        cart.facing = Direction.Right;
                    } else if(cart.facing === Direction.Left) {
                        cart.facing = Direction.Down;
                    } else {
                        cart.facing = Direction.Up;
                    }
                } else if(cart.turn == 1) { //straight 
                    //noop
                } else { //right
                    if(cart.facing === Direction.Up) {
                        cart.facing = Direction.Right;
                    } else if(cart.facing === Direction.Down) {
                        cart.facing = Direction.Left;
                    } else if(cart.facing === Direction.Left) {
                        cart.facing = Direction.Up;
                    } else {
                        cart.facing = Direction.Down;
                    }
                }
                cart.turn = (cart.turn + 1) % 3;
            }
        });

        let uncollided = carts.filter((c) => !c.collided);
        if(uncollided.length == 1) {
            console.log(uncollided);
            return;
        }
    }

}