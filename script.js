// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function saveNumber(inputId) {
    var number = document.getElementById(inputId).value;
    database.ref('numbers/' + inputId).set({
        number: number
    });
    alert('登録しました！');
}

function calculateSum() {
    var sum = 0;
    var count = 0;
    ['number1', 'number2', 'number3'].forEach(id => {
        database.ref('numbers/' + id).get().then(function(snapshot) {
            if (snapshot.exists()) {
                sum += parseFloat(snapshot.val().number);
            }
            count++;
            if (count === 3) {
                document.getElementById('result').innerText = sum;
            }
        });
    });
}
