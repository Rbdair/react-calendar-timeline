import 'regenerator-runtime/runtime'
const Enzyme = require('enzyme');
const Adapter = require('@cfaester/enzyme-adapter-react-18'); // Updated to React 18 adapter

Enzyme.configure({ adapter: new Adapter() });

global.console.error = (message) => {
  // mostly related to proptypes errors
  // fail test if app code uses console.error
  throw new Error(message);
};

global.console.warn = (message) => {
  throw new Error(message);
};
