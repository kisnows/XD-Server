<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>list ftl</title>
	<link rel="stylesheet" href="./css/app.css">
</head>
<body>
	<h1>List</h1>
    <#include './include/include.ftl'>
    <ul>
	    <li>姓名: ${user.name}</li>
        <li>年龄: ${user.age}</li>
        <li>头像: <img src="${user.avatar}" /></li>
    </ul>
</body>
</html>
