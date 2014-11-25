var Waitlist = require('./models/waitlist');

module.exports = function(app, passport) {
  // PROFILE SECTION =========================
  // POST to CREATE
  app.post('/api/waitlists', function (req, res) {
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
  app.put('/api/waitlists', function (req, res) {
      var i, len = 0;
      console.log("is Array req.body.waitlists");
      console.log(Array.isArray(req.body.waitlists));
      console.log("PUT: (waitlists)");
      console.log(req.body.waitlists);
      if (Array.isArray(req.body.waitlists)) {
          len = req.body.waitlists.length;
      }
      for (i = 0; i < len; i++) {
          Waitlist.update({ "_id": id }, req.body.waitlists[i][id], function (err, numAffected) {
              if (err) {
                  console.log("Error on update");
                  console.log(err);
              } else {
                  console.log("updated num: " + numAffected);
              }
          });
      }
      return res.send(req.body.waitlists);
  });
  // Single update

  // Single update
  app.put('/api/waitlists/:id', function (req, res) {
    //{"crn":req.params.crn}
    return Waitlist.findByIdAndUpdate(req.params.id, req.body, function (err, product) {
      //run over the properties

      ///product.description = req.body.description;
        if (!err) {
          console.log("updated");
        } else {
          console.log(err);
        }
        return res.send(product);
      });
  });

  // Single update
  app.put('/api/waitlists/subscribe/:crn', function (req, res) {
    console.log(req.body);
    return Waitlist.find({"crn":req.params.crn}, function (err, data) {
      if (!err) {
        console.log("updated");
        return Waitlist.update({"crn":req.params.crn}, {$set:{"subscribers": JSON.parse(req.body.subscribers)}},  function (err) {
          if (!err) {
            console.log("updated");
          } else {
            console.log(err);
          }
          return res.send("updated");
        });
      } else {
        console.log(err);
        return res.send(err);
      }
      //waitlist.subscribers = req.body.subscribers;
    });
  });

  // GET to READ

  // List waitlists
  app.get('/api/waitlists', function (req, res) {
    return Waitlist.find({"status":"shut"}, function (err, waitlists) {
      if (!err) {

        return res.send(waitlists);
      } else {
        return console.log(err);
      }
    });
  });

  // Single course
  app.get('/api/waitlists/:id', function (req, res) {
    return Waitlist.findById(req.params.id, function (err, course) {
      if (!err) {
        return res.send(course);
      } else {
        return console.log(err);
      }
    });
  });

  // DELETE to DESTROY

  // Bulk destroy all waitlists
  app.delete('/api/waitlists', function (req, res) {
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
  app.delete('/api/waitlists/:id', function (req, res) {
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
  app.post('/api/waitlists/subscribe', function (req,res) {
   console.log(req.body);
   return Waitlist.findOne({"crn":req.body.crn}, function (err, course) {
     //save the info
     console.log(course);
     if (course.subscribers.indexOf(req.body.email)>=0){
       res.send("already subscribed redirect");
     }
     course.subscribers.push(req.body.email);
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

 //Subsciptions
 app.post('/api/waitlists/unsubscribe', function (req,res) {
  console.log(req.body);
  return Waitlist.findOne({"crn":req.body.crn}, function (err, course) {
    //save the info
    console.log(course);
    if (course.subscribers.indexOf(req.body.email)<0){
      res.send("you're already unsubscribed ");
    }
    course.subscribers.splice(req.body.email,1);
    return course.save(function (err) {
      if (!err){
        console.log("removed");
        return res.send('success removed');
      }
      else {
        console.log(err);
        res.end('error removing');
      }
    });
  });
});
};
