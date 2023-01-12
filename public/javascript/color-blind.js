const colorBlindInput = document.querySelectorAll(".color-blind-input");
const answerBox = document.querySelectorAll(".answer-box");
const takeTestBtn = document.querySelector(".take-test-btn");
const colorBlindTestContainer = document.querySelector(".color-blind-test");
const colorBlindResult = document.querySelector(".color-blind-result");
const h3FinalResult = document.querySelector(".final-result");

takeTestBtn.addEventListener("click", () => {
  colorBlindTestContainer.classList.remove("hidden");
});

let resultContainer = {
  protanopia: 0,
  tritanomaly: 0,
  question: 0,
  correct: 0,
  wrong: 0,
};

const finalResult = (result) => {
  if (result.protanopia > result.tritanomaly) {
    let percentage = (result.wrong / result.question) * 100;

    if (percentage >= 70 && percentage <= 100) {
      let text = document.createTextNode("You have a High possibility of having a Protanopia Color Blindness");

      h3FinalResult.appendChild(text);

      colorBlindResult.classList.remove("hidden");
      document.cookie = "result=You have a high possibility of having a Protanopia Color Blindness";
    } else if (percentage >= 30 && percentage <= 70) {
      let text = document.createTextNode("You have a Medium possibility of having a Protanopia Color Blindness");

      h3FinalResult.appendChild(text);

      colorBlindResult.classList.remove("hidden");
      document.cookie = "result=You have a Medium possibility of having a Protanopia Color Blindness";
    } else if (percentage >= 0 && percentage <= 30) {
      let text = document.createTextNode("You have a Low possibility of having a Protanopia Color Blindness");

      h3FinalResult.appendChild(text);

      colorBlindResult.classList.remove("hidden");
      document.cookie = "result=You have a Low possibility of having a Protanopia Color Blindness";
    }
  } else if (result.protanopia < result.tritanomaly) {
    console.log("tritanomaly");
  } else {
    console.log("unconsively");
  }
};

const checkAnswer = setInterval(() => {
  if (resultContainer.question == 8) {
    finalResult(resultContainer);
    clearInterval(checkAnswer);
  }
}, 1000);

const validateColorBlind = () => {
  colorBlindInput.forEach((input) => {
    if (input == document.activeElement) {
      if (input.classList.contains("input-1")) {
        let inputValue = input.value;

        if (inputValue == 7) {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-1")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above is 7. Most individuals with normal color vision will see this number.");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.question++;
              resultContainer.correct++;

              answer.style.display = "block";
              input.style.display = "none";
            }
          });
        } else {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-1")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above is actually 7. People with Red and Green color blind (Protanopia) won't see the number clearly");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.protanopia++;
              resultContainer.question++;
              resultContainer.wrong++;

              answer.style.display = "block";
              answer.style.color = "red";
              input.style.display = "none";
            }
          });
        }
      } else if (input.classList.contains("input-2")) {
        let inputValue = input.value;

        if (inputValue == 26) {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-2")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above is 7. Most individuals with normal color vision will see this number.");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.question++;
              resultContainer.correct++;

              answer.style.display = "block";
              input.style.display = "none";
            }
          });
        } else {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-2")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above is actually 26. People that are red color blind see only a 6, green color blind people may see only a 2.");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.protanopia++;
              resultContainer.question++;
              resultContainer.wrong++;

              answer.style.display = "block";
              answer.style.color = "red";
              input.style.display = "none";
            }
          });
        }
      } else if (input.classList.contains("input-3")) {
        let inputValue = input.value;

        if (inputValue == 12) {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-3")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("Everyone should see the number 12 including people that are color blind.");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.question++;
              resultContainer.correct++;

              answer.style.display = "block";
              input.style.display = "none";
            }
          });
        } else {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-3")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("Everyone should see the number 12 including people that are color blind.");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.question++;
              resultContainer.wrong++;

              answer.style.display = "block";
              answer.style.color = "red";
              input.style.display = "none";
            }
          });
        }
      } else if (input.classList.contains("input-4")) {
        let inputValue = input.value;

        if (inputValue == 15) {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-4")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above is 15. Most individuals with normal color vision will see this number.");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.question++;
              resultContainer.correct++;

              answer.style.display = "block";
              input.style.display = "none";
            }
          });
        } else {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-4")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above is actually 15. People with Red and Green color blind (Protanopia) will see number as 17");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.protanopia++;
              resultContainer.question++;
              resultContainer.wrong++;

              answer.style.display = "block";
              answer.style.color = "red";
              input.style.display = "none";
            }
          });
        }
      } else if (input.classList.contains("input-5")) {
        let inputValue = input.value;

        if (inputValue == 45) {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-5")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above is 45. Most individuals with normal color vision will see this number.");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.question++;
              resultContainer.correct++;

              answer.style.display = "block";
              input.style.display = "none";
            }
          });
        } else {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-5")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above actually 45. People with Red and Green color blind (Protanopia) won't see the number clearly");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.protanopia++;
              resultContainer.question++;
              resultContainer.wrong++;

              answer.style.display = "block";
              answer.style.color = "red";
              input.style.display = "none";
            }
          });
        }
      } else if (input.classList.contains("input-6")) {
        let inputValue = input.value;

        if (inputValue == 6) {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-6")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above is 6. Most individuals with normal color vision will see this number.");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.question++;
              resultContainer.correct++;

              answer.style.display = "block";
              input.style.display = "none";
            }
          });
        } else {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-6")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above actually 6. People with Red and Green color blind (Protanopia) won't see the number clearly");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.protanopia++;
              resultContainer.question++;
              resultContainer.wrong++;

              answer.style.display = "block";
              answer.style.color = "red";
              input.style.display = "none";
            }
          });
        }
      } else if (input.classList.contains("input-7")) {
        let inputValue = input.value;

        if (inputValue == 73) {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-7")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above is 73. Most individuals with normal color vision will see this number.");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.question++;
              resultContainer.correct++;

              answer.style.display = "block";
              input.style.display = "none";
            }
          });
        } else {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-7")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above actually 73. People with Red and Green color blind (Protanopia) won't see the number clearly");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.protanopia++;
              resultContainer.question++;
              resultContainer.wrong++;

              answer.style.display = "block";
              answer.style.color = "red";
              input.style.display = "none";
            }
          });
        }
      } else if (input.classList.contains("input-8")) {
        let inputValue = input.value;

        if (inputValue == 5) {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-8")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above is 5. Most individuals with normal color vision will see this number.");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.question++;
              resultContainer.correct++;

              answer.style.display = "block";
              input.style.display = "none";
            }
          });
        } else {
          answerBox.forEach((answer) => {
            if (answer.classList.contains("box-8")) {
              let paragraph = document.createElement("p");
              let text = document.createTextNode("The number pictured above actually 5. People with Red and Green color blind (Protanopia) won't see the number clearly");

              paragraph.appendChild(text);
              answer.appendChild(paragraph);

              resultContainer.protanopia++;
              resultContainer.question++;
              resultContainer.wrong++;

              answer.style.display = "block";
              answer.style.color = "red";
              input.style.display = "none";
            }
          });
        }
      }
    }
  });
};

// const input1 = () => {
//   colorBlindInput.forEach((input) => {
//     if (input.classList.contains("input-1")) {
//       let inputValue = input.value;

//       if (inputValue == 7) {
//         console.log(true);
//         answerBox.forEach((answer) => {
//           if (answer.classList.contains("box-1")) {
//             const paragraph = document.createElement("p");
//             const text = document.createTextNode("The number pictured above is 7. Most individuals with normal color vision will see this number.");

//             paragraph.appendChild(text);
//             answer.appendChild(paragraph);

//             answer.style.display = "block";
//             input.style.display = "none";
//             return;
//           }
//         });
//       } else {
//         console.log(false);
//         answerBox.forEach((answer) => {
//           if (answer.classList.contains("box-1")) {
//             const paragraph = document.createElement("p");
//             const text = document.createTextNode("The number pictured above is actually 7. Most individuals with normal color vision will see this number.");

//             paragraph.appendChild(text);
//             answer.appendChild(paragraph);

//             answer.style.display = "block";
//             answer.style.color = "red";
//             input.style.display = "none";
//             return;
//           }
//         });
//       }
//     }
//     return;
//   });
// };

// const input2 = () => {
//   colorBlindInput.forEach((input) => {
//     if (input.classList.contains("input-2")) {
//       let inputValue = input.value;

//       if (inputValue == 26) {
//         console.log(true);
//         answerBox.forEach((answer) => {
//           if (answer.classList.contains("box-2")) {
//             const paragraph = document.createElement("p");
//             const text = document.createTextNode("The number pictured above is 26. People that are red color blind see only a 6, green color blind people may see only a 2.");

//             paragraph.appendChild(text);
//             answer.appendChild(paragraph);

//             answer.style.display = "block";
//             input.style.display = "none";
//             return;
//           }
//         });
//       } else {
//         console.log(false);
//         answerBox.forEach((answer) => {
//           if (answer.classList.contains("box-2")) {
//             const paragraph = document.createElement("p");
//             const text = document.createTextNode("The number pictured above is actually 26. People that are red color blind see only a 6, green color blind people may see only a 2.");

//             paragraph.appendChild(text);
//             answer.appendChild(paragraph);

//             answer.style.display = "block";
//             answer.style.color = "red";
//             input.style.display = "none";
//             return;
//           }
//         });
//       }
//     }
//     return;
//   });
// };

// const input3 = () => {
//   colorBlindInput.forEach((input) => {
//     if (input.classList.contains("input-3")) {
//       let inputValue = input.value;

//       if (inputValue == 12) {
//         console.log(true);
//         answerBox.forEach((answer) => {
//           if (answer.classList.contains("box-3")) {
//             const paragraph = document.createElement("p");
//             const text = document.createTextNode("Everyone should see the number 12 including people that are color blind.");

//             paragraph.appendChild(text);
//             answer.appendChild(paragraph);

//             answer.style.display = "block";
//             input.style.display = "none";
//             return;
//           }
//         });
//       } else {
//         console.log(false);
//         answerBox.forEach((answer) => {
//           if (answer.classList.contains("box-3")) {
//             const paragraph = document.createElement("p");
//             const text = document.createTextNode("Everyone should see the number 12 including people that are color blind.");

//             paragraph.appendChild(text);
//             answer.appendChild(paragraph);

//             answer.style.display = "block";
//             answer.style.color = "red";
//             input.style.display = "none";
//             return;
//           }
//         });
//       }
//     }
//     return;
//   });
// };

// const input4 = () => {
//   colorBlindInput.forEach((input) => {
//     if (input.classList.contains("input-4")) {
//       let inputValue = input.value;

//       if (inputValue == 15) {
//         console.log(true);
//         answerBox.forEach((answer) => {
//           if (answer.classList.contains("box-4")) {
//             const paragraph = document.createElement("p");
//             const text = document.createTextNode("The number pictured above is 15. Most individuals with normal color vision will see this number.");

//             paragraph.appendChild(text);
//             answer.appendChild(paragraph);

//             answer.style.display = "block";
//             input.style.display = "none";
//             return;
//           }
//         });
//       } else {
//         console.log(false);
//         answerBox.forEach((answer) => {
//           if (answer.classList.contains("box-4")) {
//             const paragraph = document.createElement("p");
//             const text = document.createTextNode("The number pictured above is actually 16. Most color blind people won't see this number clearly.");

//             paragraph.appendChild(text);
//             answer.appendChild(paragraph);

//             answer.style.display = "block";
//             answer.style.color = "red";
//             input.style.display = "none";
//             return;
//           }
//         });
//       }
//     }
//     return;
//   });
// };
