/*
  API file based on the CRUD api given
*/

/**
 * Main API Class used to send async/await fetch requests
 * All data and status is stored in the class
 * Might change variables to state?
 */
export class API {
  constructor () {
    this.url = 'http://localhost:5005';
    this.status = null;
    this.data = null;
    this.loading = false;
  }

  /**
   * Given a path and parameters, will run and await fetch
   * @param {string} path path for request
   * @param {JSON} options JSON object to send as parameters
   */
  getJSONResponse = async (path, options) => {
    this.loading = true;
    try {
      const response = await fetch(path, options);
      this.status = response.status;
      this.data = await response.json();
      this.loading = false;
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   * All Auth API calls
   */
  /**
   * Given a path and some data,
   * will attempt to send request to path with data
   * @param {string} path auth path
   * @param {JSON} options JSON object with user data
   * @returns JSON Object with response
   */
  adminAuth = async (path, options) => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    }
    await this.getJSONResponse(`${this.url}/admin/auth/${path}`, data);
    return ({ status: this.status, data: this.data, })
  }

  /**
   * All quiz API functions
   */
  getQuizzes = async () => {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      }
    }
    await this.getJSONResponse(`${this.url}/admin/quiz`, data)
    return ({ status: this.status, data: this.data, })
  }

  /**
   * Given a json object with name of new quiz, will create
   * @param {JSON} name Json object with only name
   * @returns Promise
   */
  newQuiz = async (name) => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(name),
    }
    await this.getJSONResponse(`${this.url}/admin/quiz/new`, data)
    return ({ status: this.status, data: this.data, })
  }

  /**
   * Given an id of quiz, will return data associated with quiz
   * @param {string} id id of quiz
   */
  getQuizById = async (id) => {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      }
    }
    await this.getJSONResponse(`${this.url}/admin/quiz/${id}`, data);
    return ({ status: this.status, data: this.data, })
  }

  /**
   * Given an id of quiz, will return data associated with quiz
   * @param {string} id id of quiz
   */
  deleteQuizById = async (id) => {
    const data = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      }
    }
    await this.getJSONResponse(`${this.url}/admin/quiz/${id}`, data);
    return ({ status: this.status, data: this.data, })
  }

  /**
   * Given the id of a quiz, will start it
   * @param {string} id
   * @returns new Data for started quiz
   */
  startQuizById = async (id) => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      }
    }
    await this.getJSONResponse(`${this.url}/admin/quiz/${id}/start`, data);
    // will only run if 200 status
    if (this.status === 200) {
      await (this.getQuizById(id));
    }
    return ({ status: this.status, data: this.data, })
  }

  /**
   * Given the id of a quiz, will stop it
   * @param {string} id
   * @returns new Data for stopped quiz
   */
  stopQuizById = async (id) => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      }
    }
    await this.getJSONResponse(`${this.url}/admin/quiz/${id}/end`, data);
    // will only run if 200 status
    if (this.status === 200) {
      await (this.getQuizById(id));
    }
    return ({ status: this.status, data: this.data, })
  }

  /**
   * Given an id and the new params
   * Will push changes onto server
   * @param {string} id Id of quiz to be edited
   * @param {JSONObject} options Data to be put
   * @returns JSONObject
   */
  editQuizById = async (id, options) => {
    const data = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(options),
    }
    await this.getJSONResponse(`${this.url}/admin/quiz/${id}`, data);
    return ({ status: this.status, data: options, })
  }

  getSessionResults = async (sessionId) => {
    const data = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    }
    await this.getJSONResponse(`${this.url}/admin/session/${sessionId}/results`, data);
    return ({ status: this.status, data: this.data, })
  }

  advanceQuizById = async (id) => {
    const data = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    }
    await this.getJSONResponse(`${this.url}/admin/quiz/${id}/advance`, data);
    return ({ status: this.status, data: this.data, })
  }

  /**
   * All player api
   */
  /**
   * Given a session id will join with given name
   * @param {String} sessionId Id of session to be join
   */
  playerJoin = async (sessionId, name) => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    }
    await this.getJSONResponse(`${this.url}/play/join/${sessionId}`, data)
    return ({ status: this.status, data: this.data, })
  }

  // given a player id, will return whether or not it has started
  playerGetStatus = async () => {
    const data = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }
    await this.getJSONResponse(`${this.url}/play/${String(localStorage.getItem('playerId'))}/status`, data)
    return ({ status: this.status, data: this.data, })
  }

  playerGetQuestion = async () => {
    const data = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }
    await this.getJSONResponse(`${this.url}/play/${String(localStorage.getItem('playerId'))}/question`, data)
    return ({ status: this.status, data: this.data, })
  }

  playerGetResults = async () => {
    const data = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }
    await this.getJSONResponse(`${this.url}/play/${String(localStorage.getItem('playerId'))}/results`, data)
    return ({ status: this.status, data: this.data, })
  }

  playerAddAnswer = async (answers) => {
    const data = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ answerIds: answers }),
    }
    await this.getJSONResponse(`${this.url}/play/${String(localStorage.getItem('playerId'))}/answer`, data)
    return ({ status: this.status, data: this.data, })
  }

  playerGetAnswer = async () => {
    const data = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }
    await this.getJSONResponse(`${this.url}/play/${String(localStorage.getItem('playerId'))}/answer`, data)
    return ({ status: this.status, data: this.data, })
  }
}
