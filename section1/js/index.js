document.write('Hello World')

for(var i = 0; i < 100; i++) {
  var li = document.createElement('li')
  li.className = 'list'
  li.style.color = 'red'
  li.innerHTML = '我是li'
  ul.appendChild(li)
}

var frag = document.createDocumentFragment()
for(var i = 0; i < 100; i++) {
  var li = document.createElement('li')
  li.className = 'list'
  li.style.color = 'red'
  li.innerHTML = '我是li'
  frag.appendChild(li)
}
ul.appendChild(frag)

var str = ''
for(var i = 0; i < 100; i++) {
  str += '<li class="list" style="color: red;">我是li</li>'
}
ul.innerHTML = str