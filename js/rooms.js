var room = new Array(3);

room[0] = function () {
    this.res = [ "vase", "note", "drawer", "photo", "safe", "gun", "hammer" ];

    this.vase = new resObj(
        "vase",
        "1",
        "a vase",
        [ { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }
        ],
        [ "../img/vase.jpg" ]
    );

    this.note = new resObj(
        "note",
        "1",
        "a vase",
        [ { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }
        ],
        [ "../img/note.png" ]
    );

    this.drawer = new resObj(
        "drawer",
        "1",
        "a vase",
        [ { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }
        ],
        [ "../img/drawer.png" ]
    );

    this.photo = new resObj(
        "photo",
        "1",
        "a vase",
        [ { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }
        ],
        [ "../img/photo.png" ]
    );

    this.safe = new resObj(
        "safe",
        "1",
        "a vase",
        [ { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }
        ],
        [ "../img/safe.png" ],
        "0213"
    );

    this.gun = new resObj(
        "gun",
        "1",
        "a vase",
        [ { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }
        ],
        [ "../img/gun.png" ]
    );

    this.hammer = new resObj(
        "hammer",
        "1",
        "a vase",
        [ { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }, 
          { x = "0px", y = "0px" }
        ],
        [ "../img/hammer.png" ]
    );

    this.cs = document.getElementsByTag("canvas").getContext("2d");

    this.draw = function() {
        var i;
        for (i in this.cs) {
            i.clearRect(0, 0, 800, 600);
            i.drawImage()
        }
    }
}