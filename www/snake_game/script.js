var Snake = (function () {

    const INITIAL_TAIL = 4; // ความยาวเริ่มต้นของหางงู
    var fixedTail = true; // สถานะว่าหางงูมีความยาวคงที่หรือไม่

    var intervalID; // ตัวแปรสำหรับเก็บ ID ของ interval

    var tileCount = 10; // จำนวนช่องในตารางเกม
    var gridSize = 400 / tileCount; // ขนาดของแต่ละช่องในตารางเกม

    const INITIAL_PLAYER = {
        x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2)
    }; // ตำแหน่งเริ่มต้นของผู้เล่น

    var velocity = {
        x: 0, y: 0
    }; // ความเร็วของงู
    var player = {
        x: INITIAL_PLAYER.x, y: INITIAL_PLAYER.y
    }; // ตำแหน่งของผู้เล่น

    var walls = false; // สถานะว่ามีกำแพงหรือไม่

    var fruit = {
        x: 1, y: 1
    }; // ตำแหน่งของผลไม้

    var trail = []; // เส้นทางของงู
    var tail = INITIAL_TAIL; // ความยาวของหางงู

    var reward = 0; // รางวัลสำหรับการเล่นเกม
    var points = 0; // คะแนนของผู้เล่น
    var pointsMax = 0; // คะแนนสูงสุดที่ผู้เล่นทำได้

    var ActionEnum = {
        'none': 0, 'up': 1, 'down': 2, 'left': 3, 'right': 4
    };
    Object.freeze(ActionEnum); // กำหนดค่าการเคลื่อนไหวของงู และทำให้ไม่สามารถเปลี่ยนแปลงได้
    var lastAction = ActionEnum.none; // การเคลื่อนไหวล่าสุดของงู

    function setup() {
        canv = document.getElementById('gc'); // ดึง canvas จาก HTML
        ctx = canv.getContext('2d'); // ดึง context ของ canvas

        game.reset(); // เรียกฟังก์ชัน reset ของเกม
    }

    var game = {

        reset: function () {
            ctx.fillStyle = 'grey';
            ctx.fillRect(0, 0, canv.width, canv.height);

            tail = INITIAL_TAIL; // ตั้งค่าความยาวหางงูเริ่มต้น
            points = 0; // ตั้งค่าคะแนนเริ่มต้น
            velocity.x = 0;
            velocity.y = 0;
            player.x = INITIAL_PLAYER.x;
            player.y = INITIAL_PLAYER.y;
            // this.RandomFruit();
            reward = -1; // ตั้งค่ารางวัลเริ่มต้น

            lastAction = ActionEnum.none; // ตั้งค่าการเคลื่อนไหวล่าสุดเป็น none

            trail = [];
            trail.push({
                x: player.x, y: player.y
            }); // เพิ่มตำแหน่งผู้เล่นในเส้นทางงู
            for(var i=0; i<tail; i++) trail.push({ x: player.x, y: player.y }); // เพิ่มตำแหน่งในเส้นทางงูตามความยาวหาง
        },

        action: {
            up: function () {
                if (lastAction != ActionEnum.down) {
                    velocity.x = 0;
                    velocity.y = -1;
                }
            }, // การเคลื่อนไหวขึ้น
            down: function () {
                if (lastAction != ActionEnum.up) {
                    velocity.x = 0;
                    velocity.y = 1;
                }
            }, // การเคลื่อนไหวลง
            left: function () {
                if (lastAction != ActionEnum.right) {
                    velocity.x = -1;
                    velocity.y = 0;
                }
            }, // การเคลื่อนไหวไปทางซ้าย
            right: function () {
                if (lastAction != ActionEnum.left) {
                    velocity.x = 1;
                    velocity.y = 0;
                }
            } // การเคลื่อนไหวไปทางขวา
        },

        RandomFruit: function () {
            if (walls) {
                fruit.x = 1 + Math.floor(Math.random() * (tileCount - 2));
                fruit.y = 1 + Math.floor(Math.random() * (tileCount - 2));
            } else {
                fruit.x = Math.floor(Math.random() * tileCount);
                fruit.y = Math.floor(Math.random() * tileCount);
            }
        }, // สุ่มตำแหน่งของผลไม้

        log: function () {
            console.log('====================');
            console.log('x:' + player.x + ', y:' + player.y);
            console.log('tail:' + tail + ', trail.length:' + trail.length);
        }, // แสดงสถานะของเกมใน console

        loop: function () {

            reward = -0.1; // ตั้งค่ารางวัล

            function DontHitWall() {
                if (player.x < 0) player.x = tileCount - 1;
                if (player.x >= tileCount) player.x = 0;
                if (player.y < 0) player.y = tileCount - 1;
                if (player.y >= tileCount) player.y = 0;
            } // ฟังก์ชันเมื่องูไม่ชนกำแพง
            function HitWall() {
                if (player.x < 1) game.reset();
                if (player.x > tileCount - 2) game.reset();
                if (player.y < 1) game.reset();
                if (player.y > tileCount - 2) game.reset();

                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, gridSize - 1, canv.height); // กำแพงซ้าย
                ctx.fillRect(0, 0, canv.width, gridSize - 1); // กำแพงบน
                ctx.fillRect(canv.width - gridSize + 1, 0, gridSize, canv.height); // กำแพงขวา
                ctx.fillRect(0, canv.height - gridSize + 1, canv.width, gridSize); // กำแพงล่าง
            } // ฟังก์ชันเมื่องูชนกำแพง


            var stopped = velocity.x == 0 && velocity.y == 0; // ตรวจสอบว่างูหยุดหรือไม่

            player.x += velocity.x;
            player.y += velocity.y;

            if (velocity.x == 0 && velocity.y == -1) lastAction = ActionEnum.up;
            if (velocity.x == 0 && velocity.y == 1) lastAction = ActionEnum.down;
            if (velocity.x == -1 && velocity.y == 0) lastAction = ActionEnum.left;
            if (velocity.x == 1 && velocity.y == 0) lastAction = ActionEnum.right;

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canv.width, canv.height);

            if (walls) HitWall();
            else DontHitWall();

            // game.log();

            if (!stopped) {
                trail.push({
                    x: player.x, y: player.y
                });
                while (trail.length > tail) trail.shift();
            }

            if (!stopped) {
                ctx.fillStyle = '#00CC4FB3';
                ctx.font = "small-caps 12px 'Press Start 2P', system-ui";
                ctx.fillText("(esc) reset", 24, 356);
                ctx.fillText("(space) pause", 24, 374);
            }

            ctx.fillStyle = '#00CC4FB3'; // สีหางงู
            for (var i = 0; i < trail.length - 1; i++) {
                ctx.fillRect(trail[i].x * gridSize + 1, trail[i].y * gridSize + 1, gridSize - 2, gridSize - 2);

                // console.debug(i + ' => player:' + player.x, player.y + ', trail:' + trail[i].x, trail[i].y);
                if (!stopped && trail[i].x == player.x && trail[i].y == player.y) {
                    game.reset();
                }
                ctx.fillStyle = '#00CC4F'; // สีหัวงู
            }
            ctx.fillRect(trail[trail.length - 1].x * gridSize + 1, trail[trail.length - 1].y * gridSize + 1, gridSize - 2, gridSize - 2);

            if (player.x == fruit.x && player.y == fruit.y) {
                if (!fixedTail) tail++;
                points++;
                if (points > pointsMax) pointsMax = points;
                reward = 1;
                game.RandomFruit();
                // make sure new fruit didn't spawn in snake tail
                while ((function () {
                    for (var i = 0; i < trail.length; i++) {
                        if (trail[i].x == fruit.x && trail[i].y == fruit.y) {
                            game.RandomFruit();
                            return true;
                        }
                    }
                    return false;
                })());
            }

            ctx.fillStyle = '#FF7070'; // อาหารงู
            ctx.fillRect(fruit.x * gridSize + 1, fruit.y * gridSize + 1, gridSize - 2, gridSize - 2);

            if (stopped) {
                ctx.fillStyle = '#00CC4FB3';
                ctx.font = "small-caps 12px 'Press Start 2P', system-ui";
                ctx.fillText("press ARROW KEYS to START...", 24, 374);
            }

            ctx.fillStyle = '#00CC4FB3';
            ctx.font = "small-caps 16px 'Press Start 2P', system-ui";
            ctx.fillText("points: " + points + ";", 274, 40);
            ctx.fillText("top: " + pointsMax + ";", 288, 60);

            return reward;
        }
    }

    function keyPush(evt) {
        switch (evt.keyCode) {
            case 37: // left
                game.action.left();
                evt.preventDefault();
                break;

            case 38: // up
                game.action.up();
                evt.preventDefault();
                break;

            case 39: // right
                game.action.right();
                evt.preventDefault();
                break;

            case 40: // down
                game.action.down();
                evt.preventDefault();
                break;

            case 32: // space
                Snake.pause();
                evt.preventDefault();
                break;

            case 27: // esc
                game.reset();
                evt.preventDefault();
                break;
        }
    }

    return {
        start: function (fps = 15) {
            window.onload = setup;
            intervalID = setInterval(game.loop, 2000 / fps);
        }, // เริ่มเกมและตั้งค่า fps

        loop: game.loop,

        reset: game.reset,

        stop: function () {
            clearInterval(intervalID);
        }, // หยุดเกม

        setup: {
            keyboard: function (state) {
                if (state) {
                    document.addEventListener('keydown', keyPush);
                } else {
                    document.removeEventListener('keydown', keyPush);
                }
            }, // ตั้งค่าคีย์บอร์ดสำหรับควบคุมงู
            wall: function (state) {
                walls = state;
            }, // ตั้งค่ากำแพง
            tileCount: function (size) {
                tileCount = size;
                gridSize = 400 / tileCount;
            }, // ตั้งค่าจำนวนช่องในตารางเกม
            fixedTail: function (state) {
                fixedTail = state;
            } // ตั้งค่าว่าหางงูมีความยาวคงที่หรือไม่
        },

        action: function (act) {
            switch (act) {
                case 'left':
                    game.action.left();
                    break;

                case 'up':
                    game.action.up();
                    break;

                case 'right':
                    game.action.right();
                    break;

                case 'down':
                    game.action.down();
                    break;
            }
        }, // ฟังก์ชันควบคุมการเคลื่อนไหวของงู

        pause: function () {
            velocity.x = 0;
            velocity.y = 0;
        }, // หยุดการเคลื่อนไหวของงู

        clearTopScore: function () {
            pointsMax = 0;
        }, // รีเซ็ตคะแนนสูงสุด

        data: {
            player: player,
            fruit: fruit,
            trail: function () {
                return trail;
            }
        }, // ข้อมูลของเกม

        info: {
            tileCount: tileCount
        } // ข้อมูลของตารางเกม
    };

})();

Snake.start(8); // เริ่มเกมด้วย fps 8
Snake.setup.keyboard(true); // เปิดใช้งานคีย์บอร์ดสำหรับควบคุมงู
Snake.setup.fixedTail(false); // ตั้งค่าหางงูไม่ให้มีความยาวคงที่