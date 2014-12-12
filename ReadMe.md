Corsica
----


install
```
git clone
npm install
npm install -g nodemon
mongod &  nodemon server.js
```

API Docs
---
Uses standard rest conventions prefixed by api.

routes utilized

```
#return all the documents
GET /api/waitlists

#return the specific document if exists
GET /api/waitlists/:id

#update the document including
    - whether courses can be subscribed waitlist.locked
    - the ordering of subscribers
PUT /api/waitlists/:id

#add a user's email  subscription to notifications
POST /api/waitlists/subscribe

#unsubscribe a user from subscription notification by posting their email
POST /api/waitlists/unsubscribe

```

Model
---
Waitlist
``` javascript
var waitlistSchema = mongoose.Schema({
  status: {type: String},
  capacity: {type: String},
  availableSeats: {type: String},
  prop: {type: String},
  courseNum: {type: String},
  crn: {type: String, unique: true},
  note: {type: String},
  description: {type: String},
  times: {type: String},
  days: {type: String},
  location: {type: String},
  instructor: {type: String},
  i_user: {type: String},
  unknown1: {type: String},
  unknown2: {type: String},
  unknown3: {type: String},
  unknown4: {type: String},
  unknown5: {type: String},
  unknown6: {type: String},
  locked: {type: Boolean, default: false},
  listing:  {type: mongoose.Schema.Types.Mixed},
  subscribers: {type: Array, default: Array}, //, unique: true?
  lastModified: { type: Date, default: Date.now },
  notified: { type: Date, default: Date.now }
});
```


LICENSE
---
MIT
