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

  // Single update
  app.put('/api/waitlists/:id', function (req, res) {
    //{"crn":req.params.crn}
    if (req.body.subscribers !== null){
      req.body.subscribers = JSON.parse(req.body.subscribers);
    }
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
