var Waitlist = require('./models/waitlist');

module.exports = function(app, passport) {
  // PROFILE SECTION =========================
  // POST to CREATE
  app.post('/api/courses', function (req, res) {
    var course;
    console.log("POST: ");
    console.log(req.body);

    //laundry wash clean
    course = new Waitlist({
      provider: req.body.provider.name,
    });
    course.save(function (err) {
      if (!err) {
        return console.log("created");
      } else {
        return console.log(err);
      }
    });
    return res.send(course);
  });

  // PUT to UPDATE

  // Bulk update
  app.put('/api/courses', function (req, res) {
      var i, len = 0;
      console.log("is Array req.body.courses");
      console.log(Array.isArray(req.body.courses));
      console.log("PUT: (courses)");
      console.log(req.body.courses);
      if (Array.isArray(req.body.courses)) {
          len = req.body.courses.length;
      }
      for (i = 0; i < len; i++) {
          Waitlist.update({ "_id": id }, req.body.courses[i][id], function (err, numAffected) {
              if (err) {
                  console.log("Error on update");
                  console.log(err);
              } else {
                  console.log("updated num: " + numAffected);
              }
          });
      }
      return res.send(req.body.courses);
  });

  // Single update
  app.put('/api/courses/:id', function (req, res) {
    return Waitlist.findById(req.params.id, function (err, course) {
      course.title = req.body.title;
      course.description = req.body.description;
      course.price = req.body.price;
      produce.provider = req.body.user;
      return course.save(function (err) {
        if (!err) {
          console.log("updated");
        } else {
          console.log(err);
        }
        return res.send(course);
      });
    });
  });

  // GET to READ

  // List courses
  app.get('/api/courses', function (req, res) {
    return Waitlist.find(function (err, courses) {
      if (!err) {

        return res.send(courses);
      } else {
        return console.log(err);
      }
    });
  });

  // Single course
  app.get('/api/courses/:id', function (req, res) {
    return Waitlist.findById(req.params.id, function (err, course) {
      if (!err) {
        return res.send(course);
      } else {
        return console.log(err);
      }
    });
  });

  // DELETE to DESTROY

  // Bulk destroy all courses
  app.delete('/api/courses', function (req, res) {
    Waitlist.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });

  // remove a single course
  app.delete('/api/courses/:id', function (req, res) {
    return Waitlist.findById(req.params.id, function (err, course) {
      return course.remove(function (err) {
        if (!err) {
          console.log("removed");
          return res.send('');
        } else {
          console.log(err);
        }
      });
    });
  });

  //Subsciptions
  app.post('/api/courses/subscribe', function (req,res) {
   console.log(req.body);
   return Waitlist.findById(req.body.id, function (err, course) {
     //save the info
     console.log(course);
     if (course.subscribers.indexOf(req.body.user)>=0){
       res.send("already subscribed redirect");
     }
     course.subscribers.push(req.body.user);
     return course.save(function (err) {
       if (!err){
         console.log("subscribed");
         return res.send('success');
       }
       else {
         console.log(err);
         res.end('error');
       }
     });
   });
 });
};
