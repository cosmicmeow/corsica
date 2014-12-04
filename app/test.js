var data = {
  "__v" : 1,
  "_id" : "547a818e2cc1b000001767b3",
  "availableSeats" : "0",
  "capacity" : "cap:70; enroll:70;avail:0",
  "courseNum" : "CS121G",
  "crn" : "13418",
  "days" : "MW",
  "description" : "Introduction to Information Literacy and Research for Scientists",
  "i_user" : "",
  "instructor" : "SYMPSON, W",
  "lastModified" : "2014-11-30T02:31:42.392Z",
  "listing" : {
    "title" : "Introduction to Information Literacy and Research for Scientists",
    "hours" : "3 Credits",
    "description" : "\nLecture 3 hours; 3 credits.  Students will learn to locate, manage, critically evaluate and use information for scientific problem solving and research.  Includes mathematical tools for data analysis and presentation and office and collaborative tools, as well.  Information security, laws and etiquette related to use and access of information are covered.\n",
    "code" : "CS121G"
  },
  "location" : "DIEHN  1103",
  "locked" : true,
  "note" : " LECTURE. STUDENT MUST ALSO REGISTER FOR A RECITATION SECTION ",
  "notified" : ("2014-11-30T02:31:42.392Z"),
  "prop" : "q",
  "status" : "shut",
  "subscribers" : [
  {
    "access" : "student",
    "email" : "szhen002@gmail.com",
    "password" : "$2a$08$EJ3fUujD71mCDh09EtoUkOb1bhi9zne9/2gZxqVh2ON6cZkF.9zYy",
    "firstName" : "c",
    "lastName" : "c",
    "phoneNumber" : "c"
  }
  ],
  "times" : "1745-1900",
  "unknown1" : "0",
  "unknown2" : "X",
  "unknown3" : "",
  "unknown4" : "dupeven",
  "unknown5" : "A",
  "unknown6" : "N"
};
var util = require("./util");

util.notify(data);