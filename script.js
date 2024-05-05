import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
      
        const firebaseConfig = {
          apiKey: "AIzaSyB2Pzx7-_FUwJbk2LZg2yumUK24PkNq3GQ",
          authDomain: "pedro-counter-app.firebaseapp.com",
          databaseURL: "https://pedro-counter-app-default-rtdb.asia-southeast1.firebasedatabase.app",
          projectId: "pedro-counter-app",
          storageBucket: "pedro-counter-app.appspot.com",
          messagingSenderId: "902087330011",
          appId: "1:902087330011:web:6ea6b5428704fc006de4fe"
        };

        const app = initializeApp(firebaseConfig);

        import { getDatabase, ref, set, child, get, update} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
        const db = getDatabase();

        const button = document.getElementById("add-count-button");

        const audio = new Audio("./Assets/pedro-song.m4a");

        async function getCount(){
            const dbRef = ref(db);
            var data;

            await get(child(dbRef, "pedro-count")).then((snapshot) => {
                if(snapshot.exists()){
                    data = Number(snapshot.val());
                }else{
                    console.log("Failed to retreive data");
                    return -1;
                }
            });

            return data;
        }

        function addCount(){
            button.disabled = true;
            button.classList.add("spin");

            audio.play();

            audio.addEventListener("ended", () => {
                button.disabled = false;
                button.classList.remove("spin");
            })

            getCount().then((count) => {
                const newData = count+1;
                console.log(newData);
                update(ref(db), {"pedro-count" : newData}).then( () => {
                    updateCount();
                });
            })
        }

        function updateCount() {
            getCount().then((count) => {
                console.log(count);
                document.getElementById("count").innerHTML = count + "x";
            });
        }

        window.onload = () => {
            updateCount();
            // setInterval(updateCount, 2000);
        };

        button.addEventListener("click", addCount);