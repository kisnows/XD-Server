window.onload = function () {
  getData('/preloan')
  getData('/loan/index')
  getData('/loan/po')
}

function getData(url) {
  var xhr = new XMLHttpRequest
  xhr.responseType = 'json'
  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) {
      return
    }
    if (this.status === 200) {
      console.log(this.response)
    } else {
      console.error(this.status)
    }
  }
  xhr.open('GET', url)
  xhr.send()
}

function changeHTML() {
  document.write('HAHA')
}
