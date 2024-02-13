
export default class Table {
  constructor(tableContainerId) {
    this.container = document.getElementById(tableContainerId); // Use this container to create table inside of it
    // Pass tableContainerId to append table inside of HTML DIV element
  }
  // create methods/event to refresh table data, add data row, update data row, delete data row, etc
  createTable(formData)
  {
    const table=document.createElement('table');
    table.setAttribute('class','table caption-top');
    this.container.appendChild(table);
    const caption=document.createElement('caption');
    caption.innerText='Total items : 1';
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

      // this.tableData(formData);
      //data pass kr na hai
  }
   
  tableData(formData){
    const table=document.getElementsByTagName('table');
    const tbody=document.createElement('tbody');
    table[0].appendChild(tbody);
    const tr=document.createElement('tr');
    tbody.appendChild(tr);
     formData.forEach(obj => {
      const td=document.createElement('td');
        if (obj.label) {
          td.innerText=obj.label;
          tr.appendChild(td);
        }
       });
  }
}
