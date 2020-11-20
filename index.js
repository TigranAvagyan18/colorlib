const ColorNames = require("./names");
class Color {
  static isColor(...color) {
    if (this.checkRGB(...color) || this.checkHEX(...color) || this.checkName(...color))
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
    if (color === "string") {
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
  
  static RGB2HEX() {}
  static RGBA2HEXA() {}
  static HEX2RGB() {}
  static HEXA2RGBA() {}
  static isDark(color) {}
  static isLight(color) {}
}

module.exports = Color;
