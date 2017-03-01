var res = {
    view00: {
        state: "default",
        description: "你需要再找找其他的线索哦~"
    },
    view01: {
        state: "default",
        description: "你需要再找找其他的线索哦~"
    },
    view02: {
        state: "default",
        description: "你需要再找找其他的线索哦~"
    },
    view03: {
        state: "default",
        description: "你需要再找找其他的线索哦~"
    },
    view10: {
        state: "default",
        description: "你需要再找找其他的线索哦~"
    },
    view30: {
        state: "default",
        description: "你需要再找找其他的线索哦~"
    },
    view31: {
        state: "default",
        description: "你需要再找找其他的线索哦~"
    },
    view32: {
        state: "default",
        description: "你需要再找找其他的线索哦~"
    },
    view33: {
        state: "default",
        description: "你需要再找找其他的线索哦~"
    },
    safe: {
        state: "default",
        description: "保险箱被锁上了，你需要输入正确的密码。"
    },
    safe31: {
        state: "default",
        description: "保险箱被锁上了，你需要输入正确的密码。"
    },
    cudgel: {
        state: "default",
        description: "扳手加晾衣杆，坚固而且够长。",
        value: 3
    },
    key1: {
        state: "default",
        description: "一把钥匙，上面写了数字1。",
        value: 1
    },
    key2: {
        state: "default",
        description: "一把钥匙，上面写了数字2。",
        value: 2
    },
    door1: {
        state: "default",
        description: "该死！这门被锁上了，你需要一把钥匙。门上写着“1”",
        value: 1000,
        open: function () {
            $(".room-0").fadeOut();
            describe("room3text");
            menuChange("next");
            $("#main_next").one("click", function () {
                $(".backpack-btn").trigger("click");
                $(".room-3").fadeIn();
                $(".backpack-description").text("你刚在这陌生的房间醒来，想办法逃出去。");
                roomNow = 3;
            });
        }
    },
    door2: {
        state: "default",
        description: "该死！这门被锁上了，我需要一把钥匙。门上写着“2”",
        value: 2000,
        open: function (obj) {
            $(".room-0").hide();
            $(".view-prev").hide();
            $(".view-next").hide();
            if (obj["gun"].state == "default") {
                describe("shouttext1");
                menuChange("restart");
            }
            else {
                describe("shouttext2");
                menuChange("next");
                $("#main_next").one("click", function () {
                    $(".backpack-btn").trigger("click");
                    $(".backpack").hide();
                    $(".message").show();
                });
            }
        }
    },
    clothshorse: {
        state: "default",
        description: "晾衣杆，足够长，但是用来撬锁似乎不够坚固",
        value: 1000,
        getMix: function () {
            return "<img class=\"backpack-img\" name=\"cudgel\" src=\"image/cudgel.png\">";
        }
    },
    wrench: {
        state: "default",
        description: "扳手。足够坚固，但是太短了",
        value: 1000,
        getMix: function () {
            return "<img class=\"backpack-img\" name=\"cudgel\" src=\"image/cudgel.png\">";
        }
    },
    drawer: {
           description: "抽屉被锁住了，打不开，可以用又长又坚固的物体撬开",
        state: "default",
        value: 3000,
        open: function () {
            $("#drawer").attr("src", "./image/drawer_open.png");
            $("#drawer_1").attr("src",images.drawer_1_open.src);
            $(".room-item-key2").show();
            $(".room-item-key2_1").show();
            $(".backpack-description").text("你拿到了一把钥匙。")
            this.description = "你已经从里面获得了一把钥匙。"
        }
    },
    box: {
        state:"default",
        description:"这个盒子里面似乎装着一些东西，但是生锈卡住了，你需要找个东西砸开它。",
        value:4000,
        open:function(){
            $("#box").attr("src",images.boxopen.src);
            $("#box").css("top","296px");
            $("#box").css("left","280px");
            $("#key1").show();
            $(".backpack-description").text("啦啦啦啦啦啦，你拿到了一把钥匙哦。");
            this.description = "你已经从里面获得了一把钥匙。";
        }
    },
    note: {
        state: "default",
        description: "一张纸条，你需要想办法看清楚上面的字。",
        value: 0.1
    },
    gun: {
        state: "default",
        description: "一把枪，带在身上能够防身。",
        value: 0.3
    },
    hammer: {
        state: "default",
        description: "一把铁锤，一锤子下去应该没什么东西能受的了的吧。",
        value: 4
    },
    magnifier: {
        state: "default",
        description: "是一个放大镜，可以将物品放大。",
        value: 0.4
    },
    TVbtn:{
        state:"default",
        description:"停电了，无法打开.",
        value:666
    },
    scissior:{
        state:"default",
        description:"一把剪刀，能够划开物体",
        value:9
    },
    key31:{
        state:"default",
        description:"这个房间的第一把钥匙",
        value:1
    },
    door301:{
        state:"default",
        description:"唯一的一扇门。",
        value:1000,
        count: 0,
        open:function(){
            // 某个房间隐藏另一个房间出现
            console.log(this.count);
            this.count+=1;
            if (this.count == 3) {
                this.state = "passed";
                $(".view-prev").hide();
                $(".view-next").hide();
                $(".backpack").hide();
                if (gameover) {
                    $(".room-3").fadeOut();
                    passGame(true);
                }
                else {
                    describe("shouttext3");
                    menuChange("next");
                    $("#main_next").one("click", function () {
                        $(".room-3").fadeOut();
                        $(".message").fadeIn();
                    });
                }
            }else{
                this.state = "default";
            }

        }
    },
    lock301:{
        state:"default",
        description:"这个房间第一把锁.",
        value:1000,
        open:function(){

        }
    },
    lock302:{
        state:"default",
        description:"这个房间第二把锁.",
        value:1,
        open:function(){

        }
    },
    lock303:{
        state:"default",
        description:"这个房间第三把锁.",
        value:1,
        open:function(){

        }
    },
    door311:{
        state:"default",
        description:"唯一的一扇门。",
        value:1000
    },
    lock311:{
        state:"default",
        description:"这个房间第一把锁.",
        value:1,
        open:function(){

        }
    },
    lock312:{
        state:"default",
        description:"这个房间第二把锁.",
        value:1,
        open:function(){

        }
    },
    lock313:{
        state:"default",
        description:"这个房间第三把锁.",
        value:1,
        open:function(){

        }
    },
    cabinet31:{
        state:"default",
        description:"一个大的保险箱",
        value:1,
        open:function(){
            $("#cabinet31_open,#break31").show();
        }
    },
    cabinet31_open:{
        state:"default",
        description:"打开了",
        value:1
    },
    key33:{
        state:"default",
        description:"第三把钥匙",
        value:1
    },
    break31:{
        state: "default",
        description: "上面好像固定了什么，想办法弄下来看看。",
        value:9000,
        open: function () {
            //backpackViewShow(images.poster.src);
            $("#poster").show();
        }
    },
    safe31: {
        state: "default",
        description: "保险箱被锁上了，你需要输入正确的密码。"
    },
    safe31_open:{
        state:"default",
        description:"打开了",
        value:1
    },
    key32:{
        state:"default",
        description:"第二把钥匙",
        value:1
    },
    hammer31:{
        state:"default",
        description:"锤子",
        value:5
    },
    dragline31:{
        state:"default",
        description:"灯绳，貌似可以拉动",
        value:1
    },
    lamptop31_open:{
        state:"default",
        description:"灯开了",
        value:5000,
        open:function(){
            $("#dragline31").trigger("vmouseup");
            $("#wall_break31").fadeIn("slow");
            this.state = "disabled";
            res["dragline31"].description = "墙上出现了一片裂缝。";
        }
    },
    wall_break31:{
        state:"default",
        description:"墙被砸开了，里面好像有什么东西",
        value:0.1,
        open:function(){
            $("#key33").show();
            this.description = "墙里有把钥匙。";
        }
    },
    poster: {
        state:"default",
        description:"一张纸，上面写了些奇奇怪怪的字符，这些字符似乎在房间什么地方出现过。",
        value:0.3
    }
}