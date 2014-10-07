var ImagesStore = new FS.Store.FileSystem('images-original');

Images = new FS.Collection('images', {
  stores: [ImagesStore],
  filter: {
    allow: {
      contentTypes: ['image/jpeg']
    }
  }
});

Meteor.subscribe('images');



// dropZone
Template.dropZone.events({
  'change .fileUploader': function(event, temp) {
    FS.Utility.eachFile(event, function(file) {
      var fileObj = new FS.File(file);
      Images.insert(fileObj);
    });
  }
});


// fileTable
Template.fileTable.files = function() {
  return Images.find({},{ sort: { uploadedAt:-1 } });
};

Template.fileTable.events({
  'click .remove': function(e,t){
    e.stopPropagation();
    e.preventDefault();
    if (confirm('Really Remove?')) {
      Images.remove(this._id);
    }
  }
})


