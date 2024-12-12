// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAm5YzqWj3XvWi2b9aDDzs6SjoWm4bEY_Q",
    authDomain: "sample-fcb1d.firebaseapp.com",
    databaseURL: "https://sample-fcb1d-default-rtdb.firebaseio.com",
    projectId: "sample-fcb1d",
    storageBucket: "sample-fcb1d.firebasestorage.app",
    messagingSenderId: "212374268662",
    appId: "1:212374268662:web:549b8c7aa9967d0a605ad7"
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
