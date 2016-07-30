/******/ (function(modules) { // webpackBootstrap
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
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

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

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(2);

	var _reactRouter = __webpack_require__(3);

	var _routes = __webpack_require__(4);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var express = __webpack_require__(21);
	var path = __webpack_require__(22);
	var router = __webpack_require__(23);
	var mongoose = __webpack_require__(25);
	var app = express();

	// React


	// Middleware modules
	var jsonParser = __webpack_require__(26).json;
	var logger = __webpack_require__(27);

	if (process.env.NODE_ENV = 'production') {
	  app.use('/', express.static(path.join(__dirname, '../public')));
	}

	app.use(logger('dev'));
	app.use(jsonParser());

	mongoose.Promise = Promise;
	mongoose.connect('mongodb://localhost:27017/qa');
	var db = mongoose.connection;

	db.on('error', function (err) {
	  return console.log('connection errror: ' + err);
	});
	db.once('open', function () {
	  return console.log('db connection successful');
	});

	app.use(function (req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Headers, Body');
	  if (req.method === 'OPTIONS') {
	    res.header('Access-Control-Header-Methods', 'PUT, POST, DELETE, OPTIONS');
	    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, OPTIONS');
	    return res.status(200).json({});
	  }
	  next();
	});

	app.use('/api/questions', router);

	app.get('*', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	    res.send(renderPage(appHtml));
	  });
	});

	function renderPage(html) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8 />\n    <title>Question and Answer App</title>\n    <div id="app">' + html + '</div>\n    <script src="/bundle.js"></script>\n  ';
	}

	app.use(function (req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	app.use(function (err, req, res, next) {
	  res.status(err.status || 500);
	  res.json({
	    error: {
	      message: err.message
	    }
	  });
	});

	var port = process.env.PORT || 3000;

	app.listen(port, function () {
	  console.log('The server is running on ' + port);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _Logo = __webpack_require__(5);

	var _Logo2 = _interopRequireDefault(_Logo);

	var _Questions = __webpack_require__(8);

	var _Questions2 = _interopRequireDefault(_Questions);

	var _QuestionWithAnswers = __webpack_require__(16);

	var _QuestionWithAnswers2 = _interopRequireDefault(_QuestionWithAnswers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { component: _Logo2.default },
	  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Questions2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/questions/:qId', components: _QuestionWithAnswers2.default })
	);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(6);
	exports.default = _react2.default.createClass({
	  displayName: 'Logo',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        _reactRouter.IndexLink,
	        { to: '/' },
	        _react2.default.createElement('img', { className: 'logo', src: '/images/logo-1.svg' })
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _config = __webpack_require__(9);

	var _config2 = _interopRequireDefault(_config);

	var _QuestionForm = __webpack_require__(10);

	var _QuestionForm2 = _interopRequireDefault(_QuestionForm);

	var _QuestionList = __webpack_require__(12);

	var _QuestionList2 = _interopRequireDefault(_QuestionList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Questions',
	  getInitialState: function getInitialState() {
	    return { data: [], message: '' };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    var url = _config2.default.API_BASE + '/questions';
	    var request = new XMLHttpRequest();

	    request.onreadystatechange = function () {
	      if (request.readyState === 4 && request.status < 400) {
	        _this.setState({ data: JSON.parse(request.responseText) });
	      }
	    };
	    request.onerror = function (res) {
	      _this.setState({ data: res });
	    };
	    request.open('GET', url);
	    request.send(null);
	  },
	  handleQuestionSubmit: function handleQuestionSubmit(question) {
	    var url = _config2.default.API_BASE + '/questions';
	    var request = new XMLHttpRequest();

	    request.onload = function (res) {
	      var _this2 = this;

	      if (request.readyState === 4 && request.status < 400) {
	        (function () {
	          var questions = _this2.state.data;
	          var newQuestion = JSON.parse(request.responseText);
	          fetch(url).then(function (res) {
	            return res.json();
	          }).then(function (question) {
	            return _this2.setState({ data: questions });
	          });
	        })();
	      }
	    }.bind(this);

	    request.open('POST', url);
	    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	    request.send(JSON.stringify(question));

	    var questions = this.state.data;
	    question._id = Date.now();
	    var newQuestions = [question].concat(questions);
	    this.setState({ data: newQuestions });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'questions' },
	      _react2.default.createElement(
	        'h1',
	        { className: 'title' },
	        'Code Q&A'
	      ),
	      _react2.default.createElement(_QuestionForm2.default, { onQuestionSubmit: this.handleQuestionSubmit }),
	      _react2.default.createElement(_QuestionList2.default, { data: this.state.data })
	    );
	  }
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  API_BASE: 'http://localhost:3000/api'
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _config = __webpack_require__(9);

	var _config2 = _interopRequireDefault(_config);

	var _utility = __webpack_require__(11);

	var _utility2 = _interopRequireDefault(_utility);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'QuestionForm',

	  getInitialState: function getInitialState() {
	    return { question: '' };
	  },

	  handleQuestionChange: function handleQuestionChange(e) {
	    _utility2.default.toggleDisableSubmit(e, 'q-submit');
	    this.setState({ question: e.target.value });
	  },
	  handleSubmit: function handleSubmit(e) {
	    e.preventDefault();
	    var question = this.state.question.trim();
	    if (!question) return;

	    // submit form
	    this.props.onQuestionSubmit({ text: question });
	    // reset form state
	    this.setState({ question: '' });
	  },


	  render: function render() {
	    return _react2.default.createElement(
	      'form',
	      { className: 'question-form', onSubmit: this.handleSubmit },
	      _react2.default.createElement('input', { type: 'text',
	        className: 'question-input',
	        value: this.state.question,
	        onChange: this.handleQuestionChange,
	        placeholder: 'What\'s your question?' }),
	      _react2.default.createElement('input', { id: 'q-submit', type: 'submit', value: 'Ask', disabled: true })
	    );
	  }
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  toggleDisableSubmit: function toggleDisableSubmit(event, submitId) {
	    var submit = document.getElementById(submitId);
	    if (!!event.target.value) {
	      submit.removeAttribute('disabled');
	    } else {
	      submit.setAttribute('disabled', 'disabled');
	    }
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Question = __webpack_require__(13);

	var _Question2 = _interopRequireDefault(_Question);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(6);
	exports.default = _react2.default.createClass({
	  displayName: 'QuestionList',

	  render: function render() {
	    var questionNodes = this.props.data.map(function (question) {
	      return _react2.default.createElement(_Question2.default, { text: question.text,
	        createdAt: question.createdAt,
	        id: question._id,
	        key: question._id });
	    });
	    return _react2.default.createElement(
	      'div',
	      { className: 'questionList' },
	      _react2.default.createElement(
	        'h2',
	        { className: 'questions-title' },
	        'Top Questions'
	      ),
	      questionNodes
	    );
	  }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _moment = __webpack_require__(14);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(6);

	//import avatar from '../../public/images/avatar.png'
	var avatar = __webpack_require__(15);

	exports.default = _react2.default.createClass({
	  displayName: 'Question',
	  render: function render() {
	    var createdAt = (0, _moment2.default)(this.props.createdAt).format('MMM Do, YYYY');
	    // Need to get the question id for route
	    var route = '/questions/' + this.props.id;
	    return _react2.default.createElement(
	      'div',
	      { className: 'question' },
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: route },
	        _react2.default.createElement('img', { src: avatar, className: 'avatar' }),
	        _react2.default.createElement(
	          'span',
	          { className: 'question-text' },
	          this.props.text
	        ),
	        _react2.default.createElement(
	          'span',
	          { className: 'question-date' },
	          'Asked on ',
	          createdAt,
	          ' '
	        )
	      )
	    );
	  }
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _config = __webpack_require__(9);

	var _config2 = _interopRequireDefault(_config);

	var _AnswerForm = __webpack_require__(17);

	var _AnswerForm2 = _interopRequireDefault(_AnswerForm);

	var _AnswerList = __webpack_require__(18);

	var _AnswerList2 = _interopRequireDefault(_AnswerList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'QuestionWithAnswers',

	  childContextTypes: {
	    location: _react2.default.PropTypes.string
	  },

	  getChildContext: function getChildContext() {
	    return { location: this.props.location.pathname };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      question: '',
	      createAt: '',
	      answers: [],
	      answerBaseUrl: _config2.default.API_BASE + '/questions/' + this.props.params.qId
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.fetchAnswers(this.state.answerBaseUrl);
	  },
	  handleAnswerSubmit: function handleAnswerSubmit(answer) {
	    var _this = this;

	    var url = this.state.answerBaseUrl + '/answers';
	    fetch(this.state.answerBaseUrl + '/answers', {
	      method: 'POST',
	      mode: 'cors',
	      headers: {
	        "Content-type": "application/json; charset=UTF-8"
	      },
	      body: JSON.stringify(answer)
	    }).then(function (res) {
	      return res.json();
	    }).then(function (answer) {
	      return _this.fetchAnswers(_this.state.answerBaseUrl);
	    });
	  },
	  fetchAnswers: function fetchAnswers(url) {
	    var _this2 = this;

	    fetch(url).then(function (res) {
	      return res.json();
	    }).then(function (question) {
	      _this2.setState({
	        question: question.text,
	        createdAt: question.createdAt,
	        answers: question.answers
	      });
	    });
	  },
	  deleteAnswer: function deleteAnswer(url) {
	    var _this3 = this;

	    var id = url.slice(url.lastIndexOf('/') + 1);
	    var newAnswers = this.state.answers.map(function (answer) {
	      return answer.id === id;
	    });

	    fetch(url, {
	      method: 'DELETE',
	      mode: 'cors',
	      headers: {
	        "Content-Type": "application/json; charset=UTF-8"
	      }
	    }).then(function (res) {
	      return res.json();
	    }).then(function (question) {
	      return _this3.setState({ answers: question.answers });
	    }).catch(function (e) {
	      return console.log('There was a problem deleting your answer: ' + e);
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h2',
	        { className: 'questions-title' },
	        this.state.question
	      ),
	      _react2.default.createElement(_AnswerList2.default, { data: this.state.answers, 'delete': this.deleteAnswer }),
	      _react2.default.createElement(_AnswerForm2.default, { onSubmit: this.handleAnswerSubmit })
	    );
	  }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _config = __webpack_require__(9);

	var _config2 = _interopRequireDefault(_config);

	var _utility = __webpack_require__(11);

	var _utility2 = _interopRequireDefault(_utility);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'AnswerForm',
	  getInitialState: function getInitialState() {
	    return { answer: '' };
	  },
	  handleAnswerChange: function handleAnswerChange(e) {
	    _utility2.default.toggleDisableSubmit(e, 'a-submit');
	    this.setState({ answer: e.target.value });
	  },
	  handleSubmit: function handleSubmit(e) {
	    e.preventDefault();
	    var answer = this.state.answer.trim();
	    if (!answer) return;

	    this.props.onSubmit({ text: answer });

	    this.setState({ answer: '' });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'answer-form' },
	      _react2.default.createElement(
	        'h3',
	        null,
	        'Add an answer'
	      ),
	      _react2.default.createElement(
	        'form',
	        { onSubmit: this.handleSubmit },
	        _react2.default.createElement('textarea', { value: this.state.answer,
	          onChange: this.handleAnswerChange,
	          placeholder: 'Your answer...' }),
	        _react2.default.createElement('input', { id: 'a-submit', type: 'submit', value: 'Post Answer', disabled: true })
	      )
	    );
	  }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Answer = __webpack_require__(19);

	var _Answer2 = _interopRequireDefault(_Answer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'AnswerList',

	  render: function render() {
	    var _this = this;

	    var answerNodes = this.props.data.map(function (answer) {
	      return _react2.default.createElement(_Answer2.default, { answerText: answer.text,
	        upVotes: answer.upVotes,
	        createdAt: answer.createdAt,
	        updatedAt: answer.updatedAt,
	        id: answer._id,
	        'delete': _this.props.delete,
	        key: answer._id });
	    });

	    return _react2.default.createElement(
	      'div',
	      { className: 'answerList' },
	      answerNodes
	    );
	  }
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Vote = __webpack_require__(20);

	var _Vote2 = _interopRequireDefault(_Vote);

	var _config = __webpack_require__(9);

	var _config2 = _interopRequireDefault(_config);

	var _moment = __webpack_require__(14);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(6);
	exports.default = _react2.default.createClass({
	  displayName: 'Answer',
	  getInitialState: function getInitialState() {
	    return {
	      readingAnswer: true,
	      answerUrl: '' + _config2.default.API_BASE + this.context.location + '/answers/' + this.props.id,
	      // Used to initialize answerText so it can be updated
	      answerText: this.props.answerText,
	      // Used to initialize updatedAt so it can be updated
	      updatedAt: this.props.updatedAt
	    };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    if (!this.state.readingAnswer) {
	      document.getElementById('new-answer').focus();
	    }
	  },


	  contextTypes: {
	    location: _react2.default.PropTypes.string
	  },

	  handleVote: function handleVote(dir) {
	    fetch(this.state.answerUrl + '/vote-' + dir, {
	      method: 'POST',
	      mode: 'cors',
	      headers: {
	        "Content-type": "application/json; charset=UTF-8"
	      },
	      body: JSON.stringify({ text: this.state.answerText })
	    }).then(function (response) {
	      return response.json();
	    }).then(function (result) {
	      console.log('I voted: ');console.log(result);
	    }).catch(function (e) {
	      return console.log('There was an error with your post: ' + e.name + '--' + e.message);
	    });
	  },
	  handleAnswerClick: function handleAnswerClick(e) {
	    this.setState({ readingAnswer: false });
	  },
	  handleNewAnswerChange: function handleNewAnswerChange(e) {
	    if (!e.target.value) {
	      throw new Error('You must have something for an answer');
	    }
	    this.setState({ answerText: e.target.value });
	  },
	  updateAnswer: function updateAnswer(e) {
	    e.preventDefault();
	    if (!e.target.value) {
	      e.target.focus();
	      throw new Error('Cannot submit an empty answer. Please enter some text');
	    }

	    this.setState({ readingAnswer: true });

	    if (e.target.value.trim() !== this.props.answerText) {
	      this.setState({ updatedAt: new Date() });

	      fetch(this.state.answerUrl, {
	        method: 'PUT',
	        mode: 'cors',
	        headers: {
	          "Content-Type": "application/json; charset=UTF-8"
	        },
	        body: JSON.stringify({ text: this.state.answerText.trim() })
	      }).catch(function (e) {
	        return console.log('There was an error saving your new answer: ' + e.name + '--' + e.message);
	      });
	    }
	  },
	  deleteAnswer: function deleteAnswer() {
	    this.props.delete(this.state.answerUrl);
	  },
	  render: function render() {
	    var createdAt = (0, _moment2.default)(this.props.createdAt).format('MMM Do, YYYY') + ' at ' + (0, _moment2.default)(this.props.createdAt).format('h:mm a');
	    var updatedAt = (0, _moment2.default)(this.state.updatedAt).format('MMM Do, YYYY') + ' at ' + (0, _moment2.default)(this.state.updatedAt).format('h:mm a');

	    var readText = _react2.default.createElement(
	      'span',
	      { className: 'answer-text', title: 'Click to edit this answer', onClick: this.handleAnswerClick },
	      this.state.answerText
	    );
	    var writeText = _react2.default.createElement(
	      'form',
	      { onSubmit: this.updateAnswer },
	      _react2.default.createElement('input', { type: 'text',
	        id: 'new-answer',
	        value: this.state.answerText,
	        placeholder: 'Your answer...',
	        onChange: this.handleNewAnswerChange,
	        onBlur: this.updateAnswer })
	    );

	    var answerText = this.state.readingAnswer ? readText : writeText;

	    return _react2.default.createElement(
	      'div',
	      { className: 'answer' },
	      _react2.default.createElement(_Vote2.default, { votes: this.props.upVotes, handleVote: this.handleVote }),
	      answerText,
	      _react2.default.createElement('input', { type: 'button', onClick: this.deleteAnswer, value: 'Delete' }),
	      _react2.default.createElement(
	        'div',
	        { className: 'answer-dates' },
	        'Answered: ',
	        createdAt,
	        ' ',
	        _react2.default.createElement(
	          'span',
	          null,
	          '|'
	        ),
	        ' Modified: ',
	        updatedAt
	      )
	    );
	  }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(6);
	exports.default = _react2.default.createClass({
	  displayName: 'Vote',
	  getInitialState: function getInitialState() {
	    return {
	      votes: this.props.votes
	    };
	  },
	  handleUpvote: function handleUpvote() {
	    this.setState({ votes: this.state.votes += 1 });
	    this.props.handleVote('up');
	  },
	  handleDownvote: function handleDownvote() {
	    this.setState({ votes: this.state.votes -= 1 });
	    this.props.handleVote('down');
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'vote-toggle' },
	      _react2.default.createElement('i', { className: 'fa fa-angle-up',
	        'aria-hidden': 'true', onClick: this.handleUpvote }),
	      _react2.default.createElement(
	        'span',
	        { className: 'vote-total' },
	        this.state.votes
	      ),
	      _react2.default.createElement('i', { className: 'fa fa-angle-down',
	        'aria-hidden': 'true', onClick: this.handleDownvote })
	    );
	  }
	});

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(21);
	var router = express.Router();
	var Question = __webpack_require__(24).Question;

	var mongoose = __webpack_require__(25);
	mongoose.Promise = Promise;

	router.param('qId', function (req, res, next, id) {
	  Question.findById(req.params.qId).exec().catch(function (err) {
	    return next(err);
	  }).then(function (doc) {
	    if (!doc) {
	      var err = new Error('Not Found');
	      err.status = 404;
	      return next(err);
	    }
	    req.question = doc;
	    next();
	  });
	});

	router.param('aId', function (req, res, next, id) {
	  req.answer = req.question.answers.id(id);
	  if (!req.answer) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	  }
	  next();
	});

	// GET /questions
	// Route for collection of questions
	router.get('/', function (req, res) {
	  Question.find({}).sort({ createdAt: -1 }).exec(function (err, questions) {
	    if (err) return next(err);
	    res.json(questions);
	  });
	});

	// POST /questions
	// Route for creating questions
	router.post('/', function (req, res, next) {
	  var question = new Question(req.body);
	  question.save().catch(function (err) {
	    return next(err);
	  }).then(function (question) {
	    res.status(201);
	    res.json(question);
	  });
	});

	// GET /questions/:id
	// Route for specific questions
	router.get('/:qId', function (req, res, next) {
	  res.json(req.question);
	});

	// POST /questions/:id/answers
	// Route for creating answers to a question
	router.post('/:qId/answers', function (req, res, next) {
	  console.log(req.body);
	  req.question.answers.push(req.body);
	  req.question.save().catch(function (err) {
	    return next();
	  }).then(function (question) {
	    res.status(201);
	    res.json(question);
	  });
	});

	// PUT /questions/:id/answers/:id
	// Route for updating an answer
	router.put('/:qId/answers/:aId', function (req, res, next) {
	  console.log(req.body);
	  req.answer.update(req.body, function (err, result) {
	    if (err) return next(err);
	    res.json(result);
	  });
	});

	// DELETE /questions/:id/answers/:id
	// Route for deleting an answer
	router.delete('/:qId/answers/:aId', function (req, res) {
	  req.answer.remove(function (err) {
	    req.question.save().catch(function (err) {
	      return next(err);
	    }).then(function (question) {
	      return res.json(question);
	    });
	  });
	});

	// POST /questions/:id/answers/:id/vote-up
	// POST /questions/:id/answers/:id/vote-down
	// Vote on a specific an answer
	router.post('/:qId/answers/:aId/vote-:dir', function (req, res, next) {
	  if (req.params.dir.search(/^(up|down)$/) === -1) {
	    var err = new Error('Not Found using ' + req.params.dir);
	    err.status = 404;
	    next(err);
	  } else {
	    next();
	  }
	}, function (req, res, next) {
	  req.answer.vote(req.params.dir, function (err, result) {
	    if (err) return next(err);
	    res.json(result);
	  });
	});

	module.exports = router;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(25);
	var Schema = mongoose.Schema;

	var sortAnswers = function sortAnswers(a, b) {
	  if (a.votes === b.votes) {
	    return b.updatedAt - a.updatedAt;
	  }
	  return b.votes - a.votes;
	};

	var AnswerSchema = new Schema({
	  text: String,
	  createdAt: { type: Date, default: Date.now },
	  updatedAt: { type: Date, default: Date.now },
	  upVotes: { type: Number, default: 0 }
	});

	AnswerSchema.method('update', function (updates, callback) {
	  Object.assign(this, updates, { updatedAt: new Date() });
	  this.parent().save(callback);
	});

	AnswerSchema.method('vote', function (vote, callback) {
	  if (vote === 'up') {
	    this.upVotes++;
	  } else {
	    this.upVotes--;
	  }
	  this.parent().save(callback);
	});

	var QuestionSchema = new Schema({
	  text: String,
	  createdAt: { type: Date, default: Date.now },
	  answers: [AnswerSchema]
	});

	QuestionSchema.pre('save', function (next) {
	  if (this.answers) {
	    this.answers.sort(sortAnswers);
	  }
	  next();
	});

	var Question = mongoose.model('Question', QuestionSchema);

	module.exports.Question = Question;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ }
/******/ ]);