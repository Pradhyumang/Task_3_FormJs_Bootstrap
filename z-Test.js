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


// form validation gender
 // if (genElemnt.checked) {
          //   if(key==genElemnt.name) {
          //       formData.forEach((obj)=>{
          //         if (obj.type=='radio') {
          //           obj.options.forEach((option)=>{
          //             const radioBtn=document.getElementById(option.attr.id);
          //             if(radioBtn.checked)
          //             {
          //               // console.log(radioBtn.value);
          //               console.log('@key :',key,'@value...',radioBtn.value);
          //               validData[key] =radioBtn.value;
                        
          //             }
          //           })
          //         }
                  
          //       })
          //   }else{
          //     if (!tempData[key]) {
          //       return undefined;
          //      }
          //       else
          //       validData[key] = tempData[key];
          //   }
          // }


        //  call form datavalidation 
        const validData= this.validateFormData(tempData,formData);
        if (validData) {
          console.log('returning data OBJ to use in local staorage');
          return validData
        }
        // form datavalidation
        validateFormData(tempData,formData)
        {
            const requiredFields = [];
            formData.forEach((obj)=>{ 
              if (obj.attr) {
                if (obj.attr.required) {
                  // console.log(obj.attr.required,'required');
                  requiredFields[requiredFields.length]=obj.attr.id;
                }
              }
              if (obj.type==='radio') {
                if (obj.options) {
                  let tempName;
                  obj.options.forEach((obj)=>{
                    if (obj.attr) {
                      if (obj.attr.required) {
                       tempName=obj.name;
                      }
                    }
                  })
                  requiredFields[requiredFields.length]=tempName;
                }
              }else if(obj.type==='checkbox'){
                if (obj.options) {
                  obj.options.forEach((obj)=>{
                    if (obj.attr) {
                      if (obj.attr.required) {
                        requiredFields[requiredFields.length]=obj.attr.id;
                      }
                    }
                  })
                }
              }
              
            })
            //required field done getting in array completes here
        
            // for (let key in tempData){
            //   requiredFields[requiredFields.length]=key;
            // }
            // console.log(requiredFields);
            // let id;
            // formData.forEach((elementData)=>{
            //   if (elementData.hasOwnProperty('getValue')) {
            //     document.getElementsByTagName('')
            //     element.addEventListener('change', (event)=> {
            //       console.log('texst erer', event, elementData)
            //     })
            //   }
            // })
             
            // console.log(id);
        
            const validData = {};
        
            for (let key of requiredFields) {
              const genNameObj={}
              formData.forEach((eachElemnt)=>{
                if (eachElemnt.type==='radio') {
                  if (eachElemnt.options) {
                    eachElemnt.options.forEach((opt)=>{
                      // genType.push(opt.name);
                      genNameObj[opt.name]=opt.name;
                    });
                  }
                }
              })
              for (const gen in genNameObj) {
                const genList=document.getElementsByName(gen);
                genList.forEach(genElemnt=>{
                  if (genElemnt.checked) {
                    if (key == genElemnt.name) {
                        const radioBtn = document.getElementById(genElemnt.id);
                        if (radioBtn.checked) {
                            validData[key] = radioBtn.value;
                        }
                    }else{
                      if (!tempData[key]) {
                        return undefined;
                       }
                        else
                        validData[key] = tempData[key];
                    }
                }
                })
              }  
            }
              if (Object.keys(validData).length==0) {
                return undefined
              }else if(Object.keys(validData).length==requiredFields.length)
              { //console.log(Object.keys(validData).length,Object.keys(tempData).length);
                return {...validData,...tempData}
              }
               
                   
           }