const getSumOfDigits = (number) => {
    let sum = 0;
    const numberString = Math.abs(number).toString();
  
    for (let i = 0; i < numberString.length; i++) {
      sum += parseInt(numberString.charAt(i));
    }
  
    if (sum > 9) {
      return getSumOfDigits(sum); // Recursively call the function with the new sum
    }
  
    return sum;
  }


  export default getSumOfDigits