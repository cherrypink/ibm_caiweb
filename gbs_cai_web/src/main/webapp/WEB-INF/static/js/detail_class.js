/**
 * board javascript
 * Editor: Misu Choi
 * Modify : Joosang Kim
 * date: 2017-02-18  
 * Note : add board page dynamic action
 */
jQuery(document).ready(function ($) {
    $("#boardDiv").css("display", "none");
    //Ajax to server -> get board list
    $("#showQnA").click(function () {
        var class_id = $("#class_id").val();
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/board/getBoardListByClassId",
            data: {class_id},
            success: boardReqResponse,
            error: ajaxErr
        });

        $(".container").css("display", "none");
        $("#boardDiv").css("display", "block");

        $(window).scrollTop(0);
    });

    //Ajax to server -> post question
    $("#submit").click(function () {
        console.log(1);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/board/postQuestion/",
            data: $("#BoardWriteForm").serialize(),
            success: saveReqResponse,
            error: ajaxErr
        });

        $(".container").css("display", "none");
        $("#boardDiv").css("display", "block");

        $(window).scrollTop(0);

    })


    $('body').on('click', '.showContent', function () {
        var cssVal = $(this).next().css("display");

        if (cssVal === 'table-row') {
            $(this).next().css("display", "none");
        } else {
            $('.content').css("display", "none");
            $(this).next().slideToggle("fast");
        }
    });

    $("#showList").click(function () {
        $("#boardDiv").css("display", "none");
        $(".container").css("display", "block");
    });
});

function createBoardList(data){
    var htmlStr = "";
    var cnt = 1;
    var board_id = "";
    board_id = data[0].board_id;
    
    for (var i in data) {
        htmlStr += "<tr class='showContent'>";
        htmlStr += "<td align=center>" + cnt + "</td>";
        htmlStr += "<td align=center>" + data[i].title + "</td>";
        htmlStr += "<td align=center>" + data[i].user_nm + "</td>";
        if (data[i].user_id == $("#user_id").val()) {// Question
            htmlStr += "<td align=center><input type='button'  class='btn btn-info question' value='Modify'/></td>";
        } else {
            htmlStr += "<td align=center><input type='button' class='btn btn-info answer' value='Answer'/></td>";
        }
        htmlStr += "</tr>";
        htmlStr += "<tr class='content' style='display:none;'>";
        htmlStr += "<td colspan = '4' >" + data[i].detail + "</td>";
        htmlStr += "</tr>";
        cnt++;
    }; 
    if (cnt == 1) {
        htmlStr = "<tr><td>No contents posted yet.</td></tr>";
    }
    $("input[name=board_id]").attr("value", board_id);
    $("#board-body").html(htmlStr);
}
var saveReqResponse = function(data){
    alert("Post Complete!");
    createBoardList(data);
};
var boardReqResponse = function (data) {
    createBoardList(data);
}

var ajaxErr = function (data) {
    console.log(data);
    alert(data);
    alert("Error occured.Please try again.");
}


    