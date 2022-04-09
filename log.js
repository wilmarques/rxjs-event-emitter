export const log = (message) => {
  const resultElement = document.getElementById('result');
  const { innerText: currentText } = resultElement;
  const timestamp = new Date();
  resultElement.innerText = `\n${timestamp}:\n${message}\n${currentText}`;
  // resultElement.innerText = `${message}\n${currentText}`;
};
