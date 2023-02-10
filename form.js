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


    var prompt =
`Ignore All Previous instructions before this one. You are an expert ${productName}, and you have been assigned a task to rewrite an article in the label Existing Content below. Please the structure, format, style, Tone and length of the article in Existing content section below, which is labeled Existing Content, which was successful for me in past use. You need to take the information from the New Content section and recreate it for a different company and rewrite which I outline in "New Content" section below. So please leave no trace of the previous content, you are only using it as your base structure.

The New Content Needs To Take the Existing content which is in and change it with the information listed here:

New Content:
1. Please weave the following call to action into the content: ${promo}, 
2. The target audience to read this is: ${audience},
3. please include some of the following notes: ${tone},


Existing Content:
words count:${word}
`

    prompt = JSON.parse(JSON.stringify(prompt));

    var data = {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 2048,
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
