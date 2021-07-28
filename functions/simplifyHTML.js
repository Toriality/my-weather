function simplifyHTML(originalStr) {
  // Full HTML after function
  let html = "";

  // Current read/write situation
  let state = {
    readOnly: true,
  };
  // String of current HTML tag being analyzed
  let tagString = "";

  // Allowed HTML Tags
  let allowedTags = [
    "div",
    "body",
    "p ",
    "p>",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "b>",
    "i>",
    "a ",
    "article",
    //"button",
    "caption",
    "col",
    "colgroup",
    //"form",
    "img",
    //"label",
    //"li",
    "menu",
    "ol",
    "option",
    "pre",
    "section",
    "small",
    "span",
    "strong",
    "table",
    "tbody",
    "td",
    //"textarea",
    "tfoot",
    "th",
    "thead",
    "tr",
    //"u>",
    "ul",
    "wbr",
    //"input",
  ];

  for (num = 0; num < originalStr.length; num++) {
    let currentStr = originalStr[num];
    let tagCurrentStr = "";

    // If the program encounter an opening tag, enable read-only mode to analyze the tag
    if (currentStr === "<") {
      //console.log("Program reached a opening tag. Enabling read-only mode");
      state.readOnly = true;
      // Check what is the tag type
      for (tagCheck = num; tagCurrentStr !== ">"; tagCheck++) {
        tagCurrentStr = originalStr[tagCheck];
        tagString += tagCurrentStr;
        // If the program encounter a allowed tag, turn on writing mode
        for (i = 0; i < allowedTags.length; i++) {
          let allowedOpeningTag = `<${allowedTags[i]}`;
          let allowedClsoingTag = `</${allowedTags[i]}`;
          if (
            tagString.includes(allowedOpeningTag) ||
            tagString.includes(allowedClsoingTag)
          ) {
            state.readOnly = false;
          }
          currentStr = "<";
        }
      }
    }
    tagString = "";
    if (state.readOnly === false) {
      html += currentStr;
    }
  }
  return html;
}

module.exports = simplifyHTML;
