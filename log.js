export const log = (message) => {
  const resultElement = document.getElementById('result');
  const { innerText: currentText } = resultElement;
  const timestamp = new Date();
  resultElement.innerText = `${timestamp} - ${message}\n${currentText}`;
};