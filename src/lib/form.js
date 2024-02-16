export default class Form {
  constructor(formContainerId, formData) {
    this.container = document.getElementById(formContainerId); 
    //Container element from HTML in which you have to add form
            //  seted  formtag attribute
    this.container.setAttribute('method','post');
    // this.container.setAttribute('action','other page name');
    this.container.addEventListener('submit', function(event) {
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
  // getElementsById(ID){
  //   return document.getElementById(ID);//?''
  // }
  createForm(formData)
  {
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
  setAttbts(element,elementData)
  {
    element.setAttribute('type',elementData.type);
    element.style.borderRadius='0px'
    if (elementData.attr.id) 
    element.setAttribute('id',elementData.attr.id)
    if(elementData.attr.className)
    element.setAttribute('class',elementData.attr.className)
    if(elementData.attr.placeholder)
    element.setAttribute('placeholder',elementData.attr.placeholder)
    if (elementData.attr.rows)     
    element.setAttribute('rows',elementData.attr.rows)
    if(elementData.attr.name)
    element.setAttribute('name',elementData.attr.name)
    if(elementData.attr.required)
    element.setAttribute('required',elementData.attr.required)
    if(elementData.attr.onchange)
    element.setAttribute('onchange',elementData.attr.onchange)
    if (elementData.attr.pattern) 
    element.setAttribute('pattern',elementData.attr.pattern)
    if (elementData.attr.disabled) 
    element.setAttribute('disabled',elementData.attr.disabled)
    if (elementData.attr.formnovalidate) 
    element.setAttribute('formnovalidate',elementData.attr.formnovalidate)
    if (elementData.attr.autocomplete) 
    element.setAttribute('autocomplete',elementData.attr.autocomplete)
    if(elementData.attr.value)
    element.setAttribute('value',elementData.attr.value);
    // if (elementData.value)
    // element.setAttribute('value',elementData.value);
  
  }
  setLabel(elementData){
    if(elementData.label){
      const label=document.createElement('label');
      label.innerText=elementData.label; 
      if (elementData.attr) {
        if (elementData.attr.id)
        label.setAttribute('for',elementData.attr.id);
    }
    this.container.appendChild(label);
      }
      
  }
  setRadioCheckBoxes(elementData){
      elementData.options.forEach((option)=>{
      
      const radioCheckboxElement=document.createElement('input');
      // this.setAttbts(radioTagCreated,elementData);
      if (elementData.type)
      radioCheckboxElement.setAttribute('type',elementData.type);
      if (option.name)
      radioCheckboxElement.setAttribute('name',option.name);
      if (option.value)
      radioCheckboxElement.setAttribute('value',option.value);
      if (option.attr.id)
      radioCheckboxElement.setAttribute('id',option.attr.id);
      if (option.attr.required)
      radioCheckboxElement.setAttribute('required',option.attr.required);
      if (elementData.type=='radio')
          if(option.value)//=='male'||option.value=='Male'||option.value=='MALE'
                radioCheckboxElement.setAttribute('checked',true);
      // radioTagCreated.setAttribute('class',option.attr.className);
      this.container.appendChild(radioCheckboxElement);

      const label=document.createElement('label');
      label.setAttribute('for',option.attr.id);
      label.innerText= option.value;
      this.container.appendChild(label);
          // br tag 
      let br=document.createElement('br');
      this.container.appendChild(br);
      //css for spacing
      label.style.marginLeft='10px';
      label.style.fontWeight='normal';
      // radioTagCreated.style.borderRadius='0px'
    })
  }

  createInputElement(elementData)
  { 
     if (elementData.attr) 
       {
          this.setLabel(elementData);
          const element=document.createElement('input');
          // if (elementData.attr.hasOwnProperty('onchange')) {
          //   element.addEventListener('change', (event)=> {
          //     console.log('erer', event.target              )
          //     event.target.classList.add('teet')
        
          //   })
          // }
          //set attribue method
          this.setAttbts(element,elementData);
          this.container.appendChild(element);
      }else
      {
        //for hidden tags
        if(elementData.getValue){
          const element=document.createElement('input');
          element.setAttribute('type',elementData.type);
          if(elementData.unique)
          element.setAttribute('unique',elementData.unique);        
          element.setAttribute('getValue',elementData.getValue)
          this.container.appendChild(element);
        }else
        console.error("getValue is not defined");    
      }
  }

  createTextAreaElement(elementData)
  {
    // console.log('textarea');
          this.setLabel(elementData);
          const element=document.createElement('textarea');
          //set attribuess method call
          // if (elementData.attr.hasOwnProperty('onchange')) {
          //   element.addEventListener('change', (event)=> {
          //     console.log('texst erer', event, elementData)
          //   })
          // }
          // console.log('elementData--->', );
          this.setAttbts(element,elementData);
          this.container.appendChild(element);
  }
  createSelectOptionElement(elementData)
  {
    // console.log('select');
      this.setLabel(elementData);
     const selectTagCreated=document.createElement('select');
       //set attribuess method call
       this.setAttbts(selectTagCreated,elementData);
       selectTagCreated.setAttribute('value',elementData.value);
       const selectTag =this.container.appendChild(selectTagCreated);
      // options  adding 
       elementData.options.forEach((option)=>{
          const optionTag=document.createElement('option');
          optionTag.innerText=option.innerText;
          optionTag.setAttribute('value',option.value);
          selectTag.appendChild(optionTag);
    })
    // // code for showing selected option Event Lisning
    // const select = document.getElementById(elementData.attr.id);

    // select.addEventListener('change', function() {
    // const selectedOption = select.options[select.selectedIndex];
    // console.log(`Selected option: ${selectedOption.text}, value: ${selectedOption.value}`);
    // });
    
  }
  createRadioElement(elementData)
  {
        this.setLabel(elementData);
         // br tag 
         let br=document.createElement('br');
         this.container.appendChild(br);

         this.setRadioCheckBoxes(elementData);
    

  }
  createCheckBoxElement(elementData)
  {  
        this.setLabel(elementData);
        // br tag 
        let br=document.createElement('br');
        this.container.appendChild(br);

        this.setRadioCheckBoxes(elementData);
  }
  // END FORM CREATION 

  validateFormData(tempData,formData){
    const requiredFields = [];
    formData.forEach((obj)=>{ 
      if (obj.attr) {
        if (obj.attr.required) {
          // console.log(obj.attr.required,'required');
          requiredFields[requiredFields.length]=obj.key;
        }
      }
      if (obj.type==='radio') {
        if (obj.options) {
          let tempName;
          obj.options.forEach((opt)=>{
            if (opt.attr) {
              if (opt.attr.required) {
               tempName=obj.key;
              }
            }
          })
          requiredFields[requiredFields.length]=tempName;
        }
      }
    })
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
      }else if(Object.keys(validData).length===requiredFields.length)
      { //console.log(Object.keys(validData).length,Object.keys(tempData).length);
        return {...validData,...tempData}
      }
       
           
   }

   getFormData(formData)
    {
      const tempData={};
      formData.forEach((element,index)=>{
        // tempData[element.key]=document.getElementById(element.attr?.id)?.value.trim();;
        if (element && element.attr) {
        if (element.type!='submit') {
          if (element.type!='reset') {
            tempData[element.key]= document.getElementById(element.attr.id).value.trim();   
          } 
       }
        }//radio
        if (element && element.options ) {
          element.options.forEach((optionID)=>{
            if (optionID.attr) {
              const option=document.getElementById(optionID.attr.id);
              if (option.checked) {
                tempData[element.key]= option.value;             
              }
            }
          })
        }
        if (element && element.type==='checkbox' ) {
          const hobbies=[];
          element.options.forEach((optionID)=>{
            if (optionID.attr) {
              const option=document.getElementById(optionID.attr.id);
              if (option.checked) {
                hobbies.push(option.value) ;     
              }
            }
          })
          tempData[element.key]= hobbies;
        }
        if (element && element.type==='hidden') {
         if (element.hasOwnProperty('getValue')) {
              tempData[element.key] =element.getValue(tempData);
          }else{
            console.error('getValue is not defined');
          }
        }
      });

      
      console.log(tempData);
      const validData= this.validateFormData(tempData,formData);
      if (validData) {
        console.log('returning data OBJ to use in local staorage');
        return validData
      }
     
    }
    // clickSubmit(formData){
    //   const submitBtn=document.getElementById('employeeForm');
    //   submitBtn.addEventListener('submit',()=>{
    //     // console.log('submit clickes .....');
    //    const data= this.getFormData(formData);
    //   //  console.log(data);
    //   return data;
    //   })
    // }
}
