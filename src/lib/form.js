export default class Form {
  constructor(formContainerId, formData) {
    this.container = document.getElementById(formContainerId);
    //Container element from HTML in which you have to add form
    //  seted  formtag attribute
    this.container.setAttribute('method', 'post');
    // this.container.setAttribute('action','other page name');
    this.container.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    // Pass formContainerId to append form element inside of HTML DIV element

    // use formData to create form

    // document.getElementsByTagName("body")[0].appendChild(form);
    // console.log('Form data in form.js', formData);
    this.createForm(formData);
    // this.createForm();
    // this.clickSubmit(formData);
  }
  // form creation CREATEFORM
  // create methods/event to create form/ reset form/ submit form, etc\

  createForm(formData) {
    formData.forEach(element => {
      switch (element.type) {
        case 'textarea':
          this.createTextAreaElement(element);
          break;

        case 'select':
          this.createSelectOptionElement(element);
          break;

        case 'radio':
          this.createRadioElement(element);
          break;

        case 'checkbox':
          this.createCheckBoxElement(element);
          break;

        default:
          this.createInputElement(element);
          break;
      }
    });
  }

  setAttbts(element, elementData) {
    element.setAttribute('type', elementData.type);
    element.style.borderRadius = '0px'
    for (const key in elementData.attr) {
      // console.log(key, elementData.attr[key]);
      if (key === "className")
        element.setAttribute("class", elementData.attr[key])
      else if (key === 'onchange') {
        element.addEventListener(key.slice(2), elementData.attr[key])
      }
      else
        element.setAttribute(key, elementData.attr[key])
    }
  }
  setLabel(elementData) {
    if (elementData.label) {
      const label = document.createElement('label');
      label.innerText = elementData.label;
      if (elementData.attr) {
        if (elementData.attr.id)
          label.setAttribute('for', elementData.attr.id);
      }
      this.container.appendChild(label);
    }

  }
  setRadioCheckBoxes(elementData) {
    elementData.options.forEach((option) => {

      const radioCheckboxElement = document.createElement('input');
      // this.setAttbts(radioTagCreated,elementData);
      if (elementData.type)
        radioCheckboxElement.setAttribute('type', elementData.type);
      if (option.name)
        radioCheckboxElement.setAttribute('name', option.name);
      if (option.value)
        radioCheckboxElement.setAttribute('value', option.value);
      if (option.attr.id)
        radioCheckboxElement.setAttribute('id', option.attr.id);
      if (option.attr.required)
        radioCheckboxElement.setAttribute('required', option.attr.required);
      if (elementData.type == 'radio')
        if (option.value == 'male' || option.value == 'Male' || option.value == 'MALE')
          radioCheckboxElement.setAttribute('checked', true);
      // radioTagCreated.setAttribute('class',option.attr.className);
      this.container.appendChild(radioCheckboxElement);

      const label = document.createElement('label');
      label.setAttribute('for', option.attr.id);
      label.innerText = option.value;
      this.container.appendChild(label);
      // br tag 
      let br = document.createElement('br');
      this.container.appendChild(br);
      //css for spacing
      label.style.marginLeft = '10px';
      label.style.fontWeight = 'normal';
      // radioTagCreated.style.borderRadius='0px'
    })
  }


  createInputElement(elementData) {
    if (elementData.attr) {
      this.setLabel(elementData);
      const element = document.createElement('input');
      //set attribue method
      this.setAttbts(element, elementData);
      this.container.appendChild(element);
      const span = document.createElement('span');
      span.setAttribute('id', elementData.attr.name);
      this.container.appendChild(span);
      const brElement = document.createElement('br');
      this.container.appendChild(brElement);
      if (elementData.attr.hasOwnProperty('onchange')) {
        element.addEventListener('change', (event) => {
          if (event.target.type === 'text') {
            this.errorCreatorInSpan(this, event.target);
          } else if (event.target.type === 'tel') {
            this.errorCreatorInSpan(this, event.target);
          } else if (event.target.type === 'number') {
            this.errorCreatorInSpan(this, event.target);
          } else if (event.target.type === 'email') {
            this.errorCreatorInSpan(this, event.target);
          }
        })
      }
    } else {
      //for hidden tags
      if (elementData.getValue) {
        const element = document.createElement('input');
        element.setAttribute('type', elementData.type);
        if (elementData.unique)
          element.setAttribute('unique', elementData.unique);
        element.setAttribute('getValue', elementData.getValue)
        this.container.appendChild(element);
      } else
        console.error("getValue is not defined");
    }
  }

  createTextAreaElement(elementData) {
    // console.log('textarea');
    this.setLabel(elementData);
    const element = document.createElement('textarea');
    this.setAttbts(element, elementData);
    this.container.appendChild(element);
    const span = document.createElement('span');
    span.setAttribute('id', elementData.attr.name);
    this.container.appendChild(span);
    const brElement = document.createElement('br');
    this.container.appendChild(brElement);
    if (elementData.attr.hasOwnProperty('onchange')) {
      element.addEventListener('change', (event) => {
        this.errorCreatorInSpan(this, event.target);//error
      })
    }
  }
  createSelectOptionElement(elementData) {
    // console.log('select');
    this.setLabel(elementData);
    const selectTagCreated = document.createElement('select');
    //set attribuess method call
    this.setAttbts(selectTagCreated, elementData);
    selectTagCreated.setAttribute('value', elementData.value);
    const selectTag = this.container.appendChild(selectTagCreated);
    // options  adding 
    elementData.options.forEach((option) => {
      const optionTag = document.createElement('option');
      optionTag.innerText = option.innerText;
      optionTag.setAttribute('value', option.value);
      selectTag.appendChild(optionTag);
    })
    // // code for showing selected option Event Lisning
    // const select = document.getElementById(elementData.attr.id);

    // select.addEventListener('change', function() {
    // const selectedOption = select.options[select.selectedIndex];
    // console.log(`Selected option: ${selectedOption.text}, value: ${selectedOption.value}`);
    // });

  }
  createRadioElement(elementData) {
    this.setLabel(elementData);
    // br tag 
    let br = document.createElement('br');
    this.container.appendChild(br);

    this.setRadioCheckBoxes(elementData);


  }
  createCheckBoxElement(elementData) {
    this.setLabel(elementData);
    // br tag 
    let br = document.createElement('br');
    this.container.appendChild(br);

    this.setRadioCheckBoxes(elementData);
  }
  // END FORM CREATION 

  validateFormData(tempData, formData) {
    const requiredFields = [];
    formData.forEach((obj) => {
      if (obj.attr) {
        if (obj.attr.required) {
          // console.log(obj.attr.required,'required');
          requiredFields[requiredFields.length] = obj.key;
        }
      }
      if (obj.type === 'radio') {
        if (obj.options) {
          let tempName;
          obj.options.forEach((opt) => {
            if (opt.attr) {
              if (opt.attr.required) {
                tempName = obj.key;
              }
            }
          })
          requiredFields[requiredFields.length] = tempName;
        }
      }
    })
    const validData = {};
    for (let key of requiredFields) {
      const genNameObj = {}
      formData.forEach((eachElemnt) => {
        if (eachElemnt.type === 'radio') {
          if (eachElemnt.options) {
            eachElemnt.options.forEach((opt) => {
              // genType.push(opt.name);
              genNameObj[opt.name] = opt.name;
            });
          }
        }
      })
      for (const gen in genNameObj) {
        const genList = document.getElementsByName(gen);
        genList.forEach(genElemnt => {
          if (genElemnt.checked) {
            if (key == genElemnt.name) {
              const radioBtn = document.getElementById(genElemnt.id);
              if (radioBtn.checked) {
                validData[key] = radioBtn.value;
              }
            } else {
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
    if (Object.keys(validData).length === 0) {
      return undefined
    } else if (Object.keys(validData).length === requiredFields.length) {
      return { ...validData, ...tempData }
    }


  }

  getFormData(formData) {
    const tempData = {};

    formData.forEach((element) => {
      if (element && element.type === 'hidden') {
        if (element.hasOwnProperty('getValue')) {
          const submitBtn = document.querySelector("input[type='submit']");
          if (submitBtn) {
            const createdAt = submitBtn.getAttribute('createdAt');
            const userId = submitBtn.getAttribute('userId');
            if (createdAt && userId) {
              tempData['createdAt'] = createdAt;
              tempData['userId'] = userId;
            }
          }
          tempData[element.key] = element.getValue(tempData);
        } else {
          console.error('getValue is not defined');
        }
      }
      // tempData[element.key]=document.getElementById(element.attr?.id)?.value.trim();; 
      // for inputs  text area type data
      if (element && element.attr) {
        if (element.type != 'submit') {
          if (element.type != 'reset') {
            //  tempData[element.key]= document.getElementById(element.attr.id).value.trim();  
            if (element.type == 'text') {
              const validValue = this.validateText(document.getElementById(element.attr.id).value.trim(), element.attr.id);
              if (validValue) { tempData[element.key] = validValue; }
            } else if (element.type == 'tel') {
              const validValue = this.validateTel(document.getElementById(element.attr.id).value.trim(), element.attr.id);
              if (validValue) { tempData[element.key] = validValue; };
            } else if (element.type == 'number') {
              const validValue = this.validateNumber(document.getElementById(element.attr.id).value.trim(), element.attr.id);
              if (validValue) { tempData[element.key] = validValue; }
            } else if (element.type == 'email') {
              const validValue = this.validateEmail(document.getElementById(element.attr.id).value.trim(), element.attr.id);
              if (validValue) { tempData[element.key] = validValue; }
            } else if (element.type == 'textarea') {
              const validValue = this.validateTextarea(document.getElementById(element.attr.id).value.trim(), element.attr.id);
              if (validValue) { tempData[element.key] = validValue; }
            } else {//select
              tempData[element.key] = document.getElementById(element.attr.id).value.trim();
            }

          }
        }
      }//radio
      if (element && element.options) {
        element.options.forEach((optionID) => {
          if (optionID.attr) {
            const option = document.getElementById(optionID.attr.id);
            if (option.checked) {
              tempData[element.key] = option.value;
            }
          }
        })
      }
      if (element && element.type === 'checkbox') {
        const hobbies = [];
        element.options.forEach((optionID) => {
          if (optionID.attr) {
            const option = document.getElementById(optionID.attr.id);
            if (option.checked) {
              hobbies.push(option.value);
            }
          }
        })
        tempData[element.key] = hobbies;
      }

    });


    // console.log(tempData);
    const validData = this.validateFormData(tempData, formData);
    if (validData) {
      return validData
    }

  }
  removeAttr() {
    const submitBtn = document.querySelector("input[type='submit']");
    if (submitBtn) {
      submitBtn.removeAttribute('createdAt');
      submitBtn.removeAttribute('userId');
    }
  }

  setFormData(formData, selectedRow) {
    for (const element of formData) {
      if (element && element.attr) {
        if (element.type != 'submit') {
          if (element.type != 'reset') {
            document.getElementById(element.attr.id).value = selectedRow[element.key];
          }
        }
      }//radio
      if (element && element.options) {
        for (const optionID of element.options) {
          if (optionID.attr) {
            const radio = document.getElementById(optionID.attr.id);
            if (radio.value === selectedRow[element.key]) {
              radio.checked = true;
            } else
              radio.checked = false;
          }
        }
      }
      if (element && element.type === 'checkbox') {
        for (const optionID of element.options) {
          if (optionID.attr) {
            for (const checkbox of selectedRow[element.key]) {
              const option = document.getElementById(optionID.attr.id);
              if (option.value == checkbox) {
                option.checked = true;
              }
            }
          }
        }
      }
      // console.log(selectedRow);
      if (element && element.type === 'hidden') {
        if (element.hasOwnProperty('getValue')) {
          selectedRow[element.key] = element.getValue(selectedRow);
          // console.log(selectedRow.userId,'id and creted at',selectedRow.createdAt);
          const submitBtn = document.querySelector("input[type='submit']");
          submitBtn.setAttribute('createdAt', selectedRow.createdAt);
        } else {
          console.error('getValue is not defined');
        }
      }
    }
  }

  validationMobile(phoneNoOrignal) {
    const len = phoneNoOrignal.length;
    if (len == 0) {
      return '';
    }
    else if (/^[6789]\d{9}$/.test(phoneNoOrignal)) {
      return phoneNoOrignal;
    }
    else {
    }
  }

  validateText(name, elementId) {
    if (/^[a-zA-Z0-9\s]{3,}$/.test(name.trim())) {
      document.getElementById(elementId).style = "";
      // console.log(event);
      return name;
    } else {
      document.getElementById(elementId).style = "border : 2px red solid"
    }
  }
  validateTel(number, elementId) {
    if (/^[6789]\d{9}$/.test(number.trim())) {
      document.getElementById(elementId).style = "";
      return number
    }
    else {
      document.getElementById(elementId).style = "border : 2px red solid"
    }
  }
  validateNumber(number, elementId) {
    if (/^[0-9\s]{6,}$/.test(number.trim())) {
      document.getElementById(elementId).style = "";
      return number
    } else {
      document.getElementById(elementId).style = "border : 2px red solid"
    }
  }
  validateEmail(email, elementId) {
    if (/^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(email.trim())) {
      document.getElementById(elementId).style = "";
      return email
    } else {
      document.getElementById(elementId).style = "border : 2px red solid"
    }
  }
  validateTextarea(textarea, elementId) {
    if (/^[a-zA-Z0-9\s]{4,}$/.test(textarea.trim())) {
      document.getElementById(elementId).style = "";
      return textarea
    } else {
      document.getElementById(elementId).style = "border : 2px red solid"
    }
  }
  errorCreatorInSpan(frm, elementTag) {
    let validData;
    let message;
    if (elementTag.type === 'text') {
      validData = frm.validateText(elementTag.value.trim(), elementTag.id);
      message = 'Properly';
    } else if (elementTag.type === 'tel') {
      validData = frm.validateTel(elementTag.value.trim(), elementTag.id);
      message = 'Properly and number starts with 6-7-8-9'
    } else if (elementTag.type === 'number') {
      validData = frm.validateNumber(elementTag.value.trim(), elementTag.id);
      message = 'Properly It Should Be Number and Min 6'
    } else if (elementTag.type === 'email') {
      validData = frm.validateEmail(elementTag.value.trim(), elementTag.id);
      message = 'Properly';
    } else if (elementTag.type === 'textarea') {
      validData = frm.validateTextarea(elementTag.value.trim(), elementTag.id);
      message = 'Properly Min 4 Char'
    }
    const inputElement = document.getElementById(elementTag.id);
    const spanElement = inputElement.nextElementSibling;
    spanElement.style.color = 'red';
    if (spanElement.nextElementSibling !== '<br>') {
      document.createElement('br');
    } else { spanElement.parentElement.insertBefore('<br>', spanElement.nextSibling); }
    spanElement.textContent = ` ${elementTag.placeholder} ${message}`;
    if (validData) { spanElement.style.display = 'none'; }
    else { spanElement.style.display = 'inline'; }
  }
}
