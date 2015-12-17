
var quote = {
  propTranslation: {
    'quoteText': '',
    'quoteAuthor': '-',
  }
}
quote.sendRequest = function() {
  var request = "http://api.forismatic.com/api/1.0/";

  $.ajax({
    url:request,
    jsonp:"jsonp",
    dataType:"jsonp",
    data: {
      method:"getQuote",
      lang:"en",
      format:"jsonp"
    }
  })
    .done(quote.gotQuote)
    .fail(quote.handleErr);
};
  
quote.gotQuote = function(response) {
  var str = ""
  $.each(response,function(prop,value) {
    if (quote.propTranslation[prop] !== undefined) {
    str += ('<p>' + quote.propTranslation[prop] + '-' + value + '</p>');
    }
   });
  $("#quoteBox").html(str);
}

quote.handleErr = function(jqxhr,textStatus,err) {
  console.log("Request Failed: " + textStatus + "," + err);
}

quote.display = function() {
  //call api for a quote
   quote.sendRequest();

}

$(document).ready(function() {
  quote.sendRequest();
  $("button").click(quote.display);
});
