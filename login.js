function _0x460e(_0x3bf5b8,_0x57d470){var _0x829a0a=_0x829a();return _0x460e=function(_0x460e7c,_0x3976da){_0x460e7c=_0x460e7c-0x9b;var _0x21c760=_0x829a0a[_0x460e7c];return _0x21c760;},_0x460e(_0x3bf5b8,_0x57d470);}function _0x829a(){var _0x3805a0=['1043010BtLOwW','5154288OdxIZE','tiktokviewshack.appspot.com','1:712600597854:web:e722216865193e817b4bcf','authDomain','323508impFbv','6CwemzU','AIzaSyAxwpS3zPUA5ZBNfB5XncXiLzw3PvSrR7s','747TmufYj','206099OsSVdg','769426QCZjEN','125480JaGcFR','1546616OFwDFM','712600597854','projectId','tiktokviewshack','tiktokviewshack.firebaseapp.com'];_0x829a=function(){return _0x3805a0;};return _0x829a();}var _0x2f27dd=_0x460e;(function(_0x284cc3,_0x3a397a){var _0x4c1499=_0x460e,_0x4cbb70=_0x284cc3();while(!![]){try{var _0x48a8b4=parseInt(_0x4c1499(0xa5))/0x1+parseInt(_0x4c1499(0xa2))/0x2*(-parseInt(_0x4c1499(0xa1))/0x3)+parseInt(_0x4c1499(0xa8))/0x4+-parseInt(_0x4c1499(0x9c))/0x5+-parseInt(_0x4c1499(0x9d))/0x6+parseInt(_0x4c1499(0xa6))/0x7+-parseInt(_0x4c1499(0xa7))/0x8*(-parseInt(_0x4c1499(0xa4))/0x9);if(_0x48a8b4===_0x3a397a)break;else _0x4cbb70['push'](_0x4cbb70['shift']());}catch(_0x1eeec3){_0x4cbb70['push'](_0x4cbb70['shift']());}}}(_0x829a,0x95bf8));var _0x83d56e={};_0x83d56e['apiKey']=_0x2f27dd(0xa3),_0x83d56e[_0x2f27dd(0xa0)]=_0x2f27dd(0x9b),_0x83d56e[_0x2f27dd(0xaa)]=_0x2f27dd(0xab),_0x83d56e['storageBucket']=_0x2f27dd(0x9e),_0x83d56e['messagingSenderId']=_0x2f27dd(0xa9),_0x83d56e['appId']=_0x2f27dd(0x9f);var firebaseConfig=_0x83d56e;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Key is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Key is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

    location.href = 'https://reuvendev.github.io/viewboost';

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}