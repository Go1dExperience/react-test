This project was based on "All-In-One Angular, React & Node Course  Airbnb Style App" course: https://github.com/Jerga99/bwm-react

It uses MERN stack.
  On React part:

    1. It is rewritten in funtional component, complete with React Hooks, SCSS, various dependencies such as React-toastify, React-responsive-modal, React-image-crop... to make the app look nicer and more responsive.

    2. It includes basic level of React, such as React-redux, Redux-form, React-router-dom, axios-service... to help getting used to React.

    3. The funtional component requires rewriting a lot of the codes, since the instruction uses class-base components. Among many differences, one can get familiar to React hooks, and how it simplifies many problems class components have

      Exp: useState hooks can replace componentDidMount, componentDidUpdate, and componentWillUnmount, which makes the code a lot shorter

  On Node.js, express.js, mongoDb:

    1. Using jwt(json web token) system for logging in, and keep a user logged in after refreshing the page.

    2. Every request comes with a token, to make sure only authorized user can perform that action.

    3. It uses online database of mongodb.

    3. To store an image, it uses aws, and communicates with it using multer, multer.s3
      
