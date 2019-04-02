let pathname = document.URL;
let jsonFileName = "";

if(pathname.toLocaleLowerCase().includes("bishal")){
    jsonFileName = "bishal";
} else if(pathname.toLocaleLowerCase().includes("anuj")){
    jsonFileName = "anuj";
} else {
    jsonFileName = "anuj";
}

$.getJSON("js/json/"+ jsonFileName +".json", function (data) {

    $(".author-img").css("background-image", "url(images/user-images/"+ data.imageUrl +")");

    let firstName = data.firstName;
    let middleName = data.middleName;
    let lastName = data.lastName;

    let fullName = firstName + " " + lastName;

    if (middleName) {
        fullName = firstName + " " + middleName + " " + lastName;
    }

    document.title = "Portfolio - " + fullName;


        $("#main-title-body, #name-carousel").text(fullName);

    $("#main-job-title, #job-title-carousel").text(data.mainJobTitle);
    $("#country-name").text(data.country);

    $("#cv-button, #portfolio-button").attr("href", data.cvLink);

    $("#about-me-1").html(data.aboutMe1);
    $("#about-me-2").html(data.aboutMe2);
    // $("#no-of-projects").text(data.noOfProjects);

    for(let i=0; i<data.basicSkills.length; i++){
        $("#skill-"+(i+1)).text(data.basicSkills[i])
    }

    for(let i=0; i<data.skills.length; i++){
        $("#skill-header-"+(i+1)).text(data.skills[i].name);
        $("#skill-percentage-"+(i+1)).text(data.skills[i].percentage + "%");
        $("#skill-percentage-"+(i+1)).parent().css({
            "width": data.skills[i].percentage + "%"
        });
    }



    let finalEducationHtml = "";


    for(let i=0; i<data.education.length;i++){
        finalEducationHtml += "<div class=\"panel panel-default\">\n" +
            "                                        <div class=\"panel-heading\" role=\"tab\" id=\"heading-"+ i +"\">\n" +
            "                                            <h4 class=\"panel-title\">\n" +
            "                                                <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\"\n" +
            "                                                   href=\"#collapse-"+ i +"\" aria-expanded=\"false\"\n" +
            "                                                   aria-controls=\"collapse-"+ i +"\"\n" +
            "                                                   id=\"title-education\"\n" +
            "                                                >\n" +
            "                                                    "+ data.education[i].title +"\n" +
            "                                                </a>\n" +
            "                                            </h4>\n" +
            "                                        </div>\n" +
            "                                        <div id=\"collapse-"+ i +"\" class=\"panel-collapse collapse\" role=\"tabpanel\"\n" +
            "                                             aria-labelledby=\"heading-"+ i +"\">\n" +
            "                                            <div class=\"panel-body\">\n" +
            "                                                <h2>"+ data.education[i].institution + "</h2>\n" +
            "                                                <h2>"+ data.education[i].startYear +"-"+ data.education[i].endYear +"</h2>\n" +
            "                                                <span class=\"education-details\">\n"+ data.education[i].details +"" +
            "                                                </span>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </div>"
    }
    $("#accordion").html(finalEducationHtml);


    let finalWorkExperienceHtml = "";
    for(let i=0; i<data.workExperience.length;i++){
        finalWorkExperienceHtml += "<article class=\"timeline-entry animate-box\" data-animate-effect=\"fadeInLeft\">\n" +
            "                                    <div class=\"timeline-entry-inner\">\n" +
            "\n" +
            "                                        <div class=\"timeline-icon color-"+ (i+1) +"\">\n" +
            "                                            <i class=\"icon-pen2\"></i>\n" +
            "                                        </div>\n" +
            "\n" +
            "                                        <div class=\"timeline-label\">\n" +
            "                                            <h2><a href=\""+ data.workExperience[i].instituteWebsite +
            "\" target='_blank'>" + data.workExperience[i].institution + "</a>\n" +
            "                                                <span>" + data.workExperience[i].startMonth.substring(0, 3) + ", " +
            data.workExperience[i].startYear + " - " +  data.workExperience[i].endMonth.substring(0, 3) +", "+ data.workExperience[i].endYear + "</span>\n" +
            "                                            </h2>\n" +
            "                                            <p><strong>" + data.workExperience[i].title + "</strong></p>\n" +
                                                            data.workExperience[i].details
            +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </article>\n"
    }

    $("#work-experience-main").html(finalWorkExperienceHtml);


    $("#main-email").html(data.email);
    $("#main-email").attr("href", "mailto:" + data.email);
    $("#main-address").html(data.address);
    $("#main-phone").html(data.phone);
    $("#main-phone").attr("href", "tel://" + data.phone);



    // submit form
    let apiKey = "2b68e828-7f3c-428b-a2a0-6b0858daeb11";
    let ourEmail = "bishalbaaniya@gmail.com";
    let baseUrl = "https://api.elasticemail.com/v2/email/send";

    $("#name, #email, #message, #subject").on("change", function () {
        if ($(this).val()) {
            $(this).css("border-bottom", "2px solid #e1e1e1")
        }
    });
    $("#email").on("blur", function () {
        if (!(validateEmail($(this).val()))) {
            $(this).css("border-bottom", "2px solid #ff0000")
        }
    });

    $('#contactForm').submit(function (e) {
        e.preventDefault();
        let name = document.getElementById('name');
        let email = document.getElementById('email');
        let subject = document.getElementById('subject');
        let message = document.getElementById('message');

        if (!name.value) {
            $("#name").css("border-bottom", "2px solid #ff0000")
        }
        if (!email.value || !validateEmail(email.value)) {
            $("#email").css("border-bottom", "2px solid #ff0000");
        }
        if (!subject.value) {
            $("#subject").css("border-bottom", "2px solid #ff0000")
        }
        if (!message.value) {
            $("#message").css("border-bottom", "2px solid #ff0000")
        }

        if (!name.value || !email.value || !message.value || !subject.value || !validateEmail(email.value)) {
            return false;
        } else {
            $.ajax({
                method: 'GET',
                url: baseUrl + "?apikey=" + apiKey + "&subject=" + subject.value +
                    "&from=" + ourEmail + "&to=" + data.email +
                    "&bodyHtml=" + "<strong>Name</strong>: "
                    + name.value + "<br/><strong>Email: </strong>" + email.value +
                    "<br/><strong>Message: </strong>" + message.value
            });
            e.preventDefault();
            $(this).get(0).reset();
            swal({
                title: "Success!",
                text: "Your message has been sent successfully",
                icon: "success",
                button: "OK",
            });
        }
        /*$.ajax({
                method: 'POST',
                url: '//formspree.io/bishalbaaniya@gmail.com',
                data: $('#contactForm').serialize(),
                datatype: 'json'
            });
            e.preventDefault();
            $(this).get(0).reset();
            alert("Message sent");
        }*/
    });

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    // end submit form

});


function submitForm(e) {
    e.preventDefault();
}




