
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, Button, TextInput,ActivityIndicator } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { doc, setDoc, addDoc, collection, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../firebase/config';

export const ResetClock = ({navigation}) => {

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idd, setIdd] = useState('');
  const [timer, setTimer] = useState('');
  const [users, setUsers] = useState('');

  useEffect(() => {
     console.log('Hoo you okay')
    // change();
    // readall();  
    // allUsers();
    getDocs(collection(db, "users")).then(docSnap =>{
      let users =[];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id:doc.id})
      });
      console.log('Document data', users);
      setUsers(users);
      console.log(users)
  });

  },[])
  

  // componentWillMount(){
  //   change();
  // }
  
  
  console.log(timer)

  // function change() {
  //   setTimeout(() => {
  //     setTimer('Yes')
  //     console.log(timer)
  //   }, "1000");
  // }


  function create () {
    addDoc(collection(db, "users"), {
  username: username,
  email: email,
}).then(() => {
  console.log('data submitted');
}).catch((error) => {
  console.log(error);
});;
console.log("Added....");
alert("Added")
  }


  function update () {
    updateDoc(doc(db, "users", "SYvJ4dAp9joAjO9i5ppx"), {
  username: username,
  email: email,
}).then(() => {
  console.log('data submitted');
}).catch((error) => {
  console.log(error);
});;
console.log("Updated....");
alert("Updated")
  }


  function Delete () {
    deleteDoc(doc(db, "users", idd)) 
    console.log("Deleted....", idd);
alert("Deleted", idd)
  }


  
  function read () {
    getDoc(doc(db, "users", idd), {

    }).then((docData) => {
      if (docData.exists()) {
        console.log(docData.data().Clocks);
        setName(docData.data().username)
        setEmail(docData.data().email)
      }else{
        console.log("No such data");
        alert("No such data")
      }
}).catch((error) => {
  console.log(error);
});
  }



  function readall () {
    getDocs(collection(db, "Clocks")).then(docSnap =>{
      let Clocks =[];
      docSnap.forEach((doc) => {
        Clocks.push({ ...doc.data(), id:doc.id})
      });
      console.log('Document data', Clocks);
});
}

// function allUsers () {
//   getDocs(collection(db, "users")).then(docSnap =>{
//     let users =[];
//     docSnap.forEach((doc) => {
//       users.push({ ...doc.data(), id:doc.id})
//     });
//     console.log('Document data', users);
//     setUsers(users);
//     console.log(users)
// });
// }




function readByQuery () {
  getDocs(query(collection(db, "users"), where('email' , '==', 'solomon@gmail.com'))).then(docSnap =>{
    let users =[];
    docSnap.forEach((doc) => {
      users.push({ ...doc.data(), id:doc.id})
    });
    console.log('Document data', users);
});
}




  




  function login () {
    console.log(users);
    
   const checkData = users.filter(d => d.email >= "atundepeter");
    console.log("email Output",checkData);
    
    const checkName = users.filter(d => d.username == "Solomon");
    console.log("Fetch by username",checkName);
    const email = (checkName[0])
    console.log("User Email",email.email);
    
  

    
  }

  function log_in() {
    if (!users) {
      alert('pls WAIT Loading')
    } else {
      console.log(users);

      const pass = users.filter(d => d.password == 1234 && d.username == "Atunde");
      console.log("Passed",pass);

      if(pass == ''){
          console.log('Access denied')
      }else {
          console.log('passed')
          const user = (pass[0])
          const username = (user.username)
          navigation.push("Details", {
            username: username,
            userdata:user
          });
          console.log('username', user.username )
      }

      

    //   const myJSON = JSON.stringify(checkName)
    //   console.log(myJSON)
    }
   
  }

function Proceed () {
  console.log('ok')
  setTimer("Okay")
}


  //   return (
  //     <TailwindProvider>
  //       <View className="flex-1 justify-center items-center bg-pink-500 font-bold ">
  //         <View className="mt-10 flex-1  ">
  //           <View className="">
  //           <View className=" items-center">
  //             <Text className="font-bold pb-2">RESET CLOCK</Text>
  //           </View>
  //           <View>
  //           <Button title="Go Back" onPress={() => navigation.goBack()} />
  //         </View>
  //         <View className=" flex w-[90%] items center pt-20 pb-5">
  //           <Text>ENTER SECURE PASSWORD TO RESET CLOCK TO DATE</Text>
  //         </View>
  //         <View className=" flex w-[90%] items center ">
  //           <Text>NB: Ask your department admin</Text>
  //         </View>
  //         </View>
  //         </View>
  //       </View>
  //     </TailwindProvider>
  //   );
  // }


  if (!users) {
    return (
      <TailwindProvider>
        <View className="flex-1 justify-center items-center bg-[#48015c] font-bold ">
          <View className="mt-[-10] flex-1 mt-20">
            <View className="mt-20 pb-10">
           
              <ActivityIndicator size="large" color="#050112" className="mt-20 pt-20"/>
            </View>
          </View>
        </View>
      </TailwindProvider>
    );
  } else {
    return (
      <TailwindProvider>
      <View className="flex-1 justify-center items-center bg-[#48015c] font-bold ">
        <View className="mt-10 flex-1  ">
          <View className="">
          <View className=" items-center">
            <Text className="font-bold mb-5 mt-10">RESET CLOCK</Text>
          </View>
          <View>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
        <View className=" flex w-[90%] items center pt-20 pb-5">
          <Text>ENTER SECURE PASSWORD TO RESET CLOCK TO DATE</Text>
        </View>
        <View className=" flex w-[90%] items center ">
          <Text>NB: Ask your department admin</Text>
        </View>
        </View>
        </View>
      </View>
    </TailwindProvider>
    );
  }
};






export default ResetClock