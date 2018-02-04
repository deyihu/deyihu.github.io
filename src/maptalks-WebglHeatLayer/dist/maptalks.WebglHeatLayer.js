/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "4011ff3e45f39843544b"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}

				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					window.location.reload();
					return;
				}

				if(!upToDate()) {
					check();
				}

				__webpack_require__(2)(updatedModules, updatedModules);

				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}

			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});

		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}

		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(4);

	__webpack_require__(5);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	// Generated by CoffeeScript 1.3.3
	(function () {
	  var Framebuffer,
	      Heights,
	      Node,
	      Shader,
	      Texture,
	      WebGLHeatmap,
	      fragmentShaderBlit,
	      nukeVendorPrefix,
	      textureFloatShims,
	      vertexShaderBlit,
	      __indexOf = [].indexOf || function (item) {
	    for (var i = 0, l = this.length; i < l; i++) {
	      if (i in this && this[i] === item) return i;
	    }return -1;
	  };

	  nukeVendorPrefix = function nukeVendorPrefix() {
	    var getExtension, getSupportedExtensions, vendorRe, vendors;
	    if (window.WebGLRenderingContext != null) {
	      vendors = ['WEBKIT', 'MOZ', 'MS', 'O'];
	      vendorRe = /^WEBKIT_(.*)|MOZ_(.*)|MS_(.*)|O_(.*)/;
	      getExtension = WebGLRenderingContext.prototype.getExtension;
	      WebGLRenderingContext.prototype.getExtension = function (name) {
	        var extobj, match, vendor, _i, _len;
	        match = name.match(vendorRe);
	        if (match !== null) {
	          name = match[1];
	        }
	        extobj = getExtension.call(this, name);
	        if (extobj === null) {
	          for (_i = 0, _len = vendors.length; _i < _len; _i++) {
	            vendor = vendors[_i];
	            extobj = getExtension.call(this, vendor + '_' + name);
	            if (extobj !== null) {
	              return extobj;
	            }
	          }
	          return null;
	        } else {
	          return extobj;
	        }
	      };
	      getSupportedExtensions = WebGLRenderingContext.prototype.getSupportedExtensions;
	      return WebGLRenderingContext.prototype.getSupportedExtensions = function () {
	        var extension, match, result, supported, _i, _len;
	        supported = getSupportedExtensions.call(this);
	        result = [];
	        for (_i = 0, _len = supported.length; _i < _len; _i++) {
	          extension = supported[_i];
	          match = extension.match(vendorRe);
	          if (match !== null) {
	            extension = match[1];
	          }
	          if (__indexOf.call(result, extension) < 0) {
	            result.push(extension);
	          }
	        }
	        return result;
	      };
	    }
	  };

	  textureFloatShims = function textureFloatShims() {
	    var checkColorBuffer, checkFloatLinear, checkSupport, checkTexture, createSourceCanvas, getExtension, getSupportedExtensions, name, shimExtensions, shimLookup, unshimExtensions, unshimLookup, _i, _len;
	    createSourceCanvas = function createSourceCanvas() {
	      var canvas, ctx, imageData;
	      canvas = document.createElement('canvas');
	      canvas.width = 2;
	      canvas.height = 2;
	      ctx = canvas.getContext('2d');
	      imageData = ctx.getImageData(0, 0, 2, 2);
	      imageData.data.set(new Uint8ClampedArray([0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255]));
	      ctx.putImageData(imageData, 0, 0);
	      return canvas;
	    };
	    createSourceCanvas();
	    checkFloatLinear = function checkFloatLinear(gl, sourceType) {
	      var buffer, cleanup, fragmentShader, framebuffer, positionLoc, program, readBuffer, result, source, sourceCanvas, sourceLoc, target, vertexShader, vertices;
	      program = gl.createProgram();
	      vertexShader = gl.createShader(gl.VERTEX_SHADER);
	      gl.attachShader(program, vertexShader);
	      gl.shaderSource(vertexShader, 'attribute vec2 position;\nvoid main(){\n    gl_Position = vec4(position, 0.0, 1.0);\n}');
	      gl.compileShader(vertexShader);
	      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	        throw gl.getShaderInfoLog(vertexShader);
	      }
	      fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	      gl.attachShader(program, fragmentShader);
	      gl.shaderSource(fragmentShader, 'uniform sampler2D source;\nvoid main(){\n    gl_FragColor = texture2D(source, vec2(1.0, 1.0));\n}');
	      gl.compileShader(fragmentShader);
	      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	        throw gl.getShaderInfoLog(fragmentShader);
	      }
	      gl.linkProgram(program);
	      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	        throw gl.getProgramInfoLog(program);
	      }
	      gl.useProgram(program);
	      cleanup = function cleanup() {
	        gl.deleteShader(fragmentShader);
	        gl.deleteShader(vertexShader);
	        gl.deleteProgram(program);
	        gl.deleteBuffer(buffer);
	        gl.deleteTexture(source);
	        gl.deleteTexture(target);
	        gl.deleteFramebuffer(framebuffer);
	        gl.bindBuffer(gl.ARRAY_BUFFER, null);
	        gl.useProgram(null);
	        gl.bindTexture(gl.TEXTURE_2D, null);
	        return gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	      };
	      target = gl.createTexture();
	      gl.bindTexture(gl.TEXTURE_2D, target);
	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	      framebuffer = gl.createFramebuffer();
	      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
	      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target, 0);
	      sourceCanvas = createSourceCanvas();
	      source = gl.createTexture();
	      gl.bindTexture(gl.TEXTURE_2D, source);
	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, sourceType, sourceCanvas);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	      vertices = new Float32Array([1, 1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1]);
	      buffer = gl.createBuffer();
	      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	      positionLoc = gl.getAttribLocation(program, 'position');
	      sourceLoc = gl.getUniformLocation(program, 'source');
	      gl.enableVertexAttribArray(positionLoc);
	      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
	      gl.uniform1i(sourceLoc, 0);
	      gl.drawArrays(gl.TRIANGLES, 0, 6);
	      readBuffer = new Uint8Array(4 * 4);
	      gl.readPixels(0, 0, 2, 2, gl.RGBA, gl.UNSIGNED_BYTE, readBuffer);
	      result = Math.abs(readBuffer[0] - 127) < 10;
	      cleanup();
	      return result;
	    };
	    checkTexture = function checkTexture(gl, targetType) {
	      var target;
	      target = gl.createTexture();
	      gl.bindTexture(gl.TEXTURE_2D, target);
	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, targetType, null);
	      if (gl.getError() === 0) {
	        gl.deleteTexture(target);
	        return true;
	      } else {
	        gl.deleteTexture(target);
	        return false;
	      }
	    };
	    checkColorBuffer = function checkColorBuffer(gl, targetType) {
	      var check, framebuffer, target;
	      target = gl.createTexture();
	      gl.bindTexture(gl.TEXTURE_2D, target);
	      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, targetType, null);
	      framebuffer = gl.createFramebuffer();
	      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
	      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target, 0);
	      check = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	      gl.deleteTexture(target);
	      gl.deleteFramebuffer(framebuffer);
	      gl.bindTexture(gl.TEXTURE_2D, null);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	      if (check === gl.FRAMEBUFFER_COMPLETE) {
	        return true;
	      } else {
	        return false;
	      }
	    };
	    shimExtensions = [];
	    shimLookup = {};
	    unshimExtensions = [];
	    checkSupport = function checkSupport() {
	      var canvas, extobj, gl, halfFloatExt, halfFloatTexturing, singleFloatExt, singleFloatTexturing;
	      canvas = document.createElement('canvas');
	      gl = null;
	      try {
	        gl = canvas.getContext('experimental-webgl');
	        if (gl === null) {
	          gl = canvas.getContext('webgl');
	        }
	      } catch (_error) {}
	      if (gl != null) {
	        singleFloatExt = gl.getExtension('OES_texture_float');
	        if (singleFloatExt === null) {
	          if (checkTexture(gl, gl.FLOAT)) {
	            singleFloatTexturing = true;
	            shimExtensions.push('OES_texture_float');
	            shimLookup.OES_texture_float = {
	              shim: true
	            };
	          } else {
	            singleFloatTexturing = false;
	            unshimExtensions.push('OES_texture_float');
	          }
	        } else {
	          if (checkTexture(gl, gl.FLOAT)) {
	            singleFloatTexturing = true;
	            shimExtensions.push('OES_texture_float');
	          } else {
	            singleFloatTexturing = false;
	            unshimExtensions.push('OES_texture_float');
	          }
	        }
	        if (singleFloatTexturing) {
	          extobj = gl.getExtension('WEBGL_color_buffer_float');
	          if (extobj === null) {
	            if (checkColorBuffer(gl, gl.FLOAT)) {
	              shimExtensions.push('WEBGL_color_buffer_float');
	              shimLookup.WEBGL_color_buffer_float = {
	                shim: true,
	                RGBA32F_EXT: 0x8814,
	                RGB32F_EXT: 0x8815,
	                FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: 0x8211,
	                UNSIGNED_NORMALIZED_EXT: 0x8C17
	              };
	            } else {
	              unshimExtensions.push('WEBGL_color_buffer_float');
	            }
	          } else {
	            if (checkColorBuffer(gl, gl.FLOAT)) {
	              shimExtensions.push('WEBGL_color_buffer_float');
	            } else {
	              unshimExtensions.push('WEBGL_color_buffer_float');
	            }
	          }
	          extobj = gl.getExtension('OES_texture_float_linear');
	          if (extobj === null) {
	            if (checkFloatLinear(gl, gl.FLOAT)) {
	              shimExtensions.push('OES_texture_float_linear');
	              shimLookup.OES_texture_float_linear = {
	                shim: true
	              };
	            } else {
	              unshimExtensions.push('OES_texture_float_linear');
	            }
	          } else {
	            if (checkFloatLinear(gl, gl.FLOAT)) {
	              shimExtensions.push('OES_texture_float_linear');
	            } else {
	              unshimExtensions.push('OES_texture_float_linear');
	            }
	          }
	        }
	        halfFloatExt = gl.getExtension('OES_texture_half_float');
	        if (halfFloatExt === null) {
	          if (checkTexture(gl, 0x8D61)) {
	            halfFloatTexturing = true;
	            shimExtensions.push('OES_texture_half_float');
	            halfFloatExt = shimLookup.OES_texture_half_float = {
	              HALF_FLOAT_OES: 0x8D61,
	              shim: true
	            };
	          } else {
	            halfFloatTexturing = false;
	            unshimExtensions.push('OES_texture_half_float');
	          }
	        } else {
	          if (checkTexture(gl, halfFloatExt.HALF_FLOAT_OES)) {
	            halfFloatTexturing = true;
	            shimExtensions.push('OES_texture_half_float');
	          } else {
	            halfFloatTexturing = false;
	            unshimExtensions.push('OES_texture_half_float');
	          }
	        }
	        if (halfFloatTexturing) {
	          extobj = gl.getExtension('EXT_color_buffer_half_float');
	          if (extobj === null) {
	            if (checkColorBuffer(gl, halfFloatExt.HALF_FLOAT_OES)) {
	              shimExtensions.push('EXT_color_buffer_half_float');
	              shimLookup.EXT_color_buffer_half_float = {
	                shim: true,
	                RGBA16F_EXT: 0x881A,
	                RGB16F_EXT: 0x881B,
	                FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: 0x8211,
	                UNSIGNED_NORMALIZED_EXT: 0x8C17
	              };
	            } else {
	              unshimExtensions.push('EXT_color_buffer_half_float');
	            }
	          } else {
	            if (checkColorBuffer(gl, halfFloatExt.HALF_FLOAT_OES)) {
	              shimExtensions.push('EXT_color_buffer_half_float');
	            } else {
	              unshimExtensions.push('EXT_color_buffer_half_float');
	            }
	          }
	          extobj = gl.getExtension('OES_texture_half_float_linear');
	          if (extobj === null) {
	            if (checkFloatLinear(gl, halfFloatExt.HALF_FLOAT_OES)) {
	              shimExtensions.push('OES_texture_half_float_linear');
	              return shimLookup.OES_texture_half_float_linear = {
	                shim: true
	              };
	            } else {
	              return unshimExtensions.push('OES_texture_half_float_linear');
	            }
	          } else {
	            if (checkFloatLinear(gl, halfFloatExt.HALF_FLOAT_OES)) {
	              return shimExtensions.push('OES_texture_half_float_linear');
	            } else {
	              return unshimExtensions.push('OES_texture_half_float_linear');
	            }
	          }
	        }
	      }
	    };
	    if (window.WebGLRenderingContext != null) {
	      checkSupport();
	      unshimLookup = {};
	      for (_i = 0, _len = unshimExtensions.length; _i < _len; _i++) {
	        name = unshimExtensions[_i];
	        unshimLookup[name] = true;
	      }
	      getExtension = WebGLRenderingContext.prototype.getExtension;
	      WebGLRenderingContext.prototype.getExtension = function (name) {
	        var extobj;
	        extobj = shimLookup[name];
	        if (extobj === void 0) {
	          if (unshimLookup[name]) {
	            return null;
	          } else {
	            return getExtension.call(this, name);
	          }
	        } else {
	          return extobj;
	        }
	      };
	      getSupportedExtensions = WebGLRenderingContext.prototype.getSupportedExtensions;
	      WebGLRenderingContext.prototype.getSupportedExtensions = function () {
	        var extension, result, supported, _j, _k, _len1, _len2;
	        supported = getSupportedExtensions.call(this);
	        result = [];
	        for (_j = 0, _len1 = supported.length; _j < _len1; _j++) {
	          extension = supported[_j];
	          if (unshimLookup[extension] === void 0) {
	            result.push(extension);
	          }
	        }
	        for (_k = 0, _len2 = shimExtensions.length; _k < _len2; _k++) {
	          extension = shimExtensions[_k];
	          if (__indexOf.call(result, extension) < 0) {
	            result.push(extension);
	          }
	        }
	        return result;
	      };
	      return WebGLRenderingContext.prototype.getFloatExtension = function (spec) {
	        var candidate, candidates, half, halfFramebuffer, halfLinear, halfTexture, i, importance, preference, result, single, singleFramebuffer, singleLinear, singleTexture, use, _j, _k, _l, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
	        if ((_ref = spec.prefer) == null) {
	          spec.prefer = ['half'];
	        }
	        if ((_ref1 = spec.require) == null) {
	          spec.require = [];
	        }
	        if ((_ref2 = spec.throws) == null) {
	          spec.throws = true;
	        }
	        singleTexture = this.getExtension('OES_texture_float');
	        halfTexture = this.getExtension('OES_texture_half_float');
	        singleFramebuffer = this.getExtension('WEBGL_color_buffer_float');
	        halfFramebuffer = this.getExtension('EXT_color_buffer_half_float');
	        singleLinear = this.getExtension('OES_texture_float_linear');
	        halfLinear = this.getExtension('OES_texture_half_float_linear');
	        single = {
	          texture: singleTexture !== null,
	          filterable: singleLinear !== null,
	          renderable: singleFramebuffer !== null,
	          score: 0,
	          precision: 'single',
	          half: false,
	          single: true,
	          type: this.FLOAT
	        };
	        half = {
	          texture: halfTexture !== null,
	          filterable: halfLinear !== null,
	          renderable: halfFramebuffer !== null,
	          score: 0,
	          precision: 'half',
	          half: true,
	          single: false,
	          type: (_ref3 = halfTexture != null ? halfTexture.HALF_FLOAT_OES : void 0) != null ? _ref3 : null
	        };
	        candidates = [];
	        if (single.texture) {
	          candidates.push(single);
	        }
	        if (half.texture) {
	          candidates.push(half);
	        }
	        result = [];
	        for (_j = 0, _len1 = candidates.length; _j < _len1; _j++) {
	          candidate = candidates[_j];
	          use = true;
	          _ref4 = spec.require;
	          for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
	            name = _ref4[_k];
	            if (candidate[name] === false) {
	              use = false;
	            }
	          }
	          if (use) {
	            result.push(candidate);
	          }
	        }
	        for (_l = 0, _len3 = result.length; _l < _len3; _l++) {
	          candidate = result[_l];
	          _ref5 = spec.prefer;
	          for (i = _m = 0, _len4 = _ref5.length; _m < _len4; i = ++_m) {
	            preference = _ref5[i];
	            importance = Math.pow(2, spec.prefer.length - i - 1);
	            if (candidate[preference]) {
	              candidate.score += importance;
	            }
	          }
	        }
	        result.sort(function (a, b) {
	          if (a.score === b.score) {
	            return 0;
	          } else if (a.score < b.score) {
	            return 1;
	          } else if (a.score > b.score) {
	            return -1;
	          }
	        });
	        if (result.length === 0) {
	          if (spec.throws) {
	            throw 'No floating point texture support that is ' + spec.require.join(', ');
	          } else {
	            return null;
	          }
	        } else {
	          result = result[0];
	          return {
	            filterable: result.filterable,
	            renderable: result.renderable,
	            type: result.type,
	            precision: result.precision
	          };
	        }
	      };
	    }
	  };

	  nukeVendorPrefix();

	  textureFloatShims();

	  Shader = function () {

	    function Shader(gl, _arg) {
	      var fragment, vertex;
	      this.gl = gl;
	      vertex = _arg.vertex, fragment = _arg.fragment;
	      this.program = this.gl.createProgram();
	      this.vs = this.gl.createShader(this.gl.VERTEX_SHADER);
	      this.fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
	      this.gl.attachShader(this.program, this.vs);
	      this.gl.attachShader(this.program, this.fs);
	      this.compileShader(this.vs, vertex);
	      this.compileShader(this.fs, fragment);
	      this.link();
	      this.value_cache = {};
	      this.uniform_cache = {};
	      this.attribCache = {};
	    }

	    Shader.prototype.attribLocation = function (name) {
	      var location;
	      location = this.attribCache[name];
	      if (location === void 0) {
	        location = this.attribCache[name] = this.gl.getAttribLocation(this.program, name);
	      }
	      return location;
	    };

	    Shader.prototype.compileShader = function (shader, source) {
	      this.gl.shaderSource(shader, source);
	      this.gl.compileShader(shader);
	      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
	        throw "Shader Compile Error: " + this.gl.getShaderInfoLog(shader);
	      }
	    };

	    Shader.prototype.link = function () {
	      this.gl.linkProgram(this.program);
	      if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
	        throw "Shader Link Error: " + this.gl.getProgramInfoLog(this.program);
	      }
	    };

	    Shader.prototype.use = function () {
	      this.gl.useProgram(this.program);
	      return this;
	    };

	    Shader.prototype.uniformLoc = function (name) {
	      var location;
	      location = this.uniform_cache[name];
	      if (location === void 0) {
	        location = this.uniform_cache[name] = this.gl.getUniformLocation(this.program, name);
	      }
	      return location;
	    };

	    Shader.prototype.int = function (name, value) {
	      var cached, loc;
	      cached = this.value_cache[name];
	      if (cached !== value) {
	        this.value_cache[name] = value;
	        loc = this.uniformLoc(name);
	        if (loc) {
	          this.gl.uniform1i(loc, value);
	        }
	      }
	      return this;
	    };

	    Shader.prototype.vec2 = function (name, a, b) {
	      var loc;
	      loc = this.uniformLoc(name);
	      if (loc) {
	        this.gl.uniform2f(loc, a, b);
	      }
	      return this;
	    };

	    Shader.prototype.float = function (name, value) {
	      var cached, loc;
	      cached = this.value_cache[name];
	      if (cached !== value) {
	        this.value_cache[name] = value;
	        loc = this.uniformLoc(name);
	        if (loc) {
	          this.gl.uniform1f(loc, value);
	        }
	      }
	      return this;
	    };

	    return Shader;
	  }();

	  Framebuffer = function () {

	    function Framebuffer(gl) {
	      this.gl = gl;
	      this.buffer = this.gl.createFramebuffer();
	    }

	    Framebuffer.prototype.destroy = function () {
	      return this.gl.deleteFRamebuffer(this.buffer);
	    };

	    Framebuffer.prototype.bind = function () {
	      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffer);
	      return this;
	    };

	    Framebuffer.prototype.unbind = function () {
	      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
	      return this;
	    };

	    Framebuffer.prototype.check = function () {
	      var result;
	      result = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
	      switch (result) {
	        case this.gl.FRAMEBUFFER_UNSUPPORTED:
	          throw 'Framebuffer is unsupported';
	          break;
	        case this.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
	          throw 'Framebuffer incomplete attachment';
	          break;
	        case this.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
	          throw 'Framebuffer incomplete dimensions';
	          break;
	        case this.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
	          throw 'Framebuffer incomplete missing attachment';
	      }
	      return this;
	    };

	    Framebuffer.prototype.color = function (texture) {
	      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, texture.target, texture.handle, 0);
	      this.check();
	      return this;
	    };

	    Framebuffer.prototype.depth = function (buffer) {
	      this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, buffer.id);
	      this.check();
	      return this;
	    };

	    Framebuffer.prototype.destroy = function () {
	      return this.gl.deleteFramebuffer(this.buffer);
	    };

	    return Framebuffer;
	  }();

	  Texture = function () {

	    function Texture(gl, params) {
	      var _ref, _ref1;
	      this.gl = gl;
	      if (params == null) {
	        params = {};
	      }
	      this.channels = this.gl[((_ref = params.channels) != null ? _ref : 'rgba').toUpperCase()];
	      if (typeof params.type === 'number') {
	        this.type = params.type;
	      } else {
	        this.type = this.gl[((_ref1 = params.type) != null ? _ref1 : 'unsigned_byte').toUpperCase()];
	      }
	      switch (this.channels) {
	        case this.gl.RGBA:
	          this.chancount = 4;
	          break;
	        case this.gl.RGB:
	          this.chancount = 3;
	          break;
	        case this.gl.LUMINANCE_ALPHA:
	          this.chancount = 2;
	          break;
	        default:
	          this.chancount = 1;
	      }
	      this.target = this.gl.TEXTURE_2D;
	      this.handle = this.gl.createTexture();
	    }

	    Texture.prototype.destroy = function () {
	      return this.gl.deleteTexture(this.handle);
	    };

	    Texture.prototype.bind = function (unit) {
	      if (unit == null) {
	        unit = 0;
	      }
	      if (unit > 15) {
	        throw 'Texture unit too large: ' + unit;
	      }
	      this.gl.activeTexture(this.gl.TEXTURE0 + unit);
	      this.gl.bindTexture(this.target, this.handle);
	      return this;
	    };

	    Texture.prototype.setSize = function (width, height) {
	      this.width = width;
	      this.height = height;
	      this.gl.texImage2D(this.target, 0, this.channels, this.width, this.height, 0, this.channels, this.type, null);
	      return this;
	    };

	    Texture.prototype.upload = function (data) {
	      this.width = data.width;
	      this.height = data.height;
	      this.gl.texImage2D(this.target, 0, this.channels, this.channels, this.type, data);
	      return this;
	    };

	    Texture.prototype.linear = function () {
	      this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
	      this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
	      return this;
	    };

	    Texture.prototype.nearest = function () {
	      this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
	      this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
	      return this;
	    };

	    Texture.prototype.clampToEdge = function () {
	      this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
	      this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
	      return this;
	    };

	    Texture.prototype.repeat = function () {
	      this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
	      this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
	      return this;
	    };

	    return Texture;
	  }();

	  Node = function () {

	    function Node(gl, width, height) {
	      var floatExt;
	      this.gl = gl;
	      this.width = width;
	      this.height = height;
	      floatExt = this.gl.getFloatExtension({
	        require: ['renderable']
	      });
	      this.texture = new Texture(this.gl, {
	        type: floatExt.type
	      }).bind(0).setSize(this.width, this.height).nearest().clampToEdge();
	      this.fbo = new Framebuffer(this.gl).bind().color(this.texture).unbind();
	    }

	    Node.prototype.use = function () {
	      return this.fbo.bind();
	    };

	    Node.prototype.bind = function (unit) {
	      return this.texture.bind(unit);
	    };

	    Node.prototype.end = function () {
	      return this.fbo.unbind();
	    };

	    Node.prototype.resize = function (width, height) {
	      this.width = width;
	      this.height = height;
	      return this.texture.bind(0).setSize(this.width, this.height);
	    };

	    return Node;
	  }();

	  vertexShaderBlit = 'attribute vec4 position;\nvarying vec2 texcoord;\nvoid main(){\n    texcoord = position.xy*0.5+0.5;\n    gl_Position = position;\n}';

	  fragmentShaderBlit = '#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp int;\n    precision highp float;\n#else\n    precision mediump int;\n    precision mediump float;\n#endif\nuniform sampler2D source;\nvarying vec2 texcoord;';

	  Heights = function () {

	    function Heights(heatmap, gl, width, height) {
	      var i, _i, _ref;
	      this.heatmap = heatmap;
	      this.gl = gl;
	      this.width = width;
	      this.height = height;
	      this.shader = new Shader(this.gl, {
	        vertex: 'attribute vec4 position, intensity;\nvarying vec2 off, dim;\nvarying float vIntensity;\nuniform vec2 viewport;\n\nvoid main(){\n    dim = abs(position.zw);\n    off = position.zw;\n    vec2 pos = position.xy + position.zw;\n    vIntensity = intensity.x;\n    gl_Position = vec4((pos/viewport)*2.0-1.0, 0.0, 1.0);\n}',
	        fragment: '#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp int;\n    precision highp float;\n#else\n    precision mediump int;\n    precision mediump float;\n#endif\nvarying vec2 off, dim;\nvarying float vIntensity;\nvoid main(){\n    float falloff = (1.0 - smoothstep(0.0, 1.0, length(off/dim)));\n    float intensity = falloff*vIntensity;\n    gl_FragColor = vec4(intensity);\n}'
	      });
	      this.clampShader = new Shader(this.gl, {
	        vertex: vertexShaderBlit,
	        fragment: fragmentShaderBlit + 'uniform float low, high;\nvoid main(){\n    gl_FragColor = vec4(clamp(texture2D(source, texcoord).rgb, low, high), 1.0);\n}'
	      });
	      this.multiplyShader = new Shader(this.gl, {
	        vertex: vertexShaderBlit,
	        fragment: fragmentShaderBlit + 'uniform float value;\nvoid main(){\n    gl_FragColor = vec4(texture2D(source, texcoord).rgb*value, 1.0);\n}'
	      });
	      this.blurShader = new Shader(this.gl, {
	        vertex: vertexShaderBlit,
	        fragment: fragmentShaderBlit + 'uniform vec2 viewport;\nvoid main(){\n    vec4 result = vec4(0.0);\n    for(int x=-1; x<=1; x++){\n        for(int y=-1; y<=1; y++){\n            vec2 off = vec2(x,y)/viewport;\n            //float factor = 1.0 - smoothstep(0.0, 1.5, length(off));\n            float factor = 1.0;\n            result += vec4(texture2D(source, texcoord+off).rgb*factor, factor);\n        }\n    }\n    gl_FragColor = vec4(result.rgb/result.w, 1.0);\n}'
	      });
	      this.nodeBack = new Node(this.gl, this.width, this.height);
	      this.nodeFront = new Node(this.gl, this.width, this.height);
	      this.vertexBuffer = this.gl.createBuffer();
	      this.vertexSize = 8;
	      this.maxPointCount = 1024 * 10;
	      this.vertexBufferData = new Float32Array(this.maxPointCount * this.vertexSize * 6);
	      this.vertexBufferViews = [];
	      for (i = _i = 0, _ref = this.maxPointCount; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	        this.vertexBufferViews.push(new Float32Array(this.vertexBufferData.buffer, 0, i * this.vertexSize * 6));
	      }
	      this.bufferIndex = 0;
	      this.pointCount = 0;
	    }

	    Heights.prototype.resize = function (width, height) {
	      this.width = width;
	      this.height = height;
	      this.nodeBack.resize(this.width, this.height);
	      return this.nodeFront.resize(this.width, this.height);
	    };

	    Heights.prototype.update = function () {
	      var intensityLoc, positionLoc;
	      if (this.pointCount > 0) {
	        this.gl.enable(this.gl.BLEND);
	        this.nodeFront.use();
	        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
	        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexBufferViews[this.pointCount], this.gl.STREAM_DRAW);
	        positionLoc = this.shader.attribLocation('position');
	        intensityLoc = this.shader.attribLocation('intensity');
	        this.gl.enableVertexAttribArray(1);
	        this.gl.vertexAttribPointer(positionLoc, 4, this.gl.FLOAT, false, 8 * 4, 0 * 4);
	        this.gl.vertexAttribPointer(intensityLoc, 4, this.gl.FLOAT, false, 8 * 4, 4 * 4);
	        this.shader.use().vec2('viewport', this.width, this.height);
	        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.pointCount * 6);
	        this.gl.disableVertexAttribArray(1);
	        this.pointCount = 0;
	        this.bufferIndex = 0;
	        this.nodeFront.end();
	        return this.gl.disable(this.gl.BLEND);
	      }
	    };

	    Heights.prototype.clear = function () {
	      this.nodeFront.use();
	      this.gl.clearColor(0, 0, 0, 1);
	      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	      return this.nodeFront.end();
	    };

	    Heights.prototype.clamp = function (min, max) {
	      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.heatmap.quad);
	      this.gl.vertexAttribPointer(0, 4, this.gl.FLOAT, false, 0, 0);
	      this.nodeFront.bind(0);
	      this.nodeBack.use();
	      this.clampShader.use().int('source', 0).float('low', min).float('high', max);
	      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	      this.nodeBack.end();
	      return this.swap();
	    };

	    Heights.prototype.multiply = function (value) {
	      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.heatmap.quad);
	      this.gl.vertexAttribPointer(0, 4, this.gl.FLOAT, false, 0, 0);
	      this.nodeFront.bind(0);
	      this.nodeBack.use();
	      this.multiplyShader.use().int('source', 0).float('value', value);
	      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	      this.nodeBack.end();
	      return this.swap();
	    };

	    Heights.prototype.blur = function () {
	      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.heatmap.quad);
	      this.gl.vertexAttribPointer(0, 4, this.gl.FLOAT, false, 0, 0);
	      this.nodeFront.bind(0);
	      this.nodeBack.use();
	      this.blurShader.use().int('source', 0).vec2('viewport', this.width, this.height);
	      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	      this.nodeBack.end();
	      return this.swap();
	    };

	    Heights.prototype.swap = function () {
	      var tmp;
	      tmp = this.nodeFront;
	      this.nodeFront = this.nodeBack;
	      return this.nodeBack = tmp;
	    };

	    Heights.prototype.addVertex = function (x, y, xs, ys, intensity) {
	      this.vertexBufferData[this.bufferIndex++] = x;
	      this.vertexBufferData[this.bufferIndex++] = y;
	      this.vertexBufferData[this.bufferIndex++] = xs;
	      this.vertexBufferData[this.bufferIndex++] = ys;
	      this.vertexBufferData[this.bufferIndex++] = intensity;
	      this.vertexBufferData[this.bufferIndex++] = intensity;
	      this.vertexBufferData[this.bufferIndex++] = intensity;
	      return this.vertexBufferData[this.bufferIndex++] = intensity;
	    };

	    Heights.prototype.addPoint = function (x, y, size, intensity) {
	      var s;
	      if (size == null) {
	        size = 50;
	      }
	      if (intensity == null) {
	        intensity = 0.2;
	      }
	      if (this.pointCount >= this.maxPointCount - 1) {
	        this.update();
	      }
	      y = this.height - y;
	      s = size / 2;
	      this.addVertex(x, y, -s, -s, intensity);
	      this.addVertex(x, y, +s, -s, intensity);
	      this.addVertex(x, y, -s, +s, intensity);
	      this.addVertex(x, y, -s, +s, intensity);
	      this.addVertex(x, y, +s, -s, intensity);
	      this.addVertex(x, y, +s, +s, intensity);
	      return this.pointCount += 1;
	    };

	    return Heights;
	  }();

	  WebGLHeatmap = function () {

	    function WebGLHeatmap(_arg) {
	      var alphaEnd, alphaRange, alphaStart, getColorFun, gradientTexture, image, intensityToAlpha, output, quad, textureGradient, _ref, _ref1, _ref2, _ref3;
	      _ref = _arg != null ? _arg : {}, this.canvas = _ref.canvas, this.width = _ref.width, this.height = _ref.height, intensityToAlpha = _ref.intensityToAlpha, gradientTexture = _ref.gradientTexture, alphaRange = _ref.alphaRange;
	      var gl = _arg.gl;
	      if (!this.canvas) {
	        this.canvas = document.createElement('canvas');
	      }
	      try {
	        if (gl) {
	          this.gl = gl;
	        } else {
	          this.gl = this.canvas.getContext('experimental-webgl', {
	            depth: false,
	            antialias: false
	          });
	          if (this.gl === null) {
	            this.gl = this.canvas.getContext('webgl', {
	              depth: false,
	              antialias: false
	            });
	            if (this.gl === null) {
	              throw 'WebGL not supported';
	            }
	          }
	        }
	      } catch (error) {
	        throw 'WebGL not supported';
	      }
	      if (window.WebGLDebugUtils != null) {
	        console.log('debugging mode');
	        this.gl = WebGLDebugUtils.makeDebugContext(this.gl, function (err, funcName, args) {
	          throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
	        });
	      }
	      this.gl.enableVertexAttribArray(0);
	      this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
	      if (gradientTexture) {
	        textureGradient = this.gradientTexture = new Texture(this.gl, {
	          channels: 'rgba'
	        }).bind(0).setSize(2, 2).nearest().clampToEdge();
	        if (typeof gradientTexture === 'string') {
	          image = new Image();
	          image.onload = function () {
	            return textureGradient.bind().upload(image);
	          };
	          image.src = gradientTexture;
	        } else {
	          if (gradientTexture.width > 0 && gradientTexture.height > 0) {
	            textureGradient.upload(gradientTexture);
	          } else {
	            gradientTexture.onload = function () {
	              return textureGradient.upload(gradientTexture);
	            };
	          }
	        }
	        getColorFun = 'uniform sampler2D gradientTexture;\nvec3 getColor(float intensity){\n    return texture2D(gradientTexture, vec2(intensity, 0.0)).rgb;\n}';
	      } else {
	        textureGradient = null;
	        getColorFun = 'vec3 getColor(float intensity){\n    vec3 blue = vec3(0.0, 0.0, 1.0);\n    vec3 cyan = vec3(0.0, 1.0, 1.0);\n    vec3 green = vec3(0.0, 1.0, 0.0);\n    vec3 yellow = vec3(1.0, 1.0, 0.0);\n    vec3 red = vec3(1.0, 0.0, 0.0);\n\n    vec3 color = (\n        fade(-0.25, 0.25, intensity)*blue +\n        fade(0.0, 0.5, intensity)*cyan +\n        fade(0.25, 0.75, intensity)*green +\n        fade(0.5, 1.0, intensity)*yellow +\n        smoothstep(0.75, 1.0, intensity)*red\n    );\n    return color;\n}';
	      }
	      if (intensityToAlpha == null) {
	        intensityToAlpha = true;
	      }
	      if (intensityToAlpha) {
	        _ref1 = alphaRange != null ? alphaRange : [0, 1], alphaStart = _ref1[0], alphaEnd = _ref1[1];
	        output = "vec4 alphaFun(vec3 color, float intensity){\n    float alpha = smoothstep(" + alphaStart.toFixed(8) + ", " + alphaEnd.toFixed(8) + ", intensity);\n    return vec4(color*alpha, alpha);\n}";
	      } else {
	        output = 'vec4 alphaFun(vec3 color, float intensity){\n    return vec4(color, 1.0);\n}';
	      }
	      this.shader = new Shader(this.gl, {
	        vertex: vertexShaderBlit,
	        fragment: fragmentShaderBlit + ("float linstep(float low, float high, float value){\n    return clamp((value-low)/(high-low), 0.0, 1.0);\n}\n\nfloat fade(float low, float high, float value){\n    float mid = (low+high)*0.5;\n    float range = (high-low)*0.5;\n    float x = 1.0 - clamp(abs(mid-value)/range, 0.0, 1.0);\n    return smoothstep(0.0, 1.0, x);\n}\n\n" + getColorFun + "\n" + output + "\n\nvoid main(){\n    float intensity = smoothstep(0.0, 1.0, texture2D(source, texcoord).r);\n    vec3 color = getColor(intensity);\n    gl_FragColor = alphaFun(color, intensity);\n}")
	      });
	      if ((_ref2 = this.width) == null) {
	        this.width = this.canvas.offsetWidth || 2;
	      }
	      if ((_ref3 = this.height) == null) {
	        this.height = this.canvas.offsetHeight || 2;
	      }
	      this.canvas.width = this.width;
	      this.canvas.height = this.height;
	      this.gl.viewport(0, 0, this.width, this.height);
	      this.quad = this.gl.createBuffer();
	      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quad);
	      quad = new Float32Array([-1, -1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, 1, 0, 1, 1, -1, 0, 1, 1, 1, 0, 1]);
	      this.gl.bufferData(this.gl.ARRAY_BUFFER, quad, this.gl.STATIC_DRAW);
	      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	      this.heights = new Heights(this, this.gl, this.width, this.height);
	    }

	    WebGLHeatmap.prototype.adjustSize = function (width, height) {
	      var canvasHeight, canvasWidth;
	      canvasWidth = width || this.canvas.offsetWidth || 2;
	      canvasHeight = height || this.canvas.offsetHeight || 2;
	      if (this.width !== canvasWidth || this.height !== canvasHeight) {
	        this.gl.viewport(0, 0, canvasWidth, canvasHeight);
	        this.canvas.width = canvasWidth;
	        this.canvas.height = canvasHeight;
	        this.width = canvasWidth;
	        this.height = canvasHeight;
	        return this.heights.resize(this.width, this.height);
	      }
	    };

	    WebGLHeatmap.prototype.display = function () {
	      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quad);
	      this.gl.vertexAttribPointer(0, 4, this.gl.FLOAT, false, 0, 0);
	      this.heights.nodeFront.bind(0);
	      if (this.gradientTexture) {
	        this.gradientTexture.bind(1);
	      }
	      this.shader.use().int('source', 0).int('gradientTexture', 1);
	      return this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	    };

	    WebGLHeatmap.prototype.update = function () {
	      return this.heights.update();
	    };

	    WebGLHeatmap.prototype.clear = function () {
	      return this.heights.clear();
	    };

	    WebGLHeatmap.prototype.clamp = function (min, max) {
	      if (min == null) {
	        min = 0;
	      }
	      if (max == null) {
	        max = 1;
	      }
	      return this.heights.clamp(min, max);
	    };

	    WebGLHeatmap.prototype.multiply = function (value) {
	      if (value == null) {
	        value = 0.95;
	      }
	      return this.heights.multiply(value);
	    };

	    WebGLHeatmap.prototype.blur = function () {
	      return this.heights.blur();
	    };

	    WebGLHeatmap.prototype.addPoint = function (x, y, size, intensity) {
	      return this.heights.addPoint(x, y, size, intensity);
	    };

	    return WebGLHeatmap;
	  }();

	  window.createWebGLHeatmap = function (params) {
	    return new WebGLHeatmap(params);
	  };
	}).call(undefined);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SphericalMercator = __webpack_require__(6);
	var merc = new SphericalMercator({
	    size: 256
	});

	var defaultoptions = {
	    size: 30000,
	    units: 'm',
	    opacity: 1,
	    gradientTexture: false,
	    alphaRange: 1,
	    padding: 0

	};

	function extend(dest, args) {
	    for (var key in args) {
	        dest[key] = args[key];
	    }
	    return dest;
	}

	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

	function uuid() {
	    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ID';

	    var uuid = new Array(36),
	        rnd = 0,
	        r = void 0;
	    for (var i = 0; i < 36; i++) {
	        if (i === 8 || i === 13 || i === 18 || i === 23) {
	            uuid[i] = '-';
	        } else if (i === 14) {
	            uuid[i] = '4';
	        } else {
	            if (rnd <= 0x02) rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
	            r = rnd & 0xf;
	            rnd = rnd >> 4;
	            uuid[i] = CHARS[i === 19 ? r & 0x3 | 0x8 : r];
	        }
	    }
	    return prefix + '-' + uuid.join('');
	}

	var WebGlHeatLayer = function (_maptalks$Layer) {
	    _inherits(WebGlHeatLayer, _maptalks$Layer);

	    function WebGlHeatLayer(id, data, options) {
	        _classCallCheck(this, WebGlHeatLayer);

	        var _this = _possibleConstructorReturn(this, (WebGlHeatLayer.__proto__ || Object.getPrototypeOf(WebGlHeatLayer)).call(this, id, options));
	        // options.doubleBuffer=true;


	        _this.data = _this._filterData(data);
	        _this._initOptions(options);
	        _this.inited = false;
	        return _this;
	    }

	    _createClass(WebGlHeatLayer, [{
	        key: 'getData',
	        value: function getData() {
	            return this.data || [];
	        }
	    }, {
	        key: 'getCanvas',
	        value: function getCanvas() {
	            return this.rendererCanvas;
	        }
	    }, {
	        key: 'setCanvas',
	        value: function setCanvas(canvas) {
	            this.rendererCanvas = canvas;
	        }
	    }, {
	        key: 'redraw',
	        value: function redraw() {
	            var renderer = this._getRenderer();
	            if (renderer) {
	                renderer.setToRedraw();
	            }
	            return this;
	        }
	    }, {
	        key: 'onRemove',
	        value: function onRemove(map) {
	            this.inited = false;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.heatmap.clear();
	            this.heatmap.update();
	            this.heatmap.display();
	            this.data = [];
	            this.redraw();
	        }

	        /**
	         *  reset data
	         * @param {*} data 
	         */

	    }, {
	        key: 'resetData',
	        value: function resetData(data) {
	            this.data = this._filterData(data);
	            this.redraw();
	        }

	        /**
	         * 增量数据
	         * @param {*} data 
	         */

	    }, {
	        key: 'addData',
	        value: function addData(data) {
	            if (!Array.isArray(data)) data = [data];
	            this.data = this.data.concat(this._filterData(data));
	            this.redraw();
	        }
	    }, {
	        key: 'removeData',
	        value: function removeData(data) {
	            var idMap = {};
	            if (Array.isArray(data)) {
	                for (var i = 0; i < data.length; i++) {
	                    idMap[data[i].id] = data[i].id;
	                }
	            } else {
	                idMap[data.id] = data.id;
	            }
	            var _data = [];
	            for (var i = 0, len = this.data.length; i < len; i++) {
	                var id = this.data[i].id;
	                if (idMap[id] != undefined) continue;
	                _data.push(this.data[i]);
	            }
	            this.data = _data;
	            this.redraw();
	            // this._reset();
	        }
	    }, {
	        key: '_initOptions',
	        value: function _initOptions(options) {
	            this.options = extend(this.options, defaultoptions);
	            this.options = extend(this.options, options);
	        }
	    }, {
	        key: '_init',
	        value: function _init() {
	            var canvas = this.rendererCanvas;
	            var options = this.options;
	            if (!this.heatMapcanvas) {
	                this.heatMapcanvas = document.createElement('canvas');
	                this.heatMapcanvas.width = canvas.width;
	                this.heatMapcanvas.height = canvas.height;
	            }
	            try {
	                if (!this.heatmap) {
	                    this.heatmap = window.createWebGLHeatmap({
	                        canvas: this.heatMapcanvas,
	                        gradientTexture: options.gradientTexture,
	                        alphaRange: [0, options.alphaRange]
	                        // gl:this.getRenderer().gl
	                    });
	                }
	            } catch (e) {
	                console.error(e);
	            }
	        }
	    }, {
	        key: '_reset',
	        value: function _reset() {
	            var size = this.getMap().getSize();
	            var width = size.width,
	                height = size.height;
	            if (this.heatMapcanvas != size.width) {
	                this.heatMapcanvas.width = size.width;
	            }
	            if (this.heatMapcanvas.height != size.height) {
	                this.heatMapcanvas.height = size.height;
	            }
	            this.heatmap.adjustSize(width, height);
	            this._redraw();
	        }

	        /**
	         * 数据格式化
	         * @param {*} data 
	         */

	    }, {
	        key: '_filterData',
	        value: function _filterData(data) {
	            for (var i = 0, len = data.length; i < len; i++) {
	                var mercatormeters = [];
	                var coordinates = data[i].coordinates;
	                if (Array.isArray(coordinates[0])) {
	                    for (var j = 0; j < coordinates.length; j++) {
	                        var mercatormeter = merc.forward(coordinates[j]);
	                        mercatormeters.push(mercatormeter);
	                    }
	                } else {
	                    mercatormeters = merc.forward(coordinates);
	                }
	                data[i].mercatormeters = mercatormeters;
	                if (data[i].id == undefined) data[i].id = uuid();
	            }
	            return data;
	        }

	        /**
	         *  //经纬度转屏幕坐标
	         * @param {*} lnglat 
	         * @param {*} mercatormeters 
	         */

	    }, {
	        key: '_lnglatToPixel',
	        value: function _lnglatToPixel(lnglat, mercatormeters) {
	            if (!Array.isArray(lnglat)) {
	                console.error(lnglat);
	                throw new Error('lnglat is error');
	            }
	            var map = this.getMap();
	            var projection = map.getProjection();
	            var xyArray = [];
	            if (Array.isArray(lnglat[0])) {
	                for (var i = 0; i < lnglat.length; i++) {
	                    var _lnglat = lnglat[i];
	                    var lng = _lnglat[0];
	                    var lat = _lnglat[1];
	                    var xy = projection.project(new maptalks.Coordinate(lng, lat));
	                    xy = map._prjToContainerPoint(xy);
	                    xyArray.push([xy.x, xy.y]);
	                }
	            } else {
	                var lng = lnglat[0];
	                var lat = lnglat[1];
	                var xy = projection.project(new maptalks.Coordinate(lng, lat));
	                xy = map._prjToContainerPoint(xy);
	                xyArray = [xy.x, xy.y];
	            }
	            return xyArray;
	        }
	    }, {
	        key: '_redraw',
	        value: function _redraw() {
	            var map = this.getMap(),
	                heatmap = this.heatmap,
	                data = this.data,
	                dataLen = data.length,
	                floor = Math.floor,
	                multiply = this._multiply;
	            var renderer = this.getRenderer();
	            var extent = map.getExtent();
	            var miny = extent.ymin,
	                minx = extent.xmin,
	                maxy = extent.ymax,
	                maxx = extent.xmax;
	            if (!map) throw new Error('not find map');
	            var geometry, type, coordinates, mercatormeters;
	            // var timeId='大量的数据热区 绘制热区时间 ';
	            heatmap.clear();
	            if (dataLen) {
	                // console.time(timeId)
	                for (var i = 0; i < dataLen; i++) {
	                    var dataVal = data[i];
	                    coordinates = dataVal.coordinates;
	                    var lng = coordinates[0],
	                        lat = coordinates[1];
	                    if (lng < minx || lng > maxx || lat < miny || lat > maxy) continue;
	                    mercatormeters = dataVal.mercatormeters;
	                    var size = dataVal.count || 10;
	                    var xy = this._lnglatToPixel(coordinates, mercatormeters);
	                    heatmap.addPoint(floor(xy[0]), floor(xy[1]), size);
	                }
	                // console.timeEnd(timeId)
	                heatmap.update();
	            }
	            heatmap.display();
	            var context = renderer.context || this.rendererCanvas.getContext('2d');
	            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	            context.save();
	            context.drawImage(this.heatmap.canvas, 0, 0, context.canvas.width, context.canvas.height);
	            context.restore();
	            // renderer.completeRender();
	        }
	    }]);

	    return WebGlHeatLayer;
	}(maptalks.Layer);

	WebGlHeatLayer.mergeOptions({});

	WebGlHeatLayer.registerJSONType('WebGlHeatLayer');

	var WebGlHeatLayerRenderer = function (_maptalks$renderer$Ca) {
	    _inherits(WebGlHeatLayerRenderer, _maptalks$renderer$Ca);

	    function WebGlHeatLayerRenderer() {
	        _classCallCheck(this, WebGlHeatLayerRenderer);

	        return _possibleConstructorReturn(this, (WebGlHeatLayerRenderer.__proto__ || Object.getPrototypeOf(WebGlHeatLayerRenderer)).apply(this, arguments));
	    }

	    _createClass(WebGlHeatLayerRenderer, [{
	        key: 'getLayer',
	        value: function getLayer() {
	            return this.layer;
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var map = this.getMap(),
	                layer = this.layer;
	            this.prepareCanvas();
	            if (!layer.getCanvas()) {
	                layer.setCanvas(this.canvas);
	            }

	            if (!layer.inited) {
	                layer._init();
	                layer.inited = true;
	            }
	            layer._reset();
	            this.completeRender();
	        }
	    }, {
	        key: 'drawOnInteracting',
	        value: function drawOnInteracting() {
	            this.draw();
	        }
	    }, {
	        key: 'onResize',
	        value: function onResize() {
	            if (this.canvas) {
	                // this._heater._width  = this.canvas.width;
	                // this._heater._height = this.canvas.height;
	            }
	            _get(WebGlHeatLayerRenderer.prototype.__proto__ || Object.getPrototypeOf(WebGlHeatLayerRenderer.prototype), 'onResize', this).apply(this, arguments);
	        }
	    }, {
	        key: 'onRemove',
	        value: function onRemove() {
	            // this.clearHeatCache();

	        }
	    }, {
	        key: 'clearHeatCache',
	        value: function clearHeatCache() {
	            // delete this._heatViews;
	        }
	    }]);

	    return WebGlHeatLayerRenderer;
	}(maptalks.renderer.CanvasRenderer);

	WebGlHeatLayer.registerRenderer('canvas', WebGlHeatLayerRenderer);
	// WebGlHeatLayer.registerRenderer('gl',WebGlHeatLayerRenderer);
	maptalks.WebGlHeatLayer = WebGlHeatLayer;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var SphericalMercator = (function(){

	// Closures including constants and other precalculated values.
	var cache = {},
	    EPSLN = 1.0e-10,
	    D2R = Math.PI / 180,
	    R2D = 180 / Math.PI,
	    // 900913 properties.
	    A = 6378137.0,
	    MAXEXTENT = 20037508.342789244;


	// SphericalMercator constructor: precaches calculations
	// for fast tile lookups.
	function SphericalMercator(options) {
	    options = options || {};
	    this.size = options.size || 256;
	    if (!cache[this.size]) {
	        var size = this.size;
	        var c = cache[this.size] = {};
	        c.Bc = [];
	        c.Cc = [];
	        c.zc = [];
	        c.Ac = [];
	        for (var d = 0; d < 30; d++) {
	            c.Bc.push(size / 360);
	            c.Cc.push(size / (2 * Math.PI));
	            c.zc.push(size / 2);
	            c.Ac.push(size);
	            size *= 2;
	        }
	    }
	    this.Bc = cache[this.size].Bc;
	    this.Cc = cache[this.size].Cc;
	    this.zc = cache[this.size].zc;
	    this.Ac = cache[this.size].Ac;
	};

	// Convert lon lat to screen pixel value
	//
	// - `ll` {Array} `[lon, lat]` array of geographic coordinates.
	// - `zoom` {Number} zoom level.
	SphericalMercator.prototype.px = function(ll, zoom) {
	    var d = this.zc[zoom];
	    var f = Math.min(Math.max(Math.sin(D2R * ll[1]), -0.9999), 0.9999);
	    var x = Math.round(d + ll[0] * this.Bc[zoom]);
	    var y = Math.round(d + 0.5 * Math.log((1 + f) / (1 - f)) * (-this.Cc[zoom]));
	    (x > this.Ac[zoom]) && (x = this.Ac[zoom]);
	    (y > this.Ac[zoom]) && (y = this.Ac[zoom]);
	    //(x < 0) && (x = 0);
	    //(y < 0) && (y = 0);
	    return [x, y];
	};

	// Convert screen pixel value to lon lat
	//
	// - `px` {Array} `[x, y]` array of geographic coordinates.
	// - `zoom` {Number} zoom level.
	SphericalMercator.prototype.ll = function(px, zoom) {
	    var g = (px[1] - this.zc[zoom]) / (-this.Cc[zoom]);
	    var lon = (px[0] - this.zc[zoom]) / this.Bc[zoom];
	    var lat = R2D * (2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI);
	    return [lon, lat];
	};

	// Convert tile xyz value to bbox of the form `[w, s, e, n]`
	//
	// - `x` {Number} x (longitude) number.
	// - `y` {Number} y (latitude) number.
	// - `zoom` {Number} zoom.
	// - `tms_style` {Boolean} whether to compute using tms-style.
	// - `srs` {String} projection for resulting bbox (WGS84|900913).
	// - `return` {Array} bbox array of values in form `[w, s, e, n]`.
	SphericalMercator.prototype.bbox = function(x, y, zoom, tms_style, srs) {
	    // Convert xyz into bbox with srs WGS84
	    if (tms_style) {
	        y = (Math.pow(2, zoom) - 1) - y;
	    }
	    // Use +y to make sure it's a number to avoid inadvertent concatenation.
	    var ll = [x * this.size, (+y + 1) * this.size]; // lower left
	    // Use +x to make sure it's a number to avoid inadvertent concatenation.
	    var ur = [(+x + 1) * this.size, y * this.size]; // upper right
	    var bbox = this.ll(ll, zoom).concat(this.ll(ur, zoom));

	    // If web mercator requested reproject to 900913.
	    if (srs === '900913') {
	        return this.convert(bbox, '900913');
	    } else {
	        return bbox;
	    }
	};

	// Convert bbox to xyx bounds
	//
	// - `bbox` {Number} bbox in the form `[w, s, e, n]`.
	// - `zoom` {Number} zoom.
	// - `tms_style` {Boolean} whether to compute using tms-style.
	// - `srs` {String} projection of input bbox (WGS84|900913).
	// - `@return` {Object} XYZ bounds containing minX, maxX, minY, maxY properties.
	SphericalMercator.prototype.xyz = function(bbox, zoom, tms_style, srs) {
	    // If web mercator provided reproject to WGS84.
	    if (srs === '900913') {
	        bbox = this.convert(bbox, 'WGS84');
	    }

	    var ll = [bbox[0], bbox[1]]; // lower left
	    var ur = [bbox[2], bbox[3]]; // upper right
	    var px_ll = this.px(ll, zoom);
	    var px_ur = this.px(ur, zoom);
	    // Y = 0 for XYZ is the top hence minY uses px_ur[1].
	    var x = [ Math.floor(px_ll[0] / this.size), Math.floor((px_ur[0] - 1) / this.size) ];
	    var y = [ Math.floor(px_ur[1] / this.size), Math.floor((px_ll[1] - 1) / this.size) ];
	    var bounds = {
	        minX: Math.min.apply(Math, x) < 0 ? 0 : Math.min.apply(Math, x),
	        minY: Math.min.apply(Math, y) < 0 ? 0 : Math.min.apply(Math, y),
	        maxX: Math.max.apply(Math, x),
	        maxY: Math.max.apply(Math, y)
	    };
	    if (tms_style) {
	        var tms = {
	            minY: (Math.pow(2, zoom) - 1) - bounds.maxY,
	            maxY: (Math.pow(2, zoom) - 1) - bounds.minY
	        };
	        bounds.minY = tms.minY;
	        bounds.maxY = tms.maxY;
	    }
	    return bounds;
	};

	// Convert projection of given bbox.
	//
	// - `bbox` {Number} bbox in the form `[w, s, e, n]`.
	// - `to` {String} projection of output bbox (WGS84|900913). Input bbox
	//   assumed to be the "other" projection.
	// - `@return` {Object} bbox with reprojected coordinates.
	SphericalMercator.prototype.convert = function(bbox, to) {
	    if (to === '900913') {
	        return this.forward(bbox.slice(0, 2)).concat(this.forward(bbox.slice(2,4)));
	    } else {
	        return this.inverse(bbox.slice(0, 2)).concat(this.inverse(bbox.slice(2,4)));
	    }
	};

	// Convert lon/lat values to 900913 x/y.
	SphericalMercator.prototype.forward = function(ll) {
	    var xy = [
	        A * ll[0] * D2R,
	        A * Math.log(Math.tan((Math.PI*0.25) + (0.5 * ll[1] * D2R)))
	    ];
	    // if xy value is beyond maxextent (e.g. poles), return maxextent.
	    (xy[0] > MAXEXTENT) && (xy[0] = MAXEXTENT);
	    (xy[0] < -MAXEXTENT) && (xy[0] = -MAXEXTENT);
	    (xy[1] > MAXEXTENT) && (xy[1] = MAXEXTENT);
	    (xy[1] < -MAXEXTENT) && (xy[1] = -MAXEXTENT);
	    return xy;
	};

	// Convert 900913 x/y values to lon/lat.
	SphericalMercator.prototype.inverse = function(xy) {
	    return [
	        (xy[0] * R2D / A),
	        ((Math.PI*0.5) - 2.0 * Math.atan(Math.exp(-xy[1] / A))) * R2D
	    ];
	};

	return SphericalMercator;

	})();

	if (true) {
	    module.exports = exports = SphericalMercator;
	}


/***/ })
/******/ ]);