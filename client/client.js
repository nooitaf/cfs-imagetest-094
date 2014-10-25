//__ FileStore

// ---> cfs:filesystem 
//var ImagesStore = new FS.Store.FileSystem('images-original');

// ---> cfs:gridfs 
var ImagesStore = new FS.Store.GridFS('images-original');


//__ FileCollection

Images = new FS.Collection('images', {
  stores: [ImagesStore],
  filter: {
    allow: {
      contentTypes: ['image/jpeg']
    }
  }
});

Meteor.subscribe('images');


//__ Dropzone

Template.dropZone.events({
  'change .fileUploader': function(event, temp) {
    FS.Utility.eachFile(event, function(file) {
      var fileObj = new FS.File(file);
      Images.insert(fileObj);
    });
  }
});


//__ Filetable

Template.fileTable.helpers({
  files : function() {
    return Images.find({},{ sort: { uploadedAt:-1 } });
  }
});

Template.fileTable.events({
  'click .remove': function(e,t){
    e.stopPropagation();
    e.preventDefault();
    if (confirm('Really Remove?')) {
      Images.remove(this._id);
    }
  }
})


