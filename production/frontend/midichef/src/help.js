//post_helper
//require input:
//body：the form content you want to send to server.
//url: optional, default is localhost:8000/api
export function post_helper(body,url='http://localhost:8000/api'){
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode:'cors',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(body) // body data type must match "Content-Type" header
    })
}
//post_helper
//require input:
//body：the form content you want to send to server.
//url: optional, default is localhost:8000/api
export function get_helper(body,url='http://localhost:8000/api'){
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode:'cors',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(body) // body data type must match "Content-Type" header
    })
}