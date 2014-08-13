var user_text;
var user_state;
var user_loc_type;
var user_organic;
var submit_data;

// *********** clear any error text ***********
$('#userInput').on('click', function() {
  $('#errorText').text("");
});

// *********** grab user input ***********
var getInput = function(){
  user_text = $('#userInput').val().toLowerCase();
  user_state = $('#stateName').val();
  user_loc_type = $('#locType').val();
  console.log("user_loc_type is ", user_loc_type);
  // if ($('#checkboxSwitch').prop('checked')) {
  //   user_organic = "Y";
  // }
  // else {
  //   user_organic = "N";
  // }
  console.log("the user_text is ", user_text);
  console.log("the user_state is ", user_state);
  console.log("the user_loc_type is ", user_loc_type);
  // console.log("the user_organic is ", user_organic);
};

// *********** check input and dynamically build params ***********
var checkInput = function() {
  // dynamically build params to pass to .ajax call
  // then pass the params as data:submit_data
  submit_data = {  
    inPlanning: "N",
    isClosed: "N",
    openToPublic: "Y",
    status: "verified", 
    countryIsoCode: "US"
  };

  if (user_state != "State") {
    submit_data['region'] = user_state;
  }

  if (user_loc_type != "Location Type") {
    submit_data['locationType'] = user_loc_type;
  }

  // only search for organic if user requests it
  // (if unchecked, both organic and non-organic are allowed)
  // if (user_organic === "Y") {
  //   submit_data['isOrganic'] = "Y"
  // }

  if (user_text != "") {
    // check for zip codes
    if( /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(user_text) === true) {
      submit_data['postalCode'] = user_text;
    }
    // check for city/text
    else if ( /^[a-zA-Z .,']*$/.test(user_text) === true ){
      submit_data['locality'] = user_text;
    }
    // error msg for text input
    else {
      return {
        success: false,
        error: "Please reenter the city or zip code."
      }
    }
  }

  // check that user entered something
  if (_.size(submit_data) === 5) {
    return {
      success: false,
      error: "Please choose filters for your search."
    }
  }

  console.log("submit_data is ", submit_data);
  return { success: true };
} // end checkInput

// *********** submit event handler ***********

// using the form.submit means that the form will submit
// on both 'enter' keyup and the submit button
$('form').submit(function(e) {
  e.preventDefault();
  getInput();
  showLoadingGif(); 
  $('#errorText').text("");
  $('#detailDiv').text("");

  var result = checkInput();

  if (result.success) {     
    $.ajax({
      url: '/query',
      type: 'GET',
      data: submit_data,
      // next line tells jquery to accept json
      dataType: 'json',
      success: function(data) {
        if (data["error"]) {
          console.log("An error:", data.error);
          $('#errorText').text("Sorry, no breweries match your query.");
          hideLoadingGif();
        } 
        else {
          buildMap(data);
        }
      },
      // catch any other errors
      error: function(data) {
        console.log(data);
      }
    });    
  }
  else {
    $('#errorText').text(result.error);
    hideLoadingGif();
  } 
})

// *********** ajax loader ***********

function showLoadingGif() {
  $('#loadingGif').show();
  $('form').prop('disabled', true);
}

function hideLoadingGif() {
  $('#loadingGif').hide();
  $('form').prop('disabled', false);
}







