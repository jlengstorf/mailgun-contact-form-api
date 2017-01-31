const convertTextareaToHTML = require('../../app/lib/convertTextareaToHTML').convertTextareaToHTML;

describe('Convert textarea field value to HTML', () => {
  it('converts \\r\\n to <br>\\r\\n', () => {
    expect(convertTextareaToHTML('foo\r\nbar')).toBe('<p>foo<br>\r\nbar</p>');
  });

  it('converts \\n\\r to <br>\\n\\r', () => {
    expect(convertTextareaToHTML('foo\n\rbar')).toBe('<p>foo<br>\n\rbar</p>');
  });

  it('converts \\n to <br>\\n', () => {
    expect(convertTextareaToHTML('foo\nbar')).toBe('<p>foo<br>\nbar</p>');
  });

  it('converts \\r to <br>\\r', () => {
    expect(convertTextareaToHTML('foo\rbar')).toBe('<p>foo<br>\rbar</p>');
  });

  it('converts a string without line breaks', () => {
    expect(convertTextareaToHTML('foo bar')).toBe('<p>foo bar</p>');
  });
});
