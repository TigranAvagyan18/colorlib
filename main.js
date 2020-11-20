const ColorNames = require("./names");
class Color {
  static isColor(...color) {
    if (
      this.checkRGB(...color) ||
      this.checkHEX(...color) ||
      this.checkName(...color)
    )
      return true;
    else return false;
  }

  static checkRGB(...color) {
    if (Array.isArray(color[0])) {
      for (const number of color[0]) {
        if (number < 0 || number > 255) return false;
      }
      return true;
    } else if (color.length == 3) {
      for (const number of color) {
        if (number < 0 || number > 255) return false;
      }
      return true;
    } else {
      return false;
    }
  }

  static checkHEX(color) {
    if (typeof color === "string") {
      let hexPattern;
      if (color.startsWith("#"))
        hexPattern = /^#([A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?)$/;
      else hexPattern = /^([A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?)$/;
      let result = hexPattern.test(color);
      return result;
    } else return false;
  }

  static checkName(color) {
    for (const name of ColorNames) {
      if (color.toUpperCase() === name.toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  static random(type = "rgb") {
    if (type == "rgb") {
      return this.randomRGB();
    } else if (type == "hex") {
      return this.randomHEX();
    }
  }

  static randomRGB(full = true) {
    let rgb;
    const rand = (min, max) =>
      min + Math.floor(Math.random() * (max - min + 1));
    const r = rand(0, 255);
    const g = rand(0, 255);
    const b = rand(0, 255);
    full ? (rgb = `rgb(${r},${g},${b})`) : (rgb = `${r},${g},${b}`);
    return rgb;
  }

  static randomHEX(full = true) {
    let hex = ((Math.random() * 0xffffff) << 0).toString(16);
    full && (hex = "#" + hex);
    return hex;
  }

  static RGB2HEX(...color) {
    if (!this.checkRGB(...color)) return false;
    let r,g,b;
    if (Array.isArray(color[0])) {
      r = color[0][0];
      g = color[0][1];
      b = color[0][2];
    } else {
      r = color[0];
      g = color[1];
      b = color[2];
    }
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  static HEX2RGB(color) {
    if (!this.checkHEX(color)) return false;
    let [r, g, b] = [0, 0, 0];

    if (color.length == 4) {
      r = "0x" + color[1] + color[1];
      g = "0x" + color[2] + color[2];
      b = "0x" + color[3] + color[3];
    } else if (color.length == 7) {
      r = "0x" + color[1] + color[2];
      g = "0x" + color[3] + color[4];
      b = "0x" + color[5] + color[6];
    }
    return "rgb(" + +r + "," + +g + "," + +b + ")";
  }
  static isDark(color) {}
  static isLight(color) {}
}

module.exports = Color;
