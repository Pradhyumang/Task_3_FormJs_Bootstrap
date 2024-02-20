// formData is accessible here as we have global variable in formData.js
import formData from './data/formData.js';
import Form from './lib/form.js';
import Storage from './lib/storage.js';
import Table from './lib/table.js';

class Main {
  constructor(formContainerId, storageId, tableContainerId) {
    // formContainerId, storageId, tableContainerId will be in argument of constructor
    // start code to init and link form.js, storage.js, table.js
    const frm = new Form(formContainerId, formData); // form js class to create form and access its methods
    const storage = new Storage(storageId); // storage class to access storage methods
    const tbl = new Table(tableContainerId); // table js class to create table and access its methods
    // console.log(formData, frm, storage, tbl, 'Printed all instance of the class to remove eslint error');
    
    
    tbl.createTable(formData);
    // form submit btn CLick
    
    const formTag = document.getElementById(formContainerId);
    formTag.addEventListener('submit', (event) => {
      event.preventDefault()
      const submiterButton = event.submitter;
      if (submiterButton.value === 'Update') {
        // const submitBtn = document.querySelector("input[type='submit']");
        const id=submiterButton.getAttribute('userId');
        const data= frm.getFormData(formData);
        console.log(id,data);
        if(storage.updateData(id,data)){
          frm.removeAttr();
        }
        this.setDataToTable(formData,storage,tbl);
        this.deleteBtnClick(formData,storage,tbl,frm,formContainerId);
        this.updateBtnClick(formData,storage,tbl,frm,formContainerId)
        this.changeUpdateSubmitIds();
        this.count(storage,tbl);
        document.getElementById(formContainerId).reset()
        console.log('Update btn clicked');

      } else if (submiterButton.value === 'Submit') {
         const data= frm.getFormData(formData);
        storage.setStorage(data);
        this.setDataToTable(formData,storage,tbl);
        this.deleteBtnClick(formData,storage,tbl,frm,formContainerId);
        this.updateBtnClick(formData,storage,tbl,frm,formContainerId)
        this.count(storage,tbl);
        frm.removeAttr();
        document.getElementById(formContainerId).reset()  
      }
      this.reset(frm);     
    });

   //table
     this.updateBtnClick(formData,storage,tbl,frm,formContainerId);
     this.deleteBtnClick(formData,storage,tbl,frm,formContainerId);
     this.setDataToTable(formData,storage,tbl)
     this.count(storage,tbl);
     this.reset(frm);
     
  }
  setDataToTable(formData,storage,tbl){
    try {
      const allData=storage.getAllData();
      tbl.tableData(formData,allData);
    } catch (error) {
        console.log('Empty local storage data',error.message);
    }
  }
  deleteBtnClick(formData,storage,tbl,frm,formContainerId)
  {
      setTimeout(()=>{
      const deleteBtns=document.querySelectorAll('.deleteBtn');
      for (const deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click',()=>{
          if (storage.deleteData(deleteBtn.id)) {
            this.setDataToTable(formData,storage,tbl);
            this.deleteBtnClick(formData,storage,tbl,frm,formContainerId);
            this.updateBtnClick(formData,storage,tbl,frm,formContainerId);
            this.changeUpdateSubmitIds();
            this.count(storage,tbl);
            frm.removeAttr();
            document.getElementById(formContainerId).reset()
          }
        })
      }
    },0)
  }

  updateBtnClick(formData,storage,tbl,frm,formContainerId){
    setTimeout(()=>{
      const updateBtns=document.querySelectorAll('.updateBtn');
      for (const updateBtn of updateBtns) {
        updateBtn.addEventListener('click',()=>{
         const selectedRow = storage.getOneRow(updateBtn.id);
        //  console.log(selectedRow);
          const submitBtn = document.querySelector("input[type='submit']");
        if (submitBtn) {
          submitBtn.value = 'Update';
          submitBtn.classList.add("btn-success");
          submitBtn.setAttribute('userId', updateBtn.id);
          submitBtn.id = 'btnUpdate';
          }
          else{
            console.error('Submit Button id must be btnSubmit');
          }
          frm.setFormData(formData,selectedRow)
          this.setDataToTable(formData,storage,tbl)
          this.deleteBtnClick(formData,storage,tbl,frm,formContainerId);
          this.updateBtnClick(formData,storage,tbl,frm,formContainerId);
          // this.formUpdateBtn(formContainerId);
          
        })
      }
    },0)
  }
  reset(frm){
    const reset=document.querySelector("input[type='reset']");
    reset.addEventListener('click',()=>{
      frm.removeAttr();
    this.changeUpdateSubmitIds();
    })
  }
  changeUpdateSubmitIds(){
    const updateBtn=document.getElementById('btnUpdate');
    if(updateBtn){
      updateBtn.value='Submit';
      updateBtn.classList.add("btn-primary");
      updateBtn.classList.remove("btn-success");
      updateBtn.id='btnSubmit';
    }
  }
  count(storage,tbl){
    const count=storage.getAllData().length;
    tbl.count(count);
  }
 
}
//formContainerId: HTML Div element id inside of which you want to create form4
// formContainerId -> #employeeForm of current index.html

// storageId: localStorage key for saving json  string data init
// storageId -> 'employeeData' simple string to selected as key of localStorage

//tableContainerId: HTML Div element id inside of which you want to create table
// tableContainerId -> #tableDiv of current index.html

//pass formContainerId, storageId, tableContainerId to Main(formContainerId, storageId, tableContainerId)
const main = new Main('employeeForm', 'employeeData', 'tableDiv');
// console.log('this is main');
// console.log(main);
