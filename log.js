export const log = (message) => {
  const resultElement = document.getElementById('result');
  const { innerText } = resultElement;

  if (typeof message === 'string') {
    resultElement.innerText = `${message}\n${innerText}`;
  } else {
    resultElement.innerText = `${JSON.stringify(message)}\n${innerText}`;
  }

};