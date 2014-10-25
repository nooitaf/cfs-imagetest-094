//__ Debug
//FS.debug = true;

//__ FileStore
// ---> cfs:filesystem 
// var ImagesStore = new FS.Store.FileSystem('images-original');

// ---> cfs:gridfs 
var ImagesStore = new FS.Store.GridFS('images-original');

//__ FileCollection
Images = new FS.Collection('images', {
  stores: [ImagesStore],
  filter: {
    maxSize: 1048576 * 4, //in bytes
    allow: {
      contentTypes: ['image/jpeg'],
      extensions: ['jpg']
    }
  }
});

Images.allow({
  insert: function(userId, fileObj) {
    return true;
  },
  update: function(userId, fileObj) {
    return true;
  },
  remove: function(userId, fileObj) {
    return true;
  },
  download: function(userId, fileObj /*, shareId*/) {
    return true;
  },
  fetch: []
});

Meteor.publish('images', function() {
  return Images.find({}, { limit: 0 });
});

