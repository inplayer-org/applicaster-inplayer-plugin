class Session {
  constructor() {
    if (!Session.instance) {
      Session.instance = this;
    }

    return Session.instance;
  }

  isHomeScreen = null;

  appLaunch = true;

  isSkipped = null;
}

const session = new Session();

export default session;
