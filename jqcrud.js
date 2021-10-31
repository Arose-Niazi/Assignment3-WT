$(function () {
    loadMembers();
    $("#faculty").on("click", ".btn-danger", handleDelete);
    $("#faculty").on("click", ".btn-warning", handleUpdate);
    $("#addBtn").click(addMember);
    $("#updateSave").click(preformUpdate);
});

function preformUpdate() {
    var id = $("#updateId").val();
    var name = $("#Uname").val();
    var gender = $("#Ugender").val();
    var age = $("#Uage").val();
    var email = $("#Uemail").val();
    var country = $("#Ucountry").val();
    var city = $("#Ucity").val();
    var street_address = $("#Ustreet_address").val();
    var address = {country: country, city: city, street_address: street_address};
    var course_code = $("#Ucourse_code").val();
    var phone_numbers = $("#Uphone_numbers").val();
    phone_numbers = phone_numbers.split(",");
    var tosend = JSON.stringify({
        name,
        gender,
        age,
        email,
        address,
        course_code,
        phone_numbers,
    });
    $.ajax({
        url: "https://api.assign3.arose-niazi.me/api/faculty/" + id,
        headers: { "Content-Type": "application/json" },
        dataType: "json",
        data: tosend,
        method: "PUT",
        success: function (response) {
            console.log(response);
            loadMembers();
            $("#updateModal").modal("hide");
        },
    });
}
function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".member");
    let id = parentDiv.attr("data-id");
    $.get("https://api.assign3.arose-niazi.me/api/faculty/" + id, function (response) {
        $("#updateId").val(response.id);
        $("#Uname").val(response.name);
        $("#Ugender").val(response.gender);
        $("#Uage").val(response.age);
        $("#Uemail").val(response.email);
        $("#Ucountry").val(response.address.country);
        $("#Ucity").val(response.address.city);
        $("#Ustreet_address").val(response.address.street_address);
        $("#Ucourse_code").val(response.course_code);
        $("#Uphone_numbers").val(response.phone_numbers);
        $("#updateModal").modal("show");
    });
}
function addMember() {
    var name = $("#name").val();
    var gender = $("#gender").val();
    var age = $("#age").val();
    var email = $("#email").val();
    var country = $("#country").val();
    var city = $("#city").val();
    var street_address = $("#street_address").val();
    var address = {country: country, city: city, street_address: street_address};
    var course_code = $("#course_code").val();
    var phone_numbers = $("#phone_numbers").val();
    phone_numbers = phone_numbers.split(",");
    var tosend = JSON.stringify({
        name,
        gender,
        age,
        email,
        address,
        course_code,
        phone_numbers,
    });
    //console.log("Sending data" +tosend);
    //console.table(tosend);
    $.ajax({
        url: "https://api.assign3.arose-niazi.me/api/faculty",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        dataType: "json",
        data: tosend,
        success: function (response) {
            console.log(response);
            $("#name").val("");
            $("#gender").val("");
            $("#age").val("");
            $("#email").val("");
            $("#country").val("");
            $("#city").val("");
            $("#street_address").val("");
            $("#course_code").val("");
            $("#phone_numbers").val("");
            loadMembers();
            $("#addModal").modal("hide");
        },
    });
}
function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".member");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url: "https://api.assign3.arose-niazi.me/api/faculty/" + id,
        method: "DELETE",
        success: function () {
            loadMembers();
        },
    });
}
function loadMembers() {
    $.ajax({
        url: "https://api.assign3.arose-niazi.me/api/faculty",
        method: "GET",
        error: function (response) {
            var faculty = $("#faculty");
            faculty.html("An Error has occured");
        },
        success: function (response) {
            console.log(response);
            var faculty = $("#faculty");
            faculty.empty();
            for (var i = 0; i < response.length; i++) {
                var rec = response[i];
                numbers = rec.phone_numbers;
                faculty.append(
                    `<div class="member" data-id="${rec.id}"><h3>${rec.name}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button>Age: ${rec.age} Gender: ${rec.gender}</br>Email: ${rec.email}</br>Address:<div class="address"><br>${rec.address.country} ---  ${rec.address.city}</br> ${rec.address.street_address}</div></br>Phone nunbers: ${numbers}</br>Course Code: ${rec.course_code}</p></p></div>`
                );
                // faculty.append("<div><h3>" + rec.title + "</h3></div>");
            }
        },
    });
}
