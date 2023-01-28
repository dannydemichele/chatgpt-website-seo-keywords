var key = '';
var xhr = new XMLHttpRequest();
xhr.open("GET", "./key.txt", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        key = xhr.responseText;
    }
};
xhr.send();

function validateContactForm() {
    var valid = true;
    $(".info").html("");
    $(".input-field").css('border', '#e0dfdf 1px solid');
    $("#contact-company-name").removeClass("error-field");
    $("#contact-product-name").removeClass("error-field");
    $("#contact-promo").removeClass("error-field");
    $("#contact-audience").removeClass("error-field");
    $("#contact-tone").removeClass("error-field");
    $("#contact-word").removeClass("error-field");

    var companyName = $("#contact-company-name").val();
    console.log(companyName);
    var productName = $("#contact-product-name").val();
    var promo = $("#contact-promo").val();
    var audience = $("#contact-audience").val();
    var tone = $("#contact-tone").val();
    var word = $("#contact-word").val();

    var selectElement = document.querySelector('#select');
    var output = selectElement.value;

    if (companyName == "") {
        $("#companyName-info").html("Required.");
        $("#contact-company-name").css('border', '#e66262 1px solid');
        $("#contact-company-name").addClass("error-field");
        valid = false;
    }
    if (productName == "") {
        $("#productName-info").html("Required.");
        $("#contact-product-name").css('border', '#e66262 1px solid');
        $("#contact-product-name").addClass("error-field");
        valid = false;
    }
    if (promo == "") {
        $("#promo-info").html("Required.");
        $("#contact-promo").css('border', '#e66262 1px solid');
        $("#contact-promo").addClass("error-field");
        valid = false;
    }
    if (audience == "") {
        $("#audience-info").html("Required.");
        $("#contact-audience").css('border', '#e66262 1px solid');
        $("#contact-audience").addClass("error-field");
        valid = false;
    }

    if (tone == "") {
        $("#tone-info").html("Required.");
        $("#contact-tone").css('border', '#e66262 1px solid');
        $("#contact-tone").addClass("error-field");
        valid = false;
    }
    if ($('input[name="contact-subject"]:checked').length == 0) {
        $("#subject-info").html("Required.");
        valid = false;
    }
    if (word == "") {
        $("#word-info").html("Required.");
        $("#contact-word").css('border', '#e66262 1px solid');
        $("#contact-word").addClass("error-field");
        valid = false;
    }

    var url = "https://api.openai.com/v1/completions";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${key}`
    );

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            let response = xhr.responseText;
            response = JSON.parse(response);

            console.log(response);

            document.getElementById("output").innerHTML =
                response["choices"][0]["text"];
        }
    };


    prompt=`
        Generate text for ${output} with
        company name:"""${companyName}"""
        product name:"""${productName}"""
        promo:"""${promo}"""
        target audience:"""${audience}"""
        tone of article:"""${tone}"""
        words count:"""${word}"""
    `



    prompt = JSON.parse(JSON.stringify(productName));


    var data = {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 1300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    };

    data = JSON.stringify(data);

    xhr.send(data);



    return valid;
}




function text() {
    // console.log("hello")


}