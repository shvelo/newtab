chrome.storage.sync.set({'value': "10"}, function() {
          // Notify that we saved.
          alert('Settings saved');
        });

    chrome.storage.sync.get("value", function(data) {
      console.log(data);
    });