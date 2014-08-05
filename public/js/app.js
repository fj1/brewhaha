  // PREVENT DEFAULT
  // GRAB VALUES FROM FORM
  // SEND AJAX REQUEST
    // ON SUCCESS, CALL buildMap
      $.ajax({
        url: '/query',
        success: function(data) {
          buildMap(data);
        }
      })







