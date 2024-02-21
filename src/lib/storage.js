export default class Storage {
  constructor(storageId) {
    this.storageId = storageId; // use this.storageId with localStorage as a unique key to store data
    // Pass storageId to save json string data after each operation in localStorage
    // local storageId is important to retrieve old saved data
    console.log('Storage',storageId);
  }
  // create methods to perform operations like save/edit/delete/add data
  save(data){
    localStorage.setItem(this.storageId,JSON.stringify(data));
  }
  getAllData() {
    try {
      const allData=JSON.parse(localStorage.getItem(this.storageId));
      return allData;
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
      
  }
  getOneRow(id){
      const data=this.getAllData();
      const userIdIndex=data.findIndex(dt=>dt.userId==id);
    if (userIdIndex!=-1) {
          const record=data[userIdIndex];
        return record;
    }
  }
  deleteData(id){
      const cnf=confirm('Are You Sure to Delete');
      if (cnf) {
          const data=this.getAllData();
          const userIdIndex=data.findIndex(dt=>dt.userId==id);
          if (userIdIndex!=-1) {
              data.splice(userIdIndex,1);
              this.save(data);
          }
          return true
      }
      else
        return false;
      
  }
  
  setStorage(data)
  {
    //  for storing data in local storage 
    
    const dataAll=this.getAllData();
    if (dataAll===null||dataAll.length===0) {
        const arr=[];
        arr.push(data);
        this.save(arr);
        alert('Insert SuccesFull');
    }
    else{
      const arr=dataAll;
      arr.push(data);
      this.save(arr);
      alert('Insert SuccesFull');
      return true
    }
  }
  updateData(idUser,updateInfo){
    const data=this.getAllData();
    const userIdIndex=data.findIndex(dt=>dt.userId==idUser);
    if (userIdIndex!=-1) {
        data.splice(userIdIndex,1,updateInfo); 
        this.save(data);
        alert('update successFull');
    }
    return true;
  }
} 
