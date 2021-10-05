/** @format */

const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit");
const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");

const { monthNames } = require("../lib/data");

const pdf_generate = async (
  full_name = "Lead Name",
  university_name = "Some University",
  gender = "they",
  app_mnth = "May 3",
  app_year = "1651",
  with_sign = false
) => {
  const file_path = path.resolve(__dirname, "../output.pdf");

  try {
    fs.unlinkSync(file_path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      //file removed
    });
  } catch (err) {}

  const date = new Date();

  const date_time = `${date.getDate()} ${
    monthNames[date.getMonth()]
  }, ${date.getFullYear()}`;

  const pr_map = {
    he: "his",
    she: "her",
    they: "their",
  };

  const pronoun = pr_map[gender];

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const cap_first_let = (string) => {
    const temp = string.split("");
    temp[0] = string[0].toUpperCase();
    return temp.join("");
  };

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const size_normal = 12;
  const max_width = 400;
  const first_name = full_name.split(" ")[0];
  const line_height = 20;

  const text_width = (text, size = size_normal) =>
    timesRomanFont.widthOfTextAtSize(text, size);

  const flag_url = "https://assets.hackclub.com/flag-standalone.png";

  const flag_img_bytes = await fetch(flag_url).then((res) => res.arrayBuffer());

  const flag_img = await pdfDoc.embedPng(flag_img_bytes);
  const flag_dim = flag_img.scale(0.25);

  const sign_img_file = fs.readFileSync(path.resolve(__dirname, "../sign.png"));

  const sign_img_bytes = await sign_img_file.buffer;

  const sign_img = await pdfDoc.embedPng(sign_img_bytes);
  const sign_dim = flag_img.scale(0.2);

  // Add a page to the PDFDocument and draw some text
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  let curr_pos_state = height;

  const curr_height = (val) => {
    curr_pos_state -= val;
    return curr_pos_state;
  };

  page.drawImage(flag_img, {
    x: width / 2 - flag_dim.width / 2,
    y: curr_height(100),
    width: flag_dim.width,
    height: flag_dim.height,
  });

  page.drawText(date_time, {
    x: width / 2 - text_width(date_time) / 2,
    y: curr_height(25),
    font: timesRomanFont,
    size: size_normal,
  });

  const text_0 = "To Whom It May Concern,";

  page.drawText(text_0, {
    x: 100,
    y: curr_height(60),
    font: timesRomanFont,
    size: size_normal,
    lineHeight: line_height,
  });

  const text_1 = `This letter is to confirm that ${full_name} is a registered Hack Club leader at the ${university_name}.`;

  page.drawText(text_1, {
    x: 100,
    y: curr_height(30),
    font: timesRomanFont,
    size: size_normal,
    maxWidth: max_width,
    lineHeight: line_height,
  });

  const text_2 = `Hack Club is a global nonprofit organization building a network of high school makers and student-led coding clubs.`;

  const text_2_1 = `We were founded in 2014 with the goal of bringing computer science education to every school with a by- the-students, for-the-students model. Hundreds of potential club leaders apply to Hack Club each year.`;

  page.drawText(text_2 + " " + text_2_1, {
    x: 100,
    y: curr_height(30),
    font: timesRomanFont,
    size: size_normal,
    maxWidth: max_width,
    lineHeight: line_height,
  });

  const text_4 = `${first_name} applied to Hack Club in ${app_mnth} ${app_year}, and ${pronoun} application demonstrated excellent vision and leadership to begin a Hack Club. ${cap_first_let(
    gender
  )} has continued leading the club as part of the Hack Club network since.`;

  page.drawText(text_4, {
    x: 100,
    y: curr_height(110),
    font: timesRomanFont,
    size: size_normal,
    maxWidth: max_width,
    lineHeight: line_height,
  });

  const text_5 = `Hack Club will support the sustainability and continuity of ${first_name}’s club by providing direct support to ${
    gender == "he" ? "him" : gender == "they" ? "them" : "her"
  } while ${gender} leads the club, as well as helping transition the club leadership once ${gender} graduates.`;

  page.drawText(text_5, {
    x: 100,
    y: curr_height(70),
    font: timesRomanFont,
    size: size_normal,
    maxWidth: max_width,
    lineHeight: line_height,
  });

  const text_6 =
    "For any questions, you can reach me at the contact information below.";

  page.drawText(text_6, {
    x: 100,
    y: curr_height(70),
    font: timesRomanFont,
    size: size_normal,
    maxWidth: max_width,
    lineHeight: line_height,
  });

  with_sign
    ? page.drawImage(sign_img, {
        x: 100,
        y: curr_height(80),
        width: flag_dim.width,
        height: flag_dim.height,
      })
    : null;

  const sign_name = "Athul Blesson";

  page.drawText(sign_name, {
    x: 100,
    y: curr_height(with_sign ? 20 : 80),
    font: timesRomanFont,
    size: size_normal,
    maxWidth: max_width,
    lineHeight: line_height,
  });

  const sign_desig = "Asia Pacific Director, Hack Club";

  page.drawText(sign_desig, {
    x: 100,
    y: curr_height(20),
    font: timesRomanFont,
    size: size_normal,
    maxWidth: max_width,
    lineHeight: line_height,
  });

  const sign_email = "athul@hackclub.com";

  page.drawText(sign_email, {
    x: 100,
    y: curr_height(20),
    font: timesRomanFont,
    size: size_normal,
    maxWidth: max_width,
    lineHeight: line_height,
  });

  // Save the PDFDocument and write it to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(file_path, pdfBytes);
};

module.exports = pdf_generate;
