/**
 * Converts textarea input to HTML, including changing newlines to `<br>` tags.
 * @param  {string} str the string to be converted
 * @return {string}     the converted string HTML
 */
function convertTextareaToHTML(str) {
  const newLineRegex = new RegExp(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g);
  const withBreakTags = `${str}`.replace(newLineRegex, '$1<br>$2');
  return `<p>${withBreakTags}</p>`;
}

module.exports = {
  convertTextareaToHTML,
};
