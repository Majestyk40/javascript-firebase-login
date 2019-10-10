// TUTO MISE EN PLACE LOGIN AVEC FIREBASE
// On créé la variable qui va stocker nos données de connexions et identifiants firebase
var config = {
    apiKey: "votreApiKey",
    authDomain: "votreAuthDomain",
    databaseURL: "votreDbURL",
    projectId: "votreProjectID",
    storageBucket: "vosInfo",
    messagingSenderId: "votreMessagingSenderId"
};
// On initialise firebase avec nos données config
firebase.initializeApp(config);
// Puis on déclare la database
var database = firebase.database();

function login(){
    // Ici on récupère les infos laissées par l'utilisateur sur la page HTML
    var userEmail = document.getElementById("emailField").value;
    var userPass = document.getElementById("passField").value;
    
    // Firebase nous facilite la vie en fournissant les codes pour la connexion...
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // ... Et gère même les erreurs !
      var errorCode = error.code;
      var errorMessage = error.message;

        window.alert("Erreur : " + errorMessage);
    });

}

// On récupère les données utilisateur renvoyées par les serveurs de firebase
var user = firebase.auth().currentUser;

// Ce qui nous permet de gérer les actions à entreprendre comme l'ouverture d'une page membre
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      
    window.open("http://www.monsupersite.com/pagemembre.html", "_self");
    // L'utilisateur est bien connu de firebase et donc la connexion est possible
  } else {
    // Utilisateur inconnu. On peut le renvoyer vers une page inscription par exemple
    window.open("http://www.monsupersite.com/inscription.html", "_self");

  }
});

// Ici on gère la déconnexion. Soit en cliquant sur un bouton via la page membre, soit à la fermeture de la page.
function signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

