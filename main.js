/*
lesson => 179
    To understand Ajax , Fetch , Promises

    Pyramid Of Doom || Callback Hell

        What Is Callback
        Callback Hell Example

    What Is Callback
        A Function That Is Passed Into Another One As An Argument To Be Excuted Later
        Function to Handle Photos
        [1] Downoad Photo From URL
        [2] Resize Photo
        [3] Add Logo To The Photo
        [4] Show The Photo In Website
*/

function makeItRed(e) {
  e.target.style.color = "red";
}

let p = document.querySelector(".test");
p.addEventListener("click", makeItRed);

function iamACallback() {
  //   console.log("I am A Callback Function");
}

setTimeout(iamACallback, 2000);

// simple callback hell 🙄
// setTimeout(() => {
//   console.log("Download Photo From URL");
//   setTimeout(() => {
//     console.log("Resize Photo");
//     setTimeout(() => {
//       console.log(" Add Logo To The Photo");
//       setTimeout(() => {
//         console.log("Show The Photo In Website");
//       }, 4000);
//     }, 3000);
//   }, 2000);
// }, 1000);

/*
lesson => 180
    Promise Intro And Syntax
        Promise In JavaScript Is Like Promise In Real Life
        Promise Is Something That Will Happen In The Future
        Promise Avoid Callback Hell 
        Promise Is The Object That Represent The Status Of An Asynchronous Operation And Its Resulting Value

    Promise Status
        Pending: Initial State
        Fulfilled: Completed Successfully
        Rejected: Faild

    Story
    Once A Promise Has Been Called , It Will Start In A Pending State
    The Created Promise will Eventually End In A Resolved State Or In A Rejected State
    Calling The Callback Function (Passed To Then And Catch) Upon finshing

    Then 
        Takes 2 Optional Arguments [Callback For Success Or Failure]
*/

// const myPromise = new Promise((resolveFunction, rejectFunction) => {
//   let connect = false;
//   if (connect) {
//     resolveFunction("Connection Established");
//   } else {
//     rejectFunction(Error("Connection Failed"));
//   }
// }).then(
//   (resolveValue) => console.log(`Good ${resolveValue}`),
//   (rejectValue) => console.log(`Bad ${rejectValue}`)
// );

// const myPromise = new Promise((resolveFunction, rejectFunction) => {
//   let connect = true;
//   if (connect) {
//     resolveFunction("Connection Established");
//   } else {
//     rejectFunction(Error("Connection Failed"));
//   }
// });

// console.log(myPromise);

// let resolver = (resolveValue) => console.log(`Good ${resolveValue}`);
// let rejecter = (rejectValue) => console.log(`Bad ${rejectValue}`);

// myPromise.then(resolver, rejecter );
// myPromise.then(
//   (resolveValue) => console.log(`Good ${resolveValue}`),
//   (rejectValue) => console.log(`Bad ${rejectValue}`)
// );
// myPromise.then(
//   (resolveValue) => console.log(`Good ${resolveValue}`),
//   (rejectValue) => console.log(`Bad ${rejectValue}`)
// );
// myPromise.then(
//   (resolveValue) => console.log(`Good ${resolveValue}`),
//   (rejectValue) => console.log(`Bad ${rejectValue}`)
// );

/*
lssson => 181
Promise Traning

    We Will go to the metting , promise me that we will ind the 4 employes
        .then(We Will Choose Two People)
        .then(We Will Test Them Then Get One Of them)
        .catch(No One Came)

    Then  => Promise Is Successul Use The Resolved Data
    Catch => Promise Is Failed , Catch The Error
    Finally => promise Successul OR Failed Finally Do Something
*/
const myPromise = new Promise((resolveFunction, rejectFunction) => {
  let employes = [];
  if (employes.length === 4) {
    resolveFunction(employes);
  } else {
    rejectFunction(Error("Number Of Employees Is Not 4"));
  }
});

myPromise
  .then((resolveValue) => {
    resolveValue.length = 2;
    return resolveValue;
  })
  .then((resolveValue) => {
    resolveValue.length = 1;
    return resolveValue;
  })
  .then((resolveValue) => {
    console.log(`The Chossen Emplyee Is ${resolveValue}`);
  })
  .catch((rejectedResason) => console.log(rejectedResason))
  .finally(console.log("The Operation Is Done"));

/*
lesson => 182
    promise And XHR
*/

const getData = (apiLink) => {
  return new Promise((resolve, reject) => {
    let myRequest = new XMLHttpRequest();
    myRequest.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject(Error("No Data Found"));
      }
    };

    myRequest.open("GET", apiLink);
    myRequest.send();
  });
};

getData("https://api.github.com/users/elzerowebschool/repos")
  .then((result) => {
    result.length = 10;
    return result;
  })
  .then((result) => console.log(result[0].name))
  .catch((rej) => console.log(rej));

//https://api.github.com/users/elzerowebschool/repos

// let jsData = JSON.parse(this.responseText);
// for (let i = 0; i < jsData.length; i++) {
//   let div = document.createElement("div");
//   let repoName = document.createTextNode(jsData[i].name);
//   div.appendChild(repoName);
//   document.body.appendChild(div);}

/*
lesson => 183
  Fetch API
    Return A Representation Of the Entire HTTP Response
*/

fetch("https://api.github.com/users/elzerowebschool/repos")
  .then((result) => {
    console.log(result);
    let myData = result.json();
    console.log(myData);
    return myData;
  })
  .then((myData) => {
    myData.length = 10;
    return myData;
  })
  .then((myData) => console.log(myData[0].name));

/*
lesson => 184
    promise
        All
        All Setted
        Race
*/

const myFirstPromise = new Promise((res, rej) => {
  setTimeout(() => {
    res("Iam The First Promise");
  }, 5000);
});

const mySecondPromise = new Promise((res, rej) => {
  setTimeout(() => {
    res("Iam The Second Promise");
  }, 1000);
});

const myThirdPromise = new Promise((res, rej) => {
  setTimeout(() => {
    res("Iam The Third Promise");
  }, 2000);
});

// Promise.all([myFirstPromise, mySecondPromise, myThirdPromise]).then(
//   (resolvedValues) => console.log(resolvedValues),
//   (rejecedValue) => console.log(`Rejected: ${rejecedValue}`)
// );

Promise.allSettled([myFirstPromise, mySecondPromise, myThirdPromise]).then(
  (resolvedValues) => console.log(resolvedValues),
  (rejecedValue) => console.log(`Rejected: ${rejecedValue}`)
);

Promise.race([myFirstPromise, mySecondPromise, myThirdPromise]).then(
  (resolvedValues) => console.log(resolvedValues),
  (rejecedValue) => console.log(`Rejected: ${rejecedValue}`)
);

/*
lesson => 185
    Async
        Async Before Function Mean This Function Return A promise
        Async And Adwait Help In Creating Asynchrononus Promise Behavior With Cleaner Style
*/

// function getData2() {
//   return new Promise((res, rej) => {
//     let users = ["Osama"];
//     if (users.length > 0) {
//       res("Users Found");
//       rej("No Users Found");
//     }
//   });
// }

// getData2().then(
//   (resolvedValue) => console.log(resolvedValue),
//   (rejectedValue) => console.log(rejectedValue)
// );

// function getData2() {
//   let users = [];
//   if (users.length > 0) {
//     return Promise.resolve("Users Found");
//   } else {
//     return Promise.reject("No Users Found");
//   }
// }

// getData2().then(
//   (resolvedValue) => console.log(resolvedValue),
//   (rejectedValue) => console.log(rejectedValue)
// );

async function getData2() {
  let users = ["k"];
  if (users.length > 0) {
    return "Users Found";
  } else {
    throw new Error("No Users Found");
  }
}
console.log(getData2());

getData2().then(
  (resolvedValue) => console.log(resolvedValue),
  (rejectedValue) => console.log(rejectedValue)
);

/*
lesson => 186
    Await
        Await Works Only Inside Asnyc Functions
        Await Make JavaScript Wait For The Promise Result
        Await Is More Elegant Syntax Of Getting Promise Result
*/

const myPromise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Iam the Good Promise"), reject(Error("Iam The Bad Promise"));
  }, 3000);
});

async function readData() {
  console.log("Before Promise");

  try {
    console.log(await myPromise2);
  } catch (reaseon) {
    console.log(`Reason: ${reaseon}`);
  } finally {
    console.log("After Promise");
  }

  // myPromise2.then((resolveValue) => console.log(resolveValue));
  // console.log(await myPromise2.catch((err) => err));
}

readData();

/*
lesson => 187
  Async & Await With Try , Catch , Finally
*/

async function fetchData() {
  console.log("Before Fecth");

  try {
   let myData = await fetch("https://api.github.com/users/elzerowebschool/repos");
   console.log(await myData.json())
  } catch (reaseon) {
    console.log(`Reason: ${reaseon}`);
  } finally {
    console.log("After Fetch");
  }
}
fetchData();
