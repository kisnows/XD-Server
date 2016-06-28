window.onload = function () {
  testAjax();
}

function testAjax() {
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
  xhr.open('GET', 'loan/index')
  xhr.send()
}

function changeHTML() {
  document.write('HAHA')
}
