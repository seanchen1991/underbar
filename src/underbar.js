/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  // _.last = function(array, n) {
  //   if (n === 0) {
  //     return [];
  //   } else if (n > array.length) {
  //     return array;
  //   } else {
  //     return n === undefined ? array[array.length - 1] : array.slice(n - 1, array.length);
  //   }
  // };

//Rewritten Last using only ternary conditionals
  _.last = function(array, n) {
    return n === 0 ? [] : (n > array.length ? array : (n === undefined ? array[array.length-1] : array.slice(n-1, array.length)));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (collection.length !== undefined) {
      for (var i = 0, x = collection.length; i < x; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var passed = [];
    _.each(collection, function(element) {
      if (test(element)) {
        passed.push(element);
      }
    })
    return passed;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function(item) {
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var unique = [];
    _.each(array, function(element) {
      if (_.indexOf(unique, element) == -1) {
        unique.push(element);
      }
    });
    return unique;
  };

  //Faster version of Uniq
  _.uniq = function(array) {
    var unique = {}, result = [];
    for (var i = 0; i < array.length; i++) {
      unique[array[i]] = array[i];
    };
    for (var key in unique) {
      result.push(unique[key]);
    }
    return result;
  };

  //An even cleaner way
  _.uniq = function(array) {
    var unique = {};
    for (var i = 0, x = array.length; i < x; i++) {
      unique[array[i]] = array[i];
    }
    return Object.keys(unique);
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var mapped = [];
    _.each(collection, function(element) {
      mapped.push(iterator(element));
    })
    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(value) {
      return (typeof functionOrKey == 'function' ? functionOrKey : value[functionOrKey]).apply(value, args);
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    if (collection.length > 0 && accumulator === undefined) {
      var start = collection[0];
      _.each(collection, function(element) {
        start = iterator(start, element);
      });
    } else {
      var start = accumulator;
      _.each(collection, function(element) {
        start = iterator(start, element);
      })
    }
    return start;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (iterator === undefined) { iterator = _.identity; }
    return _.reduce(collection, function(passed, element) {
      if (!passed) {
        return false;
      }
      return (!!iterator(element));
    }, true);
  };

  //Simpler version of Every
  _.every = function(collection, iterator) {
    if (iterator === undefined) { iterator = _.identity; }
    return _.reduce(collection, function(passed, element) {
      return passed && Boolean(iterator(element));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    return !(_.every(collection, function(element) {
      return !iterator(element);
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  // _.extend = function(obj) {
  //   _.each(Array.prototype.slice.call(arguments, 1), function(item) {
  //     for (var key in item) {
  //       if (Object.prototype.hasOwnProperty.call(item, key)) {
  //         obj[key] = item[key];
  //       }
  //     }
  //   });
  //   return obj;
  // };

  _.extend = function(obj) {
    _.each(Array.prototype.slice.call(arguments, 1), function(item) {
      if (item) {
        for (var key in item) {
          obj[key] = item[key];
        }
      }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(Array.prototype.slice.call(arguments, 1), function(item) {
      if (item) {
        for (var key in item) {
          if (obj[key] === undefined) {
            obj[key] = item[key];
          }
        }
      }
    });
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func) {
    var memo = {};
    return function() {
      var args = Array.prototype.slice.call(arguments);
      if (memo[args] === undefined) {
        return memo[args] = func.apply(null, arguments);
      }
      return memo[args];
    }
  };
  

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var rand;
    var randomized = [];
    var index = 0;
    _.each(array, function(value) {
      rand = Math.floor(Math.random() * index++);
      randomized[index - 1] = randomized[rand];
      randomized[rand] = value;
    });
    return randomized;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array

  _.flatten = function(nestedArray) {
    var storage = [];
    function goThroughArray(arr) {
      _.each(arr, function(element) {
        if (Array.isArray(element) == false) {
          storage.push(element);
        } else {
          goThroughArray(element);
        }
      });
      return storage;
    }
    goThroughArray(nestedArray);
    return storage;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var intersection = [];
    args.forEach(function(item) {
      var test = _.every(args, function(arg) {
        return arg.indexOf(item) >= 0;
      });
      if (test) { intersection.push(item) };
    });
    return intersection;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments, 1);
    var difference = [];
    array.forEach(function(item) {
      var test = _.some(args, function(arg) {
        return arg.indexOf(item) >= 0;
      });
      if (!test) { difference.push(item) };
    });
    return difference;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var lastReturn, lastDate = 0, queued = false;
    return function() {
      if (Date.now() - lastDate > wait) {
        lastDate = Date.now();
        lastReturn = func(arguments);
      } else if (!queued) {
        queued = true;
        setTimeout(function() {
          lastReturn = func(arguments);
          queued = false;
          lastDate = Date.now();
        }, wait - Date.now() + lastDate);
      }
      return lastReturn;
    };
  };

}).call(this);
