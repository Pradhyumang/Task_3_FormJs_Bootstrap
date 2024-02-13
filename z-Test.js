// // //using FUNCTION
// // function EventEmitter() {
// //     this.events = {};
// //   }
  
// //   EventEmitter.prototype.on = function(event, listener) {
// //     if (!this.events[event]) {
// //       this.events[event] = [];
// //     }
// //     this.events[event].push(listener);
// //   };
  
// //   EventEmitter.prototype.emit = function(event, ...args) {
// //     if (this.events[event]) {
// //       this.events[event].forEach(listener => {
// //         listener(...args);
// //       });
// //     }
// //   };
  
// //   // Example usage:
// //   const emitter = new EventEmitter();
  
// //   emitter.on('data', (data) => {
// //     console.log('Received data:', data);
// //   });
  
// //   // Emitting event
// //   emitter.emit('data', 'Hello World');
  


// //   using CLASSESS
// class EventEmitter {
//     constructor() {
//       this.events = {};
//     }
  
//     on(event, listener) {
//       if (!this.events[event]) {
//         this.events[event] = [];
//       }
//       this.events[event].push(listener);
//     }
  
//     emit(event, ...args) {
//       if (this.events[event]) {
//         this.events[event].forEach(listener => {
//           listener(...args);
//         });
//       }
//     }
//   }
  
//   // Example usage:
//   const emitter = new EventEmitter();
  
//   emitter.on('data', (data) => {
//     console.log('Received data:', data);
//   });
  
//   // Emitting event
//   emitter.emit('data', 'Hello World');
  








// select 
// document.write( `<select id="my-select">
// <option value="apple">Apple</option>
// <option value="banana">Banana</option>
// <option value="cherry">Cherry</option>
// </select>

// <script>
// const select = document.getElementById('my-select');

// select.addEventListener('change', function() {
// const selectedOption = select.options[select.selectedIndex];
// console.log(\`Selected option: \${selectedOption.text}, value: \${selectedOption.value}\`);
// });
// </script>`)




// //   <label for="txtName1">Name</label><br>
// //   <input 
// //   type="text" 
// //   id="txtName1" 
// //   class="form-control textInput"
// //   placeholder='Enter name'
// //   name="txtName" 
// //   required
// //   onchange="function1()"
// //    />
// //   <br>

// document.write(`<select>
// <optgroup label="Fruits">
//   <option value="apple">Apple</option>
//   <option value="banana">Banana</option>
// </optgroup>
// <optgroup label="Vegetables">
//   <option value="carrot">Carrot</option>
//   <option value="spinach">Spinach</option>
// </optgroup>
// </select>`)

