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
    this.clickSubmit(formData);
  }
  // form creation CREATEFORM
  // create methods/event to create form/ reset form/ submit form, etc\
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
          if(option.value=='male'||option.value=='Male'||option.value=='MALE')
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
   
    // const size = Object.keys(tempData).length;
    // console.log(size,'size of Temp Data');   
    // for (let key in tempData){
    //   if (tempData[key]) {
    //     // console.log(tempData[key]);
    //     validData[key]=tempData[key];
    //   }
    // }
    // console.log(validData);
    // console.log(Object.keys(validData).length,'valid Data Length');

    const requiredFields = [];
    formData.forEach((obj)=>{ 
      if (obj.attr) {
        if (obj.attr.required) {
          // console.log(obj.attr.required,'required');
          requiredFields[requiredFields.length]=obj.attr.id;
        }
      }
      if (obj.type=='radio') {
        if (obj.options) {
          let tempName;
          obj.options.forEach((obj)=>{
            if (obj.attr) {
              if (obj.attr.required) {
                // console.log(obj.attr.required,'required option');
               tempName=obj.name;
              //  requiredFields[requiredFields.length]=obj.attr.id;
              }
            }
          })
          requiredFields[requiredFields.length]=tempName;
        }
      }else if(obj.type=='checkbox'){
        if (obj.options) {
          obj.options.forEach((obj)=>{
            if (obj.attr) {
              if (obj.attr.required) {
                // console.log(obj.attr.required,'required option');
                requiredFields[requiredFields.length]=obj.attr.id;
              }
            }
          })
          
        }
      }
      
    })
    // for (let key in tempData){
    //   requiredFields[requiredFields.length]=key;
    // }
    // console.log(requiredFields);
    const validData = {};
    for (let key of requiredFields) {
      let genType;
      formData.forEach((obj)=>{
        if (obj.type=='radio') {
          genType= obj.options.name;
        }
       
      })

      if(tempData[key]==genType) {
          formData.forEach((obj)=>{
            let radioValue;
            if (obj.type=='radio') {
              obj.options.forEach((obj)=>{
                const radioBtn=document.getElementById(obj.attr.id);
                if(radioBtn.checked)
                {
                  console.log(radioBtn.value);
                  radioValue =radioBtn.value;
                }
                validData[key] =radioValue;
              })
            }
            
          })
      }else{
        if (!tempData[key]) {
          return undefined;
         }
          else
          validData[key] = tempData[key];
      }
        
        
    }
// console.log(validData,'in validateFormData ...');
    return validData;
   }

   getFormData(formData)
    {
      const tempData={};
      formData.forEach((element)=>{
        if (element && element.attr) {
        if (element.type!='submit') {
          if (element.type!='reset') {
            tempData[element.attr.id]= document.getElementById(element.attr.id).value.trim();   
          } 
       }
       
        }
        if (element && element.options ) {
          element.options.forEach((optionID)=>{
            if (optionID.attr) {
              const option=document.getElementById(optionID.attr.id);
              // console.log(option);
              if (option.checked) {
                tempData[optionID.attr.id]= option.value;             
              }
            }
          })
        }
      });
      // allData
       console.log(tempData);
      const validData= this.validateFormData(tempData,formData);
      console.log(validData);
     
    }
    clickSubmit(formData){
      const submitBtn=document.getElementById('employeeForm');
      submitBtn.addEventListener('submit',()=>{
        // console.log('submit clickes .....');
        this.getFormData(formData);
      })
    }
}
