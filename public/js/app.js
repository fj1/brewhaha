var user_text;
var user_state;
var user_loc_type;
var user_organic;
var submit_data;

// *********** clear error text if it's present ***********
$('#userInput').on('click', function() {
  $('#errorText').text("");
});

// *********** grab user input ***********
var getInput = function(){
  user_text = $('#userInput').val();
  user_state = $('#stateName').val();
  user_loc_type = $('#locType').val(); 
  if ($('#checkboxSwitch').prop('checked')) {
    user_organic = "Y";
  }
  else {
    user_organic = "N";
  }
  console.log("the user_text is ", user_text);
  console.log("the user_state is ", user_state);
  console.log("the user_loc_type is ", user_loc_type);
  console.log("the user_organic is ", user_organic);
};

// *********** check input and dynamically build params ***********
var checkInput = function() {
  // dynamically build params to pass to .ajax call
  // then pass the params as data:submit_data
  submit_data = {  
    inPlanning: "N",
    isClosed: "N",
    openToPublic: "Y",
    status: "verified"
  };

  if (user_state != "State") {
    submit_data['region'] = user_state;
  }

  if (user_loc_type != "Location Type") {
    submit_data['locationType'] = user_loc_type;
  }

  // only search for organic if user requests it
  // (if unchecked, both organic and non-organic are allowed)
  if (user_organic === "Y") {
    submit_data['isOrganic'] = "Y"
  }

  if (user_text != "") {
    // check for zip codes
    if( /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(user_text) === true) {
      submit_data['postalCode'] = user_text;
      console.log("the zip was ok");
    }
    // check for city/text
    else if ( /^[a-zA-Z .,']*$/.test(user_text) === true ){
      submit_data['locality'] = user_text;
      console.log('the city was ok');
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
  if (_.size(submit_data) === 4) {
    return {
      success: false,
      error: "Please choose filters for your search."
    }
  }

  console.log("submit_data is ", submit_data);
  return { success: true };
} // end checkInput

// *********** submit event handler ***********
$('#submit').on('click', function(e) {
  e.preventDefault();
  getInput();
  var result = checkInput();

  if (result.success) {  
    $.ajax({
      url: '/query',
      type: 'GET',
      data: submit_data,
      success: function(data) {
        buildMap(data);
      }
    });    
  }
  else {
    $('#errorText').text(result.error);
  }
});








