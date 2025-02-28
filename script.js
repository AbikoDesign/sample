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
function exportToCSV() {
    var ref = firebase.database().ref('numbers'); // Adjust this path to match your database structure
    ref.once('value', function (snapshot) {
        var data = snapshot.val();

        // Initialize the CSV string with headers
        var csv = 'ID,Number\n';

        // Loop through the data and append rows to the CSV string
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                csv += key + ',' + data[key].number + '\n'; // Adjust fields to match your data
            }
        }

        // Create a Blob from the CSV string
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        // Create a link to download the file
        var link = document.createElement('a');
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'numbers.csv'); // Name of the file
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up
    });
}
