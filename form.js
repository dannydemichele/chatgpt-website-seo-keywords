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


    var prompt =
`Please ignore all previous instructions. I want you to respond only in language English*. you are to create an SEO keyword strategy for the following keyword ${word} I want you to act as a market research expert that speaks and writes fluent English*. Pretend that you have the most accurate and most detailled information about keyword ${word}, Pretend that you are able to develop a full SEO content plan in fluent English*. From the primary keyword create a markdown table with a keyword list for an SEO content strategy plan on the keyword ${word}. Cluster the keywords according to the top 10 super categories and name the super category in the first column called keyword cluster. Add in another column with 7 subcategories for each keyword cluster or specific long-tail keywords for each of the clusters. List in another column the human searcher intent for the keyword. Cluster the topic in one of three search intent groups based on their search intent being, whether commercial, transactional or informational. Then in another column, write a simple but very click-enticing title to use for a post about that keyword. Then in another column write an attractive meta description that has the chance for a high click-thru-rate for the topic with 120 to a maximum of 155 words. The meta description shall be value based, so mention value of the article and have a simple call to action to cause the searcher to click. Do NOT under any circumstance use too generic keyword like introduction or conclusion. Focus on the most specific keywords only. Do not use single quotes, double quotes or any other enclosing characters in any of the columns you fill in. Do not explain why and what you are doing, just return your suggestions in the table. The markdown table shall be in English* language and have the following columns: keyword cluster, keyword, search intent, title, meta description. 
product ${productName},
promo:${promo}, 
target audience:${audience},
tone of article:${tone}`;

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
