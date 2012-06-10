//------------------------------------------------------------------------------
// Installing Web Apps
//------------------------------------------------------------------------------

var d = document.querySelector("#install-status");
var onGotObject = function(obj) {

};

var getAbsPath = function(relPath) {
  var s = location.href.split('/');
  if (s.length > 0) {
    s[s.length-1] = relPath;
    return s.join('/');
  }
};

var installApp = function() {
  var req = navigator.mozApps.getSelf();
  req.onsuccess = function(e) {
    if (req.result) {
      // It is installed.
      onGotObject(req.result);
    } else {
      // Haven't yet installed, install it.
      console.log("Path: " + getAbsPath("manifest.webapp"));
      var r = navigator.mozApps.install(getAbsPath("manifest.webapp"));
      r.onsuccess = function() {
        d.innerHTML = "Installed Successfully";
        onGotObject(req.result);
      };
      r.onerror = function() {
        d.innerHTML = "Error: " + this.error.name;
      }
    }
  };
  req.onerror = function() {
    d.innerHTML = "Error: " + this.error.message;
  };
};

//------------------------------------------------------------------------------
// CSS class utilities
//------------------------------------------------------------------------------

var addCssClass = function(domObj, classToAdd) {
  var cn = domObj.className;
  var carr = cn.split(' ');
  for (var i = 0; i < carr.length; i++) {
    if (carr[i] === classToAdd) {
      return;
    }
  }
  carr.push(classToAdd);
  domObj.className = carr.join(" ");
};

var removeCssClass = function(domObj, classToRemove) {
  var cn = domObj.className;
  var carr = cn.split(' ');
  var carrNew = [];
  for (var i = 0; i < carr.length; i++) {
    if (carr[i] !== classToRemove && carr[i] !== '') {
      carrNew.push(carr[i]);
    }
  }
  domObj.className = carrNew.join(" ");
}

//------------------------------------------------------------------------------
// Panel open/close/switch utilities
//------------------------------------------------------------------------------

var openPanel = function(panel) {
  removeCssClass(panel, 'panel-closed');
  addCssClass(panel, 'panel-opened');
  panel.setAttribute('isopened', 'true');
}

var closePanel = function(panel) {
  removeCssClass(panel, 'panel-opened');
  addCssClass(panel, 'panel-closed');
  panel.setAttribute('isopened', 'false');
}

var switchPanel = function(panel) {
  if (panel.getAttribute('isopened') === 'true') {
    closePanel(panel);
  } else {
    openPanel(panel);
  }
}

//------------------------------------------------------------------------------
// Event handlers
//------------------------------------------------------------------------------

var switchToAddItemPanel = function(e) {
  e.preventDefault();
  switchPanel(document.querySelector("#add-item-panel"));
};

//------------------------------------------------------------------------------

var initializeEvent = function() {
  document.querySelector("#switch-to-add-item-panel").
    addEventListener('click', switchToAddItemPanel);
};

var init = function() {
  installApp();
  initializeEvent();
};
