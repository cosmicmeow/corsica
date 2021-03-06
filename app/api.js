var Waitlist = require('./models/waitlist');
var User = require('./models/user');
var _ = require('lodash');
var bcrypt   = require('bcrypt-nodejs');
var util   = require('./util');
var myData = require('./test');

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

	// PROFILE SECTION =========================
  // POST to CREATE
  app.post('/api/makeauser', function (req, res) {
	var user;
	console.log(req.body);
	//laundry wash clean
	user = new User({"local":{
	  password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
	  email: req.body.email,
	  firstName : req.body.firstName,
	  lastName : req.body.lastName,
	  phoneNumber : req.body.phoneNumber,
	  textPreference : req.body.textPreference,
	  access: req.body.access
	}});
	user.save(function (err) {
	  if (!err) {
		return console.log("created");
	  } else {
		return console.log(err);
	  }
	});
	return res.redirect("/client");
  });

  // Single update
  app.put('/api/waitlists/:id', function (req, res) {
	//{"crn":req.params.crn}
	return Waitlist.findByIdAndUpdate(req.params.id, req.body, function (err, product) {
	  //run over the properties

	  ///product.description = req.body.description;
		if (!err) {
		  console.log("Updated:", req.body);
		} else {
		  console.log(err);
		}
		return res.send(product);
	  });
  });


  // Single update
app.post('/api/waitlists/reorder', function (req, res) {
  //{"crn":req.params.crn}
  console.log(req.body.subscribers);
  console.log(req.body);
  // if (req.body.subscribers !== null){
  //   req.body.subscribers = JSON.parse(req.body.subscribers);
  // }
  console.log(req.body.subscribers);
  return Waitlist.findOne({"crn":req.body.crn}, function (err, course) {
    //run over the properties
    //
    console.log(course);
    console.log(err);
    var subscribers = course.subscribers;

      var order = req.body.subscribers;
      var reorderedSubscribers = [];

      _.each(order, function (elm){
        _.find(subscribers, function(sub){
           if (sub.email === elm){
             //console.log(sub);
             reorderedSubscribers.push(sub);
             return;
           }
        });
      });

    course.subscribers = reorderedSubscribers;
    ///product.description = req.body.description;
    return course.save(function (err, data) {
      if (!err){

      console.log("updated object");
      return res.send(data);
      }
      else {
      console.log(err);
      res.end('error');
      }
    });
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
	 //want to check if subscribed
	 var check = _.pluck(course.subscribers, "email");
	 console.log(check);
	 if (check.indexOf(req.body.user.email)>=0){
	   console.log("already subscribed");
	   res.send("already subscribed redirect");
	 }

	 course.subscribers.push(req.body.user);
	 return course.save(function (err, data) {
	   if (!err){
		 User.update({"local.email": req.body.user.email},{$addToSet: {"local.subscribed": course.crn }}, function (err, user) {
		   console.log(user," user records were found and updated");
		 });
		 console.log("subscribed");
		 return res.send(data);
	   }
	   else {
		 console.log(err);
		 res.end('error');
	   }
	 });
   });
 });


/** Special Endpoints **/

 //Subsciptions
 app.post('/api/waitlists/unsubscribe', function (req,res) {
  console.log(req.body);
  return Waitlist.findOne({"crn":req.body.crn}, function (err, course) {
	//save the info
	console.log(course);
	var check = _.pluck(course.subscribers, "email");
	if (check.indexOf(req.body.email)<0){
	  res.send("you're already unsubscribed ");
	}

	course.subscribers =  _.remove(course.subscribers, function (elm) {
	  if (elm.email !== req.body.user.email){
		return elm;
	  }
	});
	return course.save(function (err, data) {
	  if (!err){
		console.log("removed");
		User.update({"local.email": req.body.user.email},{$pull: {"local.subscribed": course.crn }}, function (err, user) {
		  console.log(user," user records were found and updated");
		});
		return res.send(data);
	  }
	  else {
		console.log(err);
		res.end('error removing');
	  }
	});
  });
});

  //Subsciptions
  app.post('/api/waitlists/adminUnsubscribe', function (req,res) {
	console.log(req.body);
	return Waitlist.findOne({"crn":req.body.crn}, function (err, course) {
		//save the info
		console.log(course);
		var check = _.pluck(course.subscribers, "email");
		if (check.indexOf(req.body.email)<0){
		  res.send("you're already unsubscribed ");
		}

		course.subscribers =  _.remove(course.subscribers, function (elm) {
			if (elm.email !== req.body.email){
			return elm;
			}
		});

		return course.save(function (err, data) {
			if (!err){
				console.log("removed");
				User.update({"local.email": req.body.email},{$pull: {"local.subscribed": course.crn }}, function (err, user) {
				console.log(user," user records were found and updated");
				});
				return res.send(data);
			}
			else {
				console.log(err);
				res.end('error removing');
			}
		});
	});
  });
  // Lock
  app.get('/api/waitlists/all', function (req, res) {
    return Waitlist.find(function (err, waitlists) {
      if (!err) {

        return res.send(waitlists);
      } else {
        return console.log(err);
      }
    });
  });

  // List waitlists
  app.post('/api/waitlists/lock', function (req, res) {
    return Waitlist.find({},function (err, waitlists) {
        	console.log(waitlists);
      if (!err) {
        _.each(waitlists, function (elm) {
        	console.log(elm);
	        elm.locked = true;
	        elm.save();
        });

        return res.send(waitlists);
      } else {
        return console.log(err);
      }
    });
  });

  // Unlock
  app.post('/api/waitlists/unlock', function (req, res) {
    return Waitlist.find({},function (err, waitlists) {
      console.log("here");
      if (!err) {
        _.each(waitlists, function (elm) {
          elm.locked = false;
          elm.save();
        });

        return res.send(waitlists);
      } else {
        return console.log(err);
      }
    });
  });

  // Unlock
  app.post('/api/waitlists/testharness', function (req, res) {
    console.log(req.body);
     Waitlist.find({"crn": req.body.crn },function (err, waitlist) {
      console.log("Notification Sent");
      if (!err) {

        return res.send(util.notify(myData));
      } else {
        return res.send(err);
      }
    });
  });

  // Unlock
  app.post('/api/waitlists/testhorseness', function (req, res) {
    console.log(req.body);
    util.notify(data);
    return res.send(true);
  });



  // Single course
  //return a view
  app.get('/confirm/:id', function (req, res) {
    return Waitlist.findById(req.params.id, function (err, course) {
      if (!err) {
        var email = course.subscribers[0].email;
        var email_dehash = util.decrypt(req.query.u);
        console.log(email_dehash);
        console.log(email);
        if ( email_dehash === email){
          console.log("right");
          //SEND AN EMAIL BRUNELLE
          util.claim(course);
          return res.render('confirm.ejs', {
            res : "Thanks the advisor has been notified " + course.subscribers[0].firstName
          });
        }
        else {
          console.log("wrong");
          //SAY SORRY
          return res.render('confirm.ejs', {
            res : "sorry the link has expired or the course is no longer avaliable"
          });
        }
      } else {
        console.log(err);
        return res.render('confirm.ejs', {
          res : "sorry the link has expired or the course is no longer avaliable"
        });
      }
    });
  });

};
