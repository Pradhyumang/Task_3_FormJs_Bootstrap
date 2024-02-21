
export default class Table {
  constructor(tableContainerId) {
    this.container = document.getElementById(tableContainerId); // Use this container to create table inside of it
    // Pass tableContainerId to append table inside of HTML DIV element
  }
  // create methods/event to refresh table data, add data row, update data row, delete data row, etc
  createTable(formData)
  {
    const div=document.createElement('div');
    div.setAttribute('class','table-responsive')
    this.container.appendChild(div)
    const table=document.createElement('table');
    table.setAttribute('class','table caption-top');
    div.appendChild(table);
    const caption=document.createElement('caption');
    caption.innerText='Total items : ';
    const span=document.createElement('span');
    span.setAttribute('id','count');
    caption.appendChild(span)
    table.appendChild(caption)
    // this.createTableHead(formData);
    const thead=document.createElement('thead');
      table.appendChild(thead);
    const tr=document.createElement('tr');
      thead.appendChild(tr);
    formData.forEach(obj => {
      const th=document.createElement('th');
        th.setAttribute('scope','col');
        if (obj.label) {
          th.innerText=obj.label;
          tr.appendChild(th);
        }
      });
        const th=document.createElement('th');
        th.innerText='Action';
        tr.appendChild(th);
        const tbody=document.createElement('tbody');
        table.appendChild(tbody);
      // this.tableData(formData);
      //data pass kr na hai
  }
   
  tableData(formData,data){
     
    const tbody = document.getElementsByTagName('table')[0]?.getElementsByTagName('tbody')[0];
    tbody.innerHTML='';
    data.forEach((dt) => {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    let userId;
    formData.forEach((obj) => {
        const td = document.createElement('td');
        if (obj.key) {
            td.innerText = dt[obj.key];
            tr.appendChild(td);
        }
        if (obj.key==='userId') {
          userId=dt[obj.key];
        }
      
       });
       if (!userId) {
        console.error('please mention userId as key for Id')
       } 
       const td=document.createElement('td');
       const submitBtn=document.createElement('input');
       submitBtn.setAttribute('type','submit');
       submitBtn.setAttribute('value','Update');
       submitBtn.setAttribute('style','border-radius: 19px;');
       submitBtn.setAttribute('class','btn btn-primary updateBtn');
       submitBtn.setAttribute('id',userId);
       td.appendChild(submitBtn);
       const updateBt=document.createElement('input');
       updateBt.setAttribute('type','button');
       updateBt.setAttribute('value','delete');
       updateBt.setAttribute('style','border-radius: 19px;');
       updateBt.setAttribute('class','btn btn-danger deleteBtn');
       updateBt.setAttribute('id',userId);
       td.appendChild(updateBt);
       tr.appendChild(td);
      })
  }
  count(count){
    const span=document.getElementById('count');
    span.innerText=count;
  }
}
