$.getJSON("js/json/bishal.json", function (data) {
    console.log("this is the data read", data);

    $(".author-img").css("background-image", "url(images/user-images/"+ data.imageUrl +")");

    let firstName = data.firstName;
    let middleName = data.middleName;
    let lastName = data.lastName;

    let fullName = firstName + " " + lastName;

    if (middleName) {
        fullName = firstName + " " + middleName + " " + lastName;
    }

    $("#main-title-body, #name-carousel").text(fullName);

    $("#main-job-title, #job-title-carousel").text(data.mainJobTitle);
    $("#country-name").text(data.country);

    $("#about-me-1").html(data.aboutMe1);
    $("#about-me-2").html(data.aboutMe2);

});
