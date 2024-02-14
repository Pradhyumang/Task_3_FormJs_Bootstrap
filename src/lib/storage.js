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
      let allData=JSON.parse(localStorage.getItem(this.storageId));
      return allData;
  }
  getOneRow(id){
      let data=this.getAllData();
      const userIdIndex=data.findIndex(dt=>dt.id==id);
    if (userIdIndex!=-1) {
          const record=data[userIdIndex];
        return record;
    }
  }
  deleteData(id){
      let cnf=confirm('Are You Sure to Delete');
      if (cnf) {
          let data=this.getAllData();
          const userIdIndex=data.findIndex(dt=>dt.id==id);
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
    if (dataAll===null||dataAll.length==0) {
        let arr=[];
        arr.push({id:1,...data});
        this.save(arr);
        alert('Insert SuccesFull');
    }
    else{
      let arr=dataAll;
      let index=this.idCounter(arr.length);
      arr.push({id:index,...data});
      this.save(arr);
      return true
    }
  }
  updateData(idUser,updateInfo){
    let data=this.getAllData();
    const userIdIndex=data.findIndex(dt=>dt.id==idUser);
    if (userIdIndex!=-1) {
        data.splice(userIdIndex,1,{id:idUser,...updateInfo}); 
      this.save(data);
    }
    return true;
  }
} 
