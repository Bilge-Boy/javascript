///todo list:
///
///
///
var isMenuShown = true;
//DOM&Other-functions:
let toggleMenu = () => {
  $("#first-page").toggleClass("hidden");
  isMenuShown = !isMenuShown;
};
///=======

const arrowSymble = `
        <div class="arrowSmbBlock">
          <div class="las"></div>
          <div class="ras"></div>
        </div>
      `;
$(() => {
  $(".up-arrow").append(arrowSymble);
  $(".down-arrow").append(arrowSymble);
  $(".left-arrow").append(arrowSymble);
  $(".right-arrow").append(arrowSymble);
});

function showIns() {
  toggleMenu();
  $(".instruction").removeAttr("hidden");
}

//JS for game:
const MAP1 = {
  SIZE_X: 3,
  SIZE_Y: 3,
  BOX_X_START: 1,
  BOX_Y_START: 1,
  BOX_X_FINISH: 2,
  BOX_Y_FINISH: 2
};
const MAP2 = {
  SIZE_X: 5,
  SIZE_Y: 5,
  BOX_1_X_START: 1,
  BOX_1_Y_START: 3,
  BOX_1_X_FINISH: 0,
  BOX_1_Y_FINISH: 4,
  BOX_2_X_START: 3,
  BOX_2_Y_START: 1,
  BOX_2_X_FINISH: 4,
  BOX_2_Y_FINISH: 3
};
const MAP3 = {
  SIZE_X: 5,
  SIZE_Y: 6,
  BOX_1_X_START: 2,
  BOX_1_Y_START: 1,
  BOX_1_X_FINISH: 1,
  BOX_1_Y_FINISH: 1,
  BOX_2_X_START: 1,
  BOX_2_Y_START: 2,
  BOX_2_X_FINISH: 3,
  BOX_2_Y_FINISH: 1,
  BOX_3_X_START: 3,
  BOX_3_Y_START: 2,
  BOX_3_X_FINISH: 2,
  BOX_3_Y_FINISH: 2,
  BOX_4_X_START: 2,
  BOX_4_Y_START: 3,
  BOX_4_X_FINISH: 1,
  BOX_4_Y_FINISH: 3,
  BOX_5_X_START: 1,
  BOX_5_Y_START: 4,
  BOX_5_X_FINISH: 3,
  BOX_5_Y_FINISH: 3,
  BOX_6_X_START: 3,
  BOX_6_Y_START: 4,
  BOX_6_X_FINISH: 2,
  BOX_6_Y_FINISH: 4
};

class Player {
  constructor(x, y) {
    this.position_x = x;
    this.position_y = y;
  }
  init() {}
  getX() {
    return this.position_x;
  }
  getY() {
    return this.position_y;
  }
  moveX(x) {
    this.position_x += x;
  }

  moveY(y) {
    this.position_y += y;
  }

  GetGoToPlace() {
    return this.position_y * MAP1.SIZE_X + this.position_x;
  }
  getCordinates() {
    console.log("PLAYER:this.position_x");
    console.log(this.position_x);
    console.log("PLAYER:this.position_y");
    console.log(this.position_y);
  }
}
class Box {
  constructor(x, y, finalX, finalY, totalX) {
    this.position_x = x;
    this.position_y = y;
    this.finalX = finalX;
    this.finalY = finalY;
    this.mapX = totalX;
  }
  isFinished() {
    return this.position_x === this.finalX && this.position_y === this.finalY;
  }
  getX() {
    return this.position_x;
  }
  getY() {
    return this.position_y;
  }
  moveX(x) {
    this.position_x += x;
  }
  moveY(y) {
    this.position_y += y;
  }
  getCordinates() {
    console.log("BOX:this.position_x");
    console.log(this.position_x);
    console.log("BOX:this.position_y");
    console.log(this.position_y);
  }
  getFinishCell() {
    return this.GetGoToPlace(this.finalX, this.finalY);
  }
  GetGoToPlace(x, y) {
    return y * this.mapX + x;
  }
}
class Map {
  constructor(initCOLS, initROWS, player, box) {
    this.mapX = initCOLS;
    this.mapY = initROWS;
    this.player = player;
    this.box = box;
  }
  getCols() {
    return this.mapX;
  }
  getRows() {
    return this.mapY;
  }
  getBox() {
    return this.box;
  }
  drawGrid() {
    var gridHTMLTemplate = "";
    for (var i = 0; i < this.mapY; i++) {
      gridHTMLTemplate += `<div class="rows">`;
      for (var j = 0; j < this.mapX; j++) {
        var index = i * this.mapX + j;
        gridHTMLTemplate += `<div id='${index}' class="cols ${
          i === 0 && j === 0 ? "grid_start" : ""
        }"></div>`;
      }
      gridHTMLTemplate += "</div>";
    }
    $(".playground").html(gridHTMLTemplate);
    $(".grid_start").append("<span id='player'>player</span>");

    if (this.box.length) {
      for (let i = 0; i < this.box.length; i++) {
        var index = this.box[i].getFinishCell();
        $(`#${index}`).addClass("x-container");
        $(
          `#${this.GetGoToPlace(this.box[i].getX(), this.box[i].getY())}`
        ).append(`<span id="box-${i + 1}" class='box'></span>`);
      }
    } else {
      $(`#${this.GetGoToPlace(this.box.getX(), this.box.getY())}`).append(
        "<span class='box'></span>"
      );
      $(`#${this.box.getFinishCell()}`).addClass("x-container");
    }
  }
  RenderElements() {
    $("#player").remove();
    $(".box").remove();
    this.moveTo();
  }
  moveTo() {
    $(`#${this.GetGoToPlace(this.player.getX(), this.player.getY())}`).append(
      "<span id='player'>player</span>"
    );
    if (this.box.length) {
      for (let i = 0; i < this.box.length; i++) {
        $(
          `#${this.GetGoToPlace(this.box[i].getX(), this.box[i].getY())}`
        ).append(`<span id="box-${i + 1}" class='box'></span>`);
      }
    } else {
      $(`#${this.GetGoToPlace(this.box.getX(), this.box.getY())}`).append(
        "<span class='box'></span>"
      );
    }
  }
  GetGoToPlace(x, y) {
    return y * this.mapX + x;
  }
}

//===== main functions
function StartGame() {
  let player = new Player(0, 0);
  let box1 = new Box(
    MAP1.BOX_X_START,
    MAP1.BOX_Y_START,
    MAP1.BOX_X_FINISH,
    MAP1.BOX_Y_FINISH,
    MAP1.SIZE_X
  );

  let level1 = new Map(MAP1.SIZE_X, MAP1.SIZE_Y, player, box1);
  level1.drawGrid();
  InitializeMovesLevel1(level1);
}

let InitializeMovesLevel1 = (level1) => {
  $(document)
    .off()
    .on("keydown", function (event) {
      console.log(getFinishCondition(1));
      switch (event.key) {
        case "ArrowRight":
          if (level1.player.getX() + 1 < level1.mapX) {
            if (
              level1.player.getX() + 1 === level1.box.getX() &&
              level1.player.getY() === level1.box.getY()
            ) {
              if (level1.box.getX() + 1 < level1.mapX) {
                level1.box.moveX(1);
                level1.player.moveX(1);
                level1.RenderElements();
              }
            } else {
              level1.player.moveX(1);
              level1.RenderElements();
            }

            $("#player").css("transform", "scaleX(1)");
          }
          break;
        case "ArrowLeft":
          if (level1.player.getX() - 1 >= 0) {
            if (
              level1.player.getX() - 1 === level1.box.getX() &&
              level1.player.getY() === level1.box.getY()
            ) {
              if (level1.box.getX() - 1 >= 0) {
                level1.box.moveX(-1);
                level1.player.moveX(-1);
                level1.RenderElements();
              }
            } else {
              level1.player.moveX(-1);
              level1.RenderElements();
            }
            $("#player").css("transform", "scaleX(-1)");
          }
          break;
        case "ArrowDown":
          if (level1.player.getY() + 1 < level1.mapY) {
            if (
              level1.player.getX() === level1.box.getX() &&
              level1.player.getY() + 1 === level1.box.getY()
            ) {
              if (level1.box.getY() + 1 < level1.mapY) {
                level1.box.moveY(1);
                level1.player.moveY(1);
                level1.RenderElements();
              }
            } else {
              level1.player.moveY(1);
              level1.RenderElements();
            }

            $("#player").css("transform", "scaleX(1)");
          }

          break;
        case "ArrowUp":
          if (level1.player.getY() - 1 >= 0) {
            if (
              level1.player.getX() === level1.box.getX() &&
              level1.player.getY() - 1 === level1.box.getY()
            ) {
              if (level1.box.getY() - 1 >= 0) {
                level1.box.moveY(-1);
                level1.player.moveY(-1);
                level1.RenderElements();
              }
            } else {
              level1.player.moveY(-1);
              level1.RenderElements();
            }
          }
          break;
        default:
          console.log("keyboard_pressed");
          break;
      }

      if (level1.box.isFinished()) {
        ShowFin(true, 2);
      }
    });
};

let initLevel2 = () => {
  var player = new Player(0, 0);
  var box1 = new Box(
    MAP2.BOX_1_X_START,
    MAP2.BOX_1_Y_START,
    MAP2.BOX_1_X_FINISH,
    MAP2.BOX_1_Y_FINISH,
    MAP2.SIZE_X
  );
  var box2 = new Box(
    MAP2.BOX_2_X_START,
    MAP2.BOX_2_Y_START,
    MAP2.BOX_2_X_FINISH,
    MAP2.BOX_2_Y_FINISH,
    MAP2.SIZE_X
  );
  var box = [box1, box2];

  var map = new Map(MAP2.SIZE_X, MAP2.SIZE_Y, player, box);
  map.drawGrid();
  InitializeMovesLevel2(map);
};

let InitializeMovesLevel2 = (map) => {
  $(document)
    .off()
    .on("keydown", function (event) {
      switch (event.key) {
        case "ArrowRight":
          if (map.player.getX() + 1 < map.mapX) {
            if (
              map.player.getX() + 1 === map.box[0].getX() &&
              map.player.getY() === map.box[0].getY()
            ) {
              //if the player touches box 0
              if (
                map.box[0].getX() + 1 < map.mapX &&
                !(
                  map.box[0].getX() + 1 === map.box[1].getX() &&
                  map.box[0].getY() === map.box[1].getY()
                )
              ) {
                map.box[0].moveX(1);
                map.player.moveX(1);
                map.RenderElements();
              }
            } else if (
              map.player.getX() + 1 === map.box[1].getX() &&
              map.player.getY() === map.box[1].getY()
            ) {
              if (
                map.box[1].getX() + 1 < map.mapX &&
                !(
                  map.box[1].getX() + 1 === map.box[0].getX() &&
                  map.box[1].getY() === map.box[0].getY()
                )
              ) {
                map.box[1].moveX(1);
                map.player.moveX(1);
                map.RenderElements();
              }
            } else {
              map.player.moveX(1);
              map.RenderElements();
            }
            $("#player").css("transform", "scaleX(1)");
          }
          break;
        case "ArrowLeft":
          if (map.player.getX() - 1 >= 0) {
            if (
              map.player.getX() - 1 === map.box[0].getX() &&
              map.player.getY() === map.box[0].getY()
            ) {
              //if the player touches box 0
              if (
                map.box[0].getX() - 1 >= 0 &&
                !(
                  map.box[0].getX() - 1 === map.box[1].getX() &&
                  map.box[0].getY() === map.box[1].getY()
                )
              ) {
                map.box[0].moveX(-1);
                map.player.moveX(-1);
                map.RenderElements();
              }
            } else if (
              map.player.getX() - 1 === map.box[1].getX() &&
              map.player.getY() === map.box[1].getY()
            ) {
              if (
                map.box[1].getX() - 1 >= 0 &&
                !(
                  map.box[1].getX() - 1 === map.box[0].getX() &&
                  map.box[1].getY() === map.box[0].getY()
                )
              ) {
                map.box[1].moveX(-1);
                map.player.moveX(-1);
                map.RenderElements();
              }
            } else {
              map.player.moveX(-1);
              map.RenderElements();
            }
          }
          $("#player").css("transform", "scaleX(-1)");
          break;
        case "ArrowDown":
          if (map.player.getY() + 1 < map.mapY) {
            if (
              map.player.getY() + 1 === map.box[0].getY() &&
              map.player.getX() === map.box[0].getX()
            ) {
              //if the player touches box 0
              if (
                map.box[0].getY() + 1 < map.mapY &&
                !(
                  map.box[0].getY() + 1 === map.box[1].getY() &&
                  map.box[0].getX() === map.box[1].getX()
                )
              ) {
                map.box[0].moveY(1);
                map.player.moveY(1);
                map.RenderElements();
              }
            } else if (
              map.player.getY() + 1 === map.box[1].getY() &&
              map.player.getX() === map.box[1].getX()
            ) {
              if (
                map.box[1].getY() + 1 < map.mapY &&
                !(
                  map.box[1].getY() + 1 === map.box[0].getY() &&
                  map.box[1].getX() === map.box[0].getX()
                )
              ) {
                map.box[1].moveY(1);
                map.player.moveY(1);
                map.RenderElements();
              }
            } else {
              map.player.moveY(1);
              map.RenderElements();
            }
            $("#player").css("transform", "scaleX(1)");
          }
          break;
        case "ArrowUp":
          if (map.player.getY() - 1 >= 0) {
            if (
              map.player.getY() - 1 === map.box[0].getY() &&
              map.player.getX() === map.box[0].getX()
            ) {
              //if the player touches box 0
              if (
                map.box[0].getY() - 1 >= 0 &&
                !(
                  map.box[0].getY() - 1 === map.box[1].getY() &&
                  map.box[0].getX() === map.box[1].getX()
                )
              ) {
                map.box[0].moveY(-1);
                map.player.moveY(-1);
                map.RenderElements();
              }
            } else if (
              map.player.getY() - 1 === map.box[1].getY() &&
              map.player.getX() === map.box[1].getX()
            ) {
              if (
                map.box[1].getY() - 1 >= 0 &&
                !(
                  map.box[1].getY() + 1 === map.box[0].getY() &&
                  map.box[1].getX() === map.box[0].getX()
                )
              ) {
                map.box[1].moveY(-1);
                map.player.moveY(-1);
                map.RenderElements();
              }
            } else {
              map.player.moveY(-1);
              map.RenderElements();
            }
            $("#player").css("transform", "scaleX(1)");
          }
          break;
      }
      // console.log(map.getFinishCondition())
      console.log(getFinishCondition(2));
      if (getFinishCondition(2)) {
        ShowFin(true, 3);
      }
    });
};

let initLevel3 = () => {
  var player = new Player(0, 0);
  var box1 = new Box(
    MAP3.BOX_1_X_START,
    MAP3.BOX_1_Y_START,
    MAP3.BOX_1_X_FINISH,
    MAP3.BOX_1_Y_FINISH,
    MAP3.SIZE_X
  );
  var box2 = new Box(
    MAP3.BOX_2_X_START,
    MAP3.BOX_2_Y_START,
    MAP3.BOX_2_X_FINISH,
    MAP3.BOX_2_Y_FINISH,
    MAP3.SIZE_X
  );
  var box3 = new Box(
    MAP3.BOX_3_X_START,
    MAP3.BOX_3_Y_START,
    MAP3.BOX_3_X_FINISH,
    MAP3.BOX_3_Y_FINISH,
    MAP3.SIZE_X
  );
  var box4 = new Box(
    MAP3.BOX_4_X_START,
    MAP3.BOX_4_Y_START,
    MAP3.BOX_4_X_FINISH,
    MAP3.BOX_4_Y_FINISH,
    MAP3.SIZE_X
  );
  var box5 = new Box(
    MAP3.BOX_5_X_START,
    MAP3.BOX_5_Y_START,
    MAP3.BOX_5_X_FINISH,
    MAP3.BOX_5_Y_FINISH,
    MAP3.SIZE_X
  );
  var box6 = new Box(
    MAP3.BOX_6_X_START,
    MAP3.BOX_6_Y_START,
    MAP3.BOX_6_X_FINISH,
    MAP3.BOX_6_Y_FINISH,
    MAP3.SIZE_X
  );

  var box = [box1, box2, box3, box4, box5, box6];

  var map = new Map(MAP3.SIZE_X, MAP3.SIZE_Y, player, box);
  map.drawGrid();
  InitializeMovesLevel3(map);
};

var CheckIfObjectTouchBox = (pX, pY, boxArr) => {
  var boxIndex = -1;
  for (var i = 0; i < boxArr.length; i++) {
    if (pX === boxArr[i].getX() && pY === boxArr[i].getY()) boxIndex = i;
  }
  return boxIndex;
};
var CheckIfBoxMovable = (box, deltax, deltay, map) => {
  var availability = false;
  var bX = box.getX() + deltax;
  var bY = box.getY() + deltay;
  if (deltax >= 0 && deltay >= 0) {
    if (bX < map.getCols() && bY < map.getRows()) {
      // box in the grid
      if (CheckIfObjectTouchBox(bX, bY, map.getBox()) === -1) {
        availability = true;
      }
    }
  } else {
    //movebackwords/upwords
    if (bX >= 0 && bY >= 0) {
      // box in the grid
      if (CheckIfObjectTouchBox(bX, bY, map.getBox()) === -1) {
        availability = true;
      }
    }
  }
  return availability;
};
let InitializeMovesLevel3 = (map) => {
  $(document)
    .off()
    .on("keydown", function (event) {
      //console.log(getFinishCondition(6)); //checkBoxPosition();
      switch (event.key) {
        case "ArrowRight":
          if (map.player.getX() + 1 < map.mapX) {
            var boxNum = CheckIfObjectTouchBox(
              map.player.getX() + 1,
              map.player.getY(),
              map.getBox()
            );
            if (boxNum !== -1) {
              //if the player touches box 0
              if (CheckIfBoxMovable(map.box[boxNum], 1, 0, map)) {
                map.box[boxNum].moveX(1);
                map.player.moveX(1);
                map.RenderElements();
              }
            } else {
              map.player.moveX(1);
              map.RenderElements();
            }
          }
          $("#player").css("transform", "scaleX(1)");
          break;
        case "ArrowLeft":
          if (map.player.getX() - 1 >= 0) {
            var boxNum = CheckIfObjectTouchBox(
              map.player.getX() - 1,
              map.player.getY(),
              map.getBox()
            );
            if (boxNum !== -1) {
              if (CheckIfBoxMovable(map.box[boxNum], -1, 0, map)) {
                map.box[boxNum].moveX(-1);
                map.player.moveX(-1);
                map.RenderElements();
              }
            } else {
              map.player.moveX(-1);
              map.RenderElements();
            }
          }
          $("#player").css("transform", "scaleX(-1)");
          break;
        case "ArrowDown":
          if (map.player.getY() + 1 < map.mapY) {
            var boxNum = CheckIfObjectTouchBox(
              map.player.getX(),
              map.player.getY() + 1,
              map.getBox()
            );
            if (boxNum !== -1) {
              if (CheckIfBoxMovable(map.box[boxNum], 0, 1, map)) {
                map.box[boxNum].moveY(1);
                map.player.moveY(1);
                map.RenderElements();
              }
            } else {
              map.player.moveY(1);
              map.RenderElements();
            }
            //$("#player").css("transform", "scaleX(1)");
          }
          break;
        case "ArrowUp":
          if (map.player.getY() - 1 >= 0) {
            var boxNum = CheckIfObjectTouchBox(
              map.player.getX(),
              map.player.getY() - 1,
              map.getBox()
            );
            if (boxNum !== -1) {
              if (CheckIfBoxMovable(map.box[boxNum], 0, -1, map)) {
                map.box[boxNum].moveY(-1);
                map.player.moveY(-1);
                map.RenderElements();
              }
            } else {
              map.player.moveY(-1);
              map.RenderElements();
            }
          }
          break;
      }
      // console.log(map.getFinishCondition())
      if (getFinishCondition(6)) {
        ShowFin(true, -1);
      }
    });
};
var ShowFin = (con, lvl) => {
  $(".completed-lvl").css("display", con ? "block" : "none");
  $(".next-lvl")
    .off()
    .on("click", () => {
      switch (lvl) {
        case 2:
          initLevel2();
          $(".completed-lvl").css("display", "none");
          break;
        case 3:
          initLevel3();
          $(".completed-lvl").css("display", "none");
          break;
        default:
          alert("congratz on finish the game");
          break;
      }
    });
};
let getFinishCondition = (boxAmount) => {
  let counter = 0;
  $(".x-container").each((i, ele) => {
    if ($($(ele)[0].firstChild).hasClass("box")) counter++;
  });
  return counter === boxAmount;
};
