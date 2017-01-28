const convertTextareaToHTML = require('../../app/lib/convertTextareaToHTML').convertTextareaToHTML;

describe('Convert textarea field value to HTML', () => {
  beforeAll(() => {
    this.returnAndNewLine = {
      original: 'foo\r\nbar',
      expected: '<p>foo<br>\r\nbar</p>',
    };
    this.newLineAndReturn = {
      original: 'foo\n\rbar',
      expected: '<p>foo<br>\n\rbar</p>',
    };
    this.newLineOnly = {
      original: 'foo\nbar',
      expected: '<p>foo<br>\nbar</p>',
    };
    this.returnOnly = {
      original: 'foo\rbar',
      expected: '<p>foo<br>\rbar</p>',
    };
    this.noLineBreaks = {
      original: 'foo bar',
      expected: '<p>foo bar</p>',
    };
  });

  it('converts \\r\\n to <br>\\r\\n', () => {
    expect(convertTextareaToHTML(this.returnAndNewLine.original))
      .toBe(this.returnAndNewLine.expected);
  });

  it('converts \\n\\r to <br>\\n\\r', () => {
    expect(convertTextareaToHTML(this.newLineAndReturn.original))
      .toBe(this.newLineAndReturn.expected);
  });

  it('converts \\n to <br>\\n', () => {
    expect(convertTextareaToHTML(this.newLineOnly.original))
      .toBe(this.newLineOnly.expected);
  });

  it('converts \\r to <br>\\r', () => {
    expect(convertTextareaToHTML(this.returnOnly.original))
      .toBe(this.returnOnly.expected);
  });

  it('converts a string without line breaks', () => {
    expect(convertTextareaToHTML(this.noLineBreaks.original))
      .toBe(this.noLineBreaks.expected);
  });
});
