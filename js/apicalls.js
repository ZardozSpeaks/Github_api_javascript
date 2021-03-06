/*This app currently requires the use of an API key to function. To create a key, visit the Settings area of your Github account, select Personal Access Tokens from the sidebar and choose "generate new token".

Store the token in a file titled ".env" in the root file of this project directory. Include the following code in the file with your token info between the quotation marks:

exports.apiKey = "";
*/

var apiKey = require('./../.env').apiKey;

  exports.findUser = function(userName){
    var query = 'https://api.github.com/users/' + userName + '?access_token=' + apiKey;
    $.get(query).then(function(response){
      console.log(response);
      var name = response.login;
      var url = response.html_url;
      $('#top-text').html('<h3>Github user <a href=\"' + url +'\" target=\"_blank\">' + name + '</a></h3>');
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
  };

  exports.findRepos = function(userName){
    var query = 'https://api.github.com/users/' + userName + '/repos?access_token=' + apiKey;
    $.get(query).then(function(response){
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var link = response[i].clone_url;
        var title = (response[i].full_name).slice(response[i].owner.login.length + 1);
        if (response[i].description != "") {
            var description = response[i].description;
          } else {
            var description = "no description";
          }
        $('#results').append('<div class=\"user-project\"><h4><a href=\"' +link + '\" target=\"_blank\">' + title + '</a></h4>' + '<p>' + description + '</p></div><hr>');
      }
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
  };
