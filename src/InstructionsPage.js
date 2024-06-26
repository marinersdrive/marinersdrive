import React, { useState } from "react";
import Logo from "./assets/bg2.png";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";



function InstructionsPage() {

document.body.classList.add('instructions-page');  
  const navigate = useNavigate();
  const selectedCategory = localStorage.getItem("selectedCategory3");
  let ct = localStorage.getItem("selectedCategory4");

  if (selectedCategory === "Physics" || selectedCategory === "Chemistry" || selectedCategory === "Mathematics" || 
  selectedCategory === "General English" || selectedCategory === "General Aptitude" || selectedCategory === "General Knowledge"
  || selectedCategory === "PCM" || selectedCategory === "Final Mock"){
    ct = "IMU-CET"
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [indosNumber, setIndosNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isFieldsValid, setIsFieldsValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    validateFields(event.target.value, lastName, indosNumber, email);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    validateFields(firstName, event.target.value, indosNumber, email);
  };

  const handleIndosNumberChange = (event) => {
    setIndosNumber(event.target.value);
    validateFields(firstName, lastName, event.target.value, email);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateFields(firstName, lastName, indosNumber, newEmail, isAgreed);

    // Check email validity and update the state
    const isValid = validateEmail(newEmail);
    setIsEmailValid(isValid);
  };

  const validateEmail = (value) => {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleAgreementChange = (event) => {
    setIsAgreed(event.target.checked);
    validateFields(firstName, lastName, indosNumber, email, event.target.checked);
  };

  const validateFields = (first, last, indos, mail, agreed) => {
    setIsFieldsValid(first.trim() !== "" && last.trim() !== "" && indos.trim() !== "" && mail.trim() !== "" && agreed);
  };

  const handleProceed = async () => {
    if (isFieldsValid && isEmailValid) {
      try {
        // Show loading indicator
      setIsLoading(true);

      // Make a POST request to store user data
      // await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}api/storeUserData`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     firstName,
      //     lastName,
      //     email,
      //     indosNumber,
      //     selectedCategory
      //   }),
      // });
      // Wait for 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      // Navigate to the next page
      navigate("/testpage");
      } catch (error) {
        console.error('Error storing user data:', error);
        // Handle error, show an alert, etc.
      }finally {
        setIsLoading(false); // Set loading state back to false after the operation is complete
      }
    }
  };

  const handleMainCategory = (categoryName) =>{
    localStorage.setItem("selectedCategory4", categoryName);
  }

  const handleCategory = (categoryName) =>{
    localStorage.setItem("selectedCategory", categoryName);
  }

  const handleFirstName = (firstName) =>{
    localStorage.setItem("firstName", firstName);
  }

  const handleLastName = (lastName) =>{
    localStorage.setItem("lastName", lastName);
  }
  
  const handleIndosNumber = (indosNumber) =>{
    localStorage.setItem("indosNumber", indosNumber);
  }

  const handleEmail = (email) =>{
    localStorage.setItem("email", email);
  }

  const getDetailsByCategory = (selectedCategory) => {
    switch (selectedCategory) {
      case "PCM":
        // PCM
        return { questions: 90, minutes: 90, marks: 90 };
      case "Final Mock":
        // Final Mock
        return { questions: 200, minutes: 180, marks: 200 };
      case "Sponsorship Exam":
        return { questions: 70, minutes: 70, marks: 70 };
      default:
        // Default case for other categories
        return { questions: 30, minutes: 30, marks: 30 };
    }
  };
  
  const negativeMarking = (ct) => {
    switch (ct){
      case "IMU-CET":
        return {negative: '-0.25', indos: "Phone"};
      case "Sponsorship":
        return {negative: '-0.25', indos: "Phone"};
      default:
        return {negative: 'no', indos: "Indos"}
    }
  }
  console.log(process.env.REACT_APP_SERVER_BASE_URL)

  return (
    <div className="bg-gradient-to-t from-blue-900 to-slate-400 bg-cover bg-center sm:py-6 lg:pb-3 pb-2">
    <div className="flex flex-col justify-center bg-white sm:px-8 px-6 py-6  rounded-lg shadow-lg max-w-3xl mx-auto md:mt-20 lg:mt-0 lg:mb-0 font-montserrat">
      <div className="flex items-center justify-center mb-4">
        <img
          src={Logo}
          alt="Logo"
          className="w-28 h-28 sm:w-40 sm:h-40"
        />
      </div>
      
      <h2 className="text-xl sm:text-2xl font-semibold mt-4 text-blue-800 font-montserrat tracking-normal">Start Now!</h2>
      <p className="text-l sm:text-lg text-gray-600 mt-2 font-montserrat">{ct} - {selectedCategory} </p>
      <div className=" py-4 rounded-lg">
        <div className="border-0 border-light-gray bg-white flex-grow overflow-y-auto max-h-48 rounded-lg p-3 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ">
          <h3 className="text-l sm:text-xl font-semibold mb-2 text-blue-800 font-montserrat tracking-normal">Test Instructions:</h3>
          <ul className="list-disc text-sm sm:text-base pl-6 text-gray-600">
          <li>Read each question carefully.</li>
          <li>Answer all questions to the best of your knowledge.</li>
          <li>No. of questions: {getDetailsByCategory(selectedCategory).questions}</li>
          <li>Duration: {getDetailsByCategory(selectedCategory).minutes} minutes</li>
          <li>Pass marks: {(getDetailsByCategory(selectedCategory).marks)/2}</li>
          <li>Each question carries equal marks.</li>
          <li>There is {negativeMarking(ct).negative} negative marking for incorrect answers.</li>
          <li>You cannot go back to a previous question.</li>
          <li>Please ensure a stable internet connection before starting the test.</li>
          <li>Close any unnecessary tabs or programs to optimize performance.</li>
          <li>Pay close attention to units used in questions and answers.</li>
          <li>Cheating and plagiarism are strictly prohibited.</li>
          <li>Double-check your answers before submitting. Once submitted, the exam cannot be restarted.</li>
          <li>Keep the browser window focused. Do not switch to other tabs or applications during the exam.</li>
          <li>You will receive immediate feedback on your performance.</li>
            {/* Add more instructions */}
          </ul>
        </div>
        <div className="mt-6">
          <label htmlFor="firstName" className="block mt-2 mb-2 text-blue-900 font-semibold text-sm sm:text-base">
            Enter your First Name: <span className="text-red">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            className="w-full p-1.5 sm:p-2 border border-gray-600 rounded-md text-sm sm:text-base"
            value={firstName}
            onChange={handleFirstNameChange}
          />

          <label htmlFor="lastName" className="block mt-3 text-blue-900 font-semibold text-sm sm:text-base">
            Enter your Last Name: <span className="text-red">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="w-full p-1.5 sm:p-2 border border-gray-600 rounded-md text-sm sm:text-base mt-2"
            value={lastName}
            onChange={handleLastNameChange}
          />

          <label htmlFor="email" className="block mt-3 text-blue-900 font-semibold text-sm sm:text-base">
            Enter your Email Id: <span className="text-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full p-1.5 sm:p-2 border  border-gray-600 rounded-md text-sm sm:text-base mt-2"
            value={email}
            onChange={handleEmailChange}
          />
          {/* Show an error message if email is invalid */}
          {!isEmailValid && (
            <p className="text-red text-sm mt-1 font-medium">Please enter a valid email address!</p>
          )}
          <label htmlFor="indosNumber" className="block mt-3 text-blue-900 font-semibold text-sm sm:text-base">
            Enter your {negativeMarking(ct).indos} Number: <span className="text-red">*</span>
          </label>
          <input
            type="text"
            id="indosNumber"
            placeholder="Indos Number"
            className="w-full p-1.5 sm:p-2 border  border-gray-600 rounded-md text-sm sm:text-base mt-2"
            value={indosNumber}
            onChange={handleIndosNumberChange}
          />

        <div className="flex items-center mt-3">
        <input
            type="checkbox"
            id="agreement"
            className={`mr-1 h-2.5 w-3 ${
            isEmailValid ? "" : "opacity-50 cursor-not-allowed"
            }`}
            checked={isAgreed}
            onChange={handleAgreementChange}
            disabled={!isEmailValid}
        />
        <label htmlFor="agreement" className="text-gray-600 text-xs">
            I have read and agree to the instructions.
        </label>
        </div>
          

          <div className="flex items-center justify-between mt-6">
            <button
              className={`bg-blue-900 border-b-4 text-white px-4 py-2 rounded hover:bg-tp-darkest-blue font-semibold w-full ${
                isFieldsValid && isEmailValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                handleProceed();
                handleMainCategory(ct);
                handleCategory(selectedCategory);
                handleFirstName(firstName);
                handleLastName(lastName);
                handleIndosNumber(indosNumber);
                handleEmail(email);
              }}
              disabled={!isFieldsValid}
            >
               {isLoading ? (
          <span className="flex justify-center items-center opacity-50 cursor-not-allowed">
            <ThreeDots
              color="#F6F6F6"
              height={20}
              width={20}
              visible={isLoading}
            />
          </span>
        ) : (
          "Proceed"
        )}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center lg:mt-3 mt-2">
        <FaChevronLeft className="text-gray-300 sm:mt-0 tracking-wide p-0.5 sm:p-0" />
        <Link to="/" className="text-gray-300 text-center ml-2 border-b-2 sm:text-base text-xs transition duration-300 ease-in-out transform hover:scale-105 relative">Back to Home</Link>
      </div>
    </div>
  );
}

export default InstructionsPage;
