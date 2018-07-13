if ("registerProperty" in CSS) {
  CSS.registerProperty({
    name: "--size",
    syntax: "<length>",
    initialValue: "0px",
    inherits: false
  });
  CSS.registerProperty({
    name: "--interations-count",
    syntax: "<integer>",
    inherits: false
  });
  CSS.registerProperty({
    name: "--theme",
    syntax: "<color>+",
    initialValue: "#fff",
    inherits: true
  });
}
